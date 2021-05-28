const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const { testEnvironment } = require("../jest.config");
const { after } = require("lodash");

beforeEach(async () => {
    await Blog.deleteMany({});

    for (let blog of Array.from(helper.blogs)) {
        let blogObject = new Blog(blog);
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

    await api.post("/api/blogs").send(newBlog).expect(201);

    const blogsAfterTest = await helper.blogsInDb();
    expect(blogsAfterTest).toHaveLength(helper.blogs.length + 1);

    const blogTitlesAfterTest = blogsAfterTest.map((n) => n.title);
    expect(blogTitlesAfterTest).toContain("Test Blog");
});

test("if request does not have the property 'likes' it defaults to 0", async () => {
    const newBlog = {
        title: "Test Blog",
        author: "Matthew Morris",
        url: "http://blog.testblogpost.com/matt-morris/Testing.html",
    };

    await api.post("/api/blogs").send(newBlog).expect(201);

    const blogsAfterTest = await helper.blogsInDb();

    blogsAfterTest.forEach((blog) => {
        expect(blog.likes).toBeDefined();
    });
});

afterAll(() => {
    mongoose.connection.close();
});
