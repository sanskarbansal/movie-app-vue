<template>
    <div v-if="loading === true" class="loader-container">
        <div class="loader"></div>
    </div>
    <div v-else-if="movie !== null" class="movie-container">
        <div class="movie-header">
            <h1>
                {{ movie.title }}
            </h1>
            <p>{{ movie.overview }}</p>
        </div>
        <div class="movie-body">
            <ul>
                <li v-for="genreId in movie.genre_ids" :key="genreId">
                    {{ getGenre(genreId) }}
                </li>
            </ul>
            <p style="margin-left: 20px;">
                <span class="red">Average Vote:</span>
                {{ Math.round(movie.vote_average * 100) / 100 }}
                <br />
                <span class="red">Vote Counts:</span>
                {{ movie.vote_count }}
                <br />
                <span class="red">Popularity:</span>
                {{ movie.popularity }}
                <br />
            </p>
        </div>
        <div class="release-date-container">
            <span class="red">Release Date:</span>
            {{ movie.release_date }}
        </div>
        <div v-if="movie !== null" class="ratings-container">
            <ratings :yourRatings="movie.rating" v-model="movie" @submitRating="handleSubmitRating" />
        </div>
    </div>
</template>

<script>
import api from "@/services/api";
import { mapGetters } from "vuex";
import Ratings from "@/components/Ratings.vue";
export default {
    components: { Ratings },
    data() {
        return { loading: true, movie: null };
    },
    props: {
        movieId: String,
    },
    computed: {
        ...mapGetters(["getGenre"]),
    },
    methods: {
        async handleSubmitRating(ratingVal) {
            try {
                const { data } = await api.postRating(this.movie.id, ratingVal);
                this.movie = data;
            } catch (err) {
                console.log(err);
            }
        },
        onBackClick() {
            alert("called");
        },
    },
    mounted() {
        document.addEventListener("backbutton", this.onBackClick, false);
    },
    beforeDestroy() {
        document.removeEventListener("backbutton", this.onBackClick);
    },
    async mounted() {
        try {
            const { data } = await api.getMovie(this.movieId);
            this.movie = data;
        } catch (err) {
            console.log(err);
        } finally {
            this.loading = false;
        }
    },
};
</script>

<style scoped>
.movie-container {
    border: 1px solid rgba(128, 128, 128, 0.545);
    border-radius: 8px;
    grid-template-columns: repeat(3, auto);
    width: 80vw;
    margin: 0 auto;
    padding: 10px;
    position: relative;
}
.movie-header {
    width: 100%;
}
.movie-header > h1 {
    box-sizing: border-box;
    display: inline-block;
    width: 40%;
    padding: 0 10px;
    text-align: center;
}
.movie-header > p {
    box-sizing: border-box;
    display: inline-block;
    width: 60%;
    padding: 0 10px;
}
.movie-body {
    grid-column: 1/4;
}
.red {
    color: red;
}
.loader-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}
.loader {
    width: 100px;
    height: 100px;
    border: 10px dotted #f63737bd;
    border-left-color: #03a9f4;
    border-bottom-color: #03a9f4;
    border-style: double;
    animation: 3s linear infinite rotate;
}
.release-date-container {
    position: absolute;
    top: 15px;
    left: -1px;
    background: black;
    color: white;
    padding: 5px;
}
.release-date-container > span {
    font-weight: bolder;
}
.release-date-container::after {
    z-index: -1;
    content: "";
    position: absolute;
    right: -32px;
    top: 0;
    height: 0;
    width: 0;
    border: 16px solid black;
    border-right-color: transparent;
}
.ratings-container {
    display: flex;
    justify-content: center;
}

@keyframes rotate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>
