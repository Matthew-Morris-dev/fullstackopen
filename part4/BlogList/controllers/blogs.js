const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({});
    return response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
    const blog = new Blog(request.body);
    if ((blog.title === undefined || blog.title === "" || blog.title === null) && (blog.url === undefined || blog.url === "" || blog.url === null)) {
        return response.sendStatus(400);
    }
    const result = await blog.save();
    return response.status(201).json(result);
});

module.exports = blogsRouter;
