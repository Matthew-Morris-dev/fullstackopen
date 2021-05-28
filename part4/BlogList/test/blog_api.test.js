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

afterAll(() => {
    mongoose.connection.close();
});
