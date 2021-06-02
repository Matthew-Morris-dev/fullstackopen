const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
    return response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
    const blog = new Blog(request.body);

    if (!request.token) {
        return response.status(401).json({
            error: "token missing",
        });
    }

    const decodedToken = jwt.verify(request.token, process.env.SECRET);

    if (!decodedToken.id) {
        return response.status(401).json({
            error: "token invalid",
        });
    }

    const user = await User.findById(decodedToken.id);

    blog.user = user._id;

    if ((blog.title === undefined || blog.title === "" || blog.title === null) && (blog.url === undefined || blog.url === "" || blog.url === null)) {
        return response.sendStatus(400);
    }

    const result = await blog.save();

    user.blogs = user.blogs.concat(result._id);
    await user.save();

    return response.status(201).json(result);
});

blogsRouter.delete("/:id", async (request, response) => {
    const blog = await Blog.findById(request.params.id);

    if (!request.token) {
        return response.status(401).json({
            error: "token missing",
        });
    }

    const decodedToken = jwt.verify(request.token, process.env.SECRET);

    if (!decodedToken.id) {
        return response.status(401).json({
            error: "token invalid",
        });
    }

    const user = await User.findById(decodedToken.id);

    if (blog.user.toString() === user._id.toString()) {
        await Blog.findByIdAndRemove(request.params.id);
        return response.sendStatus(204).end();
    } else {
        return response.status(401).json({
            error: "you do not have permission to delete this blog",
        });
    }
});

blogsRouter.put("/:id", async (request, response) => {
    const body = request.body;
    const blog = {};

    if (body.title !== null && body.title !== undefined) {
        blog.title = body.title;
    }

    if (body.likes !== null && body.likes !== undefined) {
        blog.likes = body.likes;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });

    return response.json(updatedBlog);
});

module.exports = blogsRouter;
