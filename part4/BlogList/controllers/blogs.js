const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
    return response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
    const blog = new Blog(request.body);

    const user = await User.findOne();

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
    await Blog.findByIdAndRemove(request.params.id);
    return response.sendStatus(204).end();
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
