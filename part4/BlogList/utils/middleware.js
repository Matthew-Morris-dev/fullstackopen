const User = require("../models/user");
const jwt = require("jsonwebtoken");

const errorHandler = (error, request, response, next) => {
    if (error.name === "ValidationError") {
        return response.status(400).json({ error: error.message });
    } else if (error.name === "AuthorizationError") {
        return response.status(401).json({ error: error.message });
    }

    next(error);
};

const tokenExtractor = (request, response, next) => {
    const authorization = request.get("authorization");
    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
        request.token = authorization.substring(7);
    } else {
        request.token = null;
    }
    next();
};

const userExtractor = async (request, response, next) => {
    console.log("we are inside userExtractor");
    const error = {
        name: "AuthorizationError",
    };
    if (!request.token) {
        next({ ...error, message: "token missing" });
    }

    const decodedToken = jwt.verify(request.token, process.env.SECRET);

    if (!decodedToken.id) {
        next({ ...error, message: "token invalid" });
    }

    const user = await User.findById(decodedToken.id);

    if (!user) {
        next({ ...error, message: "No valid user" });
    } else {
        request.user = user._id;
    }

    next();
};

module.exports = {
    errorHandler,
    tokenExtractor,
    userExtractor,
};
