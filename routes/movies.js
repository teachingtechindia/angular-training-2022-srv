const express = require("express");
const router = express.Router();
const db = require("../db");
const { createMovieSchema } = require("../validators/movies");
const { customAlphabet } = require("nanoid");
const { authenticate } = require("../middlewares/auth.middleware");
const nanoid = customAlphabet("1234567890abcdef", 10);

router.post("/", authenticate, async (req, res) => {
    const { title, year, runtime, genres, director, actors, plot, posterUrl } =
        req.body;
    try {
        await createMovieSchema.validateAsync({
            title,
            year,
            runtime,
            genres,
            director,
            actors,
            plot,
            posterUrl,
        });
    } catch (err) {
        console.error(err);
        return res.status(400).send(err.details.map((d) => d.message));
    }

    const foundMovie = db
        .get("movies")
        .value()
        .find((movie) => movie.title === title);
    if (foundMovie) {
        return res.status(200).send({
            message: "This movies already exists",
            email: foundMovie.title,
            id: foundMovie.id,
        });
    }

    const newMovie = {
        id: nanoid(),
        title,
        year,
        runtime,
        genres,
        director,
        actors,
        plot,
        posterUrl,
    };
    const movies = db.get("movies").value();
    movies.push(newMovie);
    db.set("movies", movies).write();
});

router.get("/", authenticate, async (req, res) => {
    const movies = db.get("movies").value();

    return res.status(200).json(movies);
});

module.exports = router;
