const express = require("express");
const router = express.Router();
const joiSchema = require("../validators/users");
const db = require("../db");
const { customAlphabet } = require("nanoid");
const { createJwtToken, verifyJwtToken } = require("../services/jwt.service");
const nanoid = customAlphabet("1234567890abcdef", 10);

router.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    try {
        await joiSchema.userLoginSchema.validateAsync({
            email,
            password,
        });
    } catch (err) {
        console.error(err);
        return res.status(400).send(err.details.map((d) => d.message));
    }

    const foundUser = db
        .get("users")
        .value()
        .find((user) => user.email === email && user.password === password);
    if (foundUser) {
        return res.status(200).send({
            message: "Email already registered",
            email: foundUser.email,
            id: foundUser.id,
        });
    }

    const newUser = { id: nanoid(), email, password };
    const users = db.get("users").value();
    users.push(newUser);
    db.set("users", users).write();

    const jwtToken = createJwtToken({ email, id: newUser.id });

    return res.status(201).send({
        message: "Signup Successful",
        email,
        id: newUser.id,
        token: jwtToken,
    });
});

router.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    try {
        await joiSchema.userLoginSchema.validateAsync({
            email,
            password,
        });
    } catch (err) {
        console.error(err);
        return res.status(400).send(err.details.map((d) => d.message));
    }

    const foundUser = db
        .get("users")
        .value()
        .find((user) => user.email === email && user.password === password);
    if (foundUser) {
        const jwtToken = createJwtToken({ email, id: foundUser.id });
        return res.status(200).send({
            message: "Login Successful",
            email,
            id: foundUser.id,
            token: jwtToken,
        });
    } else {
        return res
            .status(401)
            .send({ error: { message: "Invalid Credentials" } });
    }
});

module.exports = router;
