import express from "express";
import { genres, movies } from "./db";
import { filterById } from "./queries";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors({ origin: new RegExp("http[s]?://localhost:[0-9]{0,65535}/?") }));

/**
 * Return movies that match the 'search term' with movie 'title'.
 * If search term is not provided, return all movies.
 */
app.get("/movies", (req, resp) => {
    const search: string = req.query.search as string;
    if (!search) return resp.send(movies);
    const filteredMovies = movies.filter((movie) => movie.title.indexOf(search) !== -1);
    resp.send(filteredMovies);
});

/**
 * Return all genres.
 */
app.get("/genres", (req, resp) => {
    resp.send(genres);
});

/**
 * Return movies that match the provided ID.
 */
app.get("/movies/:id", (req, resp) => {
    const id = Number(req.params.id);
    const filteredMovie = filterById(movies, id);
    if (filteredMovie === null) {
        return resp.json({ message: "Movie not found!" }).status(404);
    }
    resp.send(filteredMovie);
});

/**
 * Return genre that match the provided ID.
 */
app.get("/genres/:id", (req, resp) => {
    const id = Number(req.params.id);
    const filteredGenre = filterById(genres, id);
    if (filteredGenre === null) {
        return resp.json({ message: "Genre not found!" }).status(404);
    }
    resp.send(filteredGenre);
});

/**
 * Add rating to a movie.
 * For simplicity of the task, the array acts as a DB in runtime.
 */
app.post("/movies/:id/ratings", (req, resp) => {
    // TODO
    const rating = Number(req.body.ratingVal);
    if (isNaN(rating)) return resp.json({ message: "Please provide a rating!" }).status(405);
    console.log(req.body);

    const id = Number(req.params.id);
    const movie = filterById(movies, id);
    if (movie === null) {
        return resp.send({ message: "Movie Not Found" }).status(404);
    }
    if (rating > 10) {
        return resp.send({ message: "Rating can not be more than 10" }).status(405);
    }
    const newSum = movie.vote_count * movie.vote_average + rating;
    const newVotesCount = movie.vote_count + 1;
    const newVotesAverage = newSum / newVotesCount;

    console.log(newSum);
    movie.vote_average = newVotesAverage;
    movie.vote_count = newVotesCount;

    resp.send(movie);
});

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});
