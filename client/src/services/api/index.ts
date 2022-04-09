import axios from "axios";

export const instance = axios.create({});
instance.defaults.baseURL = "http://localhost:5000";

export default {
    getMovies() {
        return instance.get("/movies");
    },
    getMovie(id: string | number) {
        return instance.get(`/movies/${id}`);
    },
    getGenres() {
        return instance.get(`/genres`);
    },
    postRating(movieId: string | number, ratingVal: number | string) {
        return instance.post(`/movies/${movieId}/ratings`, {
            ratingVal,
        });
    },
};
