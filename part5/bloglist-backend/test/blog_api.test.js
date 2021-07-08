const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { json } = require("express");

const testUserData = {
    username: "testuser",
    name: "Test User",
    password: "testpassword",
};

beforeEach(async () => {
    await User.deleteMany({});

    testUserData.passwordHash = await bcrypt.hash(testUserData.password, 10);
    let testUser = new User(testUserData);
    await testUser.save();

    await Blog.deleteMany({});

    for (let blog of Array.from(helper.blogs)) {
        let blogObject = new Blog(blog);
        blogObject.user = testUser._id;
        await blogObject.save();
    }
});

test("Blogs are returned as json", async () => {
    await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/);
});

test("All blogs are returned", async () => {
    const res = await api.get("/api/blogs");

    expect(res.body).toHaveLength(helper.blogs.length);
});

test("blogs have property id", async () => {
    const res = await api.get("/api/blogs");
    res.body.forEach((blog) => {
        expect(blog.id).toBeDefined();
    });
});

test("blog created in database", async () => {
    const newBlog = {
        title: "Test Blog",
        author: "Matthew Morris",
        url: "http://blog.testblogpost.com/matt-morris/Testing.html",
        likes: 0,
    };

    const loginResponse = await api.post("/api/login").send({ username: testUserData.username, password: testUserData.password });
    const loginBody = loginResponse.text;
    await api
        .post("/api/blogs")
        .set("Authorization", "bearer " + JSON.parse(loginBody).token)
        .send(newBlog)
        .expect(201);

    const blogsAfterTest = await helper.blogsInDb();
    expect(blogsAfterTest).toHaveLength(helper.blogs.length + 1);

    const blogTitlesAfterTest = blogsAfterTest.map((n) => n.title);
    expect(blogTitlesAfterTest).toContain("Test Blog");
});

test("Unauthorized if no token provided", async () => {
    const newBlog = {
        title: "Test Blog",
        author: "Matthew Morris",
        url: "http://blog.testblogpost.com/matt-morris/Testing.html",
        likes: 0,
    };

    await api.post("/api/blogs").send(newBlog).expect(401);
});

test("if request does not have the property 'likes' it defaults to 0", async () => {
    const newBlog = {
        title: "Test Blog",
        author: "Matthew Morris",
        url: "http://blog.testblogpost.com/matt-morris/Testing.html",
    };

    const loginResponse = await api.post("/api/login").send({ username: testUserData.username, password: testUserData.password });
    const loginBody = loginResponse.text;

    await api
        .post("/api/blogs")
        .send(newBlog)
        .set("Authorization", "bearer " + JSON.parse(loginBody).token)
        .expect(201);

    const blogsAfterTest = await helper.blogsInDb();

    blogsAfterTest.forEach((blog) => {
        expect(blog.likes).toBeDefined();
    });
});

test("if the properties 'title' and 'url' are missing we get a 400 Bad Request response", async () => {
    const newBlog = {
        author: "Matthew Morris",
    };

    const loginResponse = await api.post("/api/login").send({ username: testUserData.username, password: testUserData.password });
    const loginBody = loginResponse.text;

    await api
        .post("/api/blogs")
        .send(newBlog)
        .set("Authorization", "bearer " + JSON.parse(loginBody).token)
        .expect(400);
});

test("Delete blog returns 204", async () => {
    const blogsBeforeTest = await helper.blogsInDb();
    const blogToDelete = blogsBeforeTest[0];

    const loginResponse = await api.post("/api/login").send({ username: testUserData.username, password: testUserData.password });
    const loginBody = loginResponse.text;

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set("Authorization", "bearer " + JSON.parse(loginBody).token)
        .send()
        .expect(204);

    const blogsAfterTest = await helper.blogsInDb();
    expect(blogsAfterTest).toHaveLength(helper.blogs.length - 1);
});

test("Update blog's likes", async () => {
    const blogsBeforeTest = await helper.blogsInDb();
    const blogToUpdate = blogsBeforeTest[0];
    const newBlogValues = {
        likes: 999,
    };
    await api.put(`/api/blogs/${blogToUpdate.id}`).send(newBlogValues).expect(200);

    const blogsAfterTest = await helper.blogsInDb();
    expect(blogsAfterTest[0].likes).toBe(999);
});

afterAll(() => {
    mongoose.connection.close();
});
