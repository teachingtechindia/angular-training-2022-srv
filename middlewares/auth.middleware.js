const { verifyJwtToken } = require("../services/jwt.service");

const authenticate = (req, res, next) => {
    const result = verifyJwtToken(req.headers.authorization);
    if (result.err) {
        return res.status(401).send({
            error: {
                message: "Invalid token",
            },
        });
    }

    return next();
};

module.exports = { authenticate };
