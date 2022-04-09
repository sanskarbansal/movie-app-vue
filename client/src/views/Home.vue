<template>
    <div>
        <input class="search" placeholder="Search movie with title" v-model="inputTitle" />
        <genre-filter @changeGenre="onChangeGenre" />
        <div class="movies-container">
            <div v-for="movie in filteredMovies" v-bind:key="movie.id">
                <movie :movie="movie" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import api from "@/services/api/index";
import { mapMutations, mapState } from "vuex";
import Movie from "@/components/Movie.vue";
import GenreFilter from "@/components/GenreFilter.vue";
import { Genre, Movie as MovieType } from "@/types";

export default Vue.extend({
    name: "Home",
    data() {
        return {
            inputTitle: "",
            genreId: -1,
        };
    },
    components: { Movie, GenreFilter },
    methods: {
        ...mapMutations(["addMovies"]),
        onChangeGenre(genre: Genre) {
            this.genreId = genre?.id;
        },
    },
    computed: {
        ...mapState(["movies"]),
        filteredMovies() {
            let fMovies = [];
            const self = this as any;
            if (self.inputTitle.trim() === "") {
                fMovies = self.movies;
            } else {
                fMovies = self.movies.filter(({ title }: any) => title?.toLowerCase()?.includes(self.inputTitle.toLowerCase()));
            }
            // return fMovies;
            if (self.genreId !== -1) {
                fMovies = fMovies.filter((movie: MovieType) => movie.genre_ids.includes(self.genreId));
            }
            // this.filteredMovies = fMovies;
            // return fMovies;
            return fMovies;
        },
    },

    async mounted() {
        try {
            const { data: movies } = await api.getMovies();
            this.addMovies(movies);
        } catch (err) {}
    },
});
</script>

<style scoped>
.search {
    display: block;
    outline: none;
    font-size: 1.5rem;
    padding: 4px 8px;
    margin: 20px auto;
    border: 1px solid rgba(128, 128, 128, 0.545);
    border-radius: 4px;
}
.movies-container {
    width: 80vw;
    display: grid;
    grid-template-columns: repeat(3, auto);
    gap: 20px;
    margin: 0 auto;
}
</style>
