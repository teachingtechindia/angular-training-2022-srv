const jwt = require("jsonwebtoken");

const JWT_SECRET = "SOMESUPERSECRET";

const createJwtToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
};

const verifyJwtToken = (token) => {
    try {
        return { decoded: jwt.verify(token, JWT_SECRET) };
    } catch (err) {
        return { err };
    }
};

module.exports = {
    createJwtToken,
    verifyJwtToken,
};
