const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
    const users = await User.find({});
    return response.json(users);
});

usersRouter.post("/", async (request, response, next) => {
    try {
        const body = request.body;

        if (body.password === null || body.password === undefined) {
            throw {
                name: "ValidationError",
                message: "password is required.",
            };
        } else if (body.password.length < 3) {
            throw {
                name: "ValidationError",
                message: "password must be atleast 3 characters in length.",
            };
        }

        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(body.password, saltRounds);

        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash,
        });
        const savedUser = await user.save();
        response.json(savedUser);
    } catch (error) {
        next(error);
    }
});

module.exports = usersRouter;
