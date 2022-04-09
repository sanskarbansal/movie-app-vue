<template>
    <div>
        <input class="search" placeholder="Search movie with title" v-model="inputTitle" />
        <div class="movies-container">
            <div v-for="movie in movies" v-bind:key="movie.id">
                <movie :movie="movie" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import api from "@/services/api/index";
import { mapMutations, mapState } from "vuex";
import Movie from "@/components/Movie.vue";

export default Vue.extend({
    name: "Home",
    data() {
        return {
            inputTitle: "",
            filteredMovies: [],
        };
    },
    components: { Movie },
    methods: {
        ...mapMutations(["addMovies"]),
    },
    computed: mapState({
        movies(state: any) {
            if (this.inputTitle.trim() === "") {
                return state.movies;
            }
            return state.movies.filter(({ title }: any) => title?.toLowerCase()?.includes(this.inputTitle.toLowerCase()));
        },
    }),
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
