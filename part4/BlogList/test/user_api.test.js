const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/user");

test("user not created without username", async () => {
    const newUser = {
        name: "Test User",
        password: "testPassword",
    };

    let res = await api.post("/api/users").send(newUser).expect(400);

    expect(res.body.error).toContain("`username` is required.");
});

test("user not created without a password", async () => {
    const newUser = {
        name: "Test User",
        username: "testUsername",
    };

    let res = await api.post("/api/users").send(newUser).expect(400);

    expect(res.body.error).toContain("password is required.");
});

test("user not created without a password less than 3 characters in length", async () => {
    const newUser = {
        name: "Test User",
        username: "testUsername",
        password: "12",
    };

    let res = await api.post("/api/users").send(newUser).expect(400);

    expect(res.body.error).toContain("atleast 3");
});

afterAll(() => {
    mongoose.connection.close();
});
