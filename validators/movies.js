const Joi = require("joi");

const createMovieSchema = Joi.object({
    title: Joi.string().min(3).max(50).required(),
    year: Joi.number().min(1900).max(2050).required(),
    runtime: Joi.number().min(1).max(3).required(),
    genres: Joi.array().items(Joi.string().min(3).max(50)).required(),
    director: Joi.string().min(3).max(50).required(),
    actors: Joi.array().items(Joi.string().min(3).max(50)).required(),
    plot: Joi.string().min(3).max(500).required(),
    posterUrl: Joi.string().min(3).max(500).required(),
});

module.exports = { createMovieSchema };
