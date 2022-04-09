import express, { Request, Response } from "express";
import { genres, movies } from "./db";
import { filterById } from "./queries";
import cors from "cors";
import { session } from "./middlewares/session";
import { randomBytes } from "crypto";
import { RequestWithSession } from "./types";

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors({ origin: new RegExp("http[s]?://localhost:[0-9]{0,65535}/?") }));
app.use(session);
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
app.get("/genres", (_req: Request, resp: Response) => {
    resp.send(genres);
});

app.get("/create_session", (_req: Request, resp: Response) => {
    const SID = randomBytes(128).toString("hex");
    return resp.json({ token: SID });
});

/**
 * Return movies that match the provided ID.
 */
app.get("/movies/:id", (req: RequestWithSession, resp: any) => {
    const id = Number(req.params.id);
    const filteredMovie = filterById(movies, id);
    if (filteredMovie === null) {
        return resp.json({ message: "Movie not found!" }).status(404);
    }

    const voteStore = req.session.data?.votedMoviesStore;
    let rating = false;
    if (voteStore) {
        rating = voteStore[id];
    }
    resp.send({ ...filteredMovie, rating });
});

/**
 * Return genre that match the provided ID.
 */
app.get("/genres/:id", (req: Request, resp: Response) => {
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
app.post("/movies/:id/ratings", (req: RequestWithSession, resp: any) => {
    // TODO
    const rating = Number(req.body.ratingVal);
    if (isNaN(rating)) return resp.status(405).json({ message: "Please provide a rating!" });

    const id = Number(req.params.id);
    const movie = filterById(movies, id);
    if (movie === null) {
        return resp.status(404).json({ message: "Movie Not Found" });
    }
    if (rating > 10) {
        return resp.status(405).json({ message: "Rating can not be more than 10" });
    }
    if (!req.session.data?.votedMoviesStore) {
        req.session.add("votedMoviesStore", {});
    }
    let vote = req.session.data?.votedMoviesStore[id];

    if (vote) {
        return resp.status(409).json({ message: "You can vote only once!" });
    } else {
        req.session.data!.votedMoviesStore[id] = rating;
    }

    const newSum = movie.vote_count * movie.vote_average + rating;
    const newVotesCount = movie.vote_count + 1;
    const newVotesAverage = newSum / newVotesCount;

    movie.vote_average = newVotesAverage;
    movie.vote_count = newVotesCount;

    resp.send({ ...movie, rating });
});

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});
