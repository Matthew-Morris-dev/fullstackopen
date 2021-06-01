const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
    name: String,
    username: {
        type: String,
        required: true,
        minlenght: 3,
        unique: true,
    },
    password: String,
});

userSchema.plugin(uniqueValidator);
userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.password;
    },
});

module.exports = mongoose.model("User", userSchema);
