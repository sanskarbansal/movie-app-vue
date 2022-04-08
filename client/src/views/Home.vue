<template>
    <div class="home">
        <div v-for="movie in movies" v-bind:key="movie.id">
            {{ movie.title }}
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import api from "@/services/api/index";
import { mapMutations, mapState } from "vuex";

export default Vue.extend({
    name: "Home",
    components: {},
    methods: {
        ...mapMutations(["addMovies", "addGenres"]),
    },
    computed: {
        ...mapState(["movies", "genres"]),
    },
    async mounted() {
        try {
            const { data: movies } = await axios.get(api.getMovie());
            const { data: genres } = await axios.get(api.getGenres());
            this.addMovies(movies);
            this.addGenres(genres);
        } catch (err) {}
    },
});
</script>
