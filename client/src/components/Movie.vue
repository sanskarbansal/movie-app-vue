<template>
    <div class="movie-container">
        <genre-list :genres="movie.genre_ids" />
        <span>{{ Math.round(movie.vote_average * 100) / 100 }}</span>
        <div class="movie-header">
            <h4>{{ movie.title }}</h4>
        </div>

        <div class="movie-body">
            <p>
                {{ movie.overview }}
            </p>
            <router-link :to="`/${movie.id}`">View More</router-link>
        </div>
    </div>
</template>

<script>
import GenreList from "./GenreList.vue";
export default {
    components: { GenreList },
    data: {},
    name: "movie",
    props: ["movie"],
};
</script>

<style scoped>
.movie-container {
    box-sizing: border-box;
    width: 100%;
    max-width: 350px;
    border: 1px solid rgba(128, 128, 128, 0.545);
    padding: 5px 10px;
    border-radius: 8px;
    position: relative;
    /* height: 200px; */
}
.movie-header {
    margin-top: 30px;
}

.movie-body {
    max-height: 50%;
}
.movie-body > p {
    /* height: 50px; */
    width: 100%;
    hyphens: auto;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
</style>
