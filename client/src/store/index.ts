import { Genre, Movie, State } from "@/types";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store<State>({
    state: {
        movies: [],
        genres: [],
    },
    mutations: {
        addMovies(state, movies: Movie[]) {
            state.movies = movies;
        },
        addGenres(state, genres: Genre[]) {
            state.genres = genres;
        },
    },
    getters: {
        getGenre: (state) => (genreId: number) => {
            return state.genres.filter(({ id }) => id === genreId)[0]?.name;
        },
    },
    actions: {},
    modules: {},
});
