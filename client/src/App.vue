<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
import axios from "axios";
import { mapMutations } from "vuex";
import { instance } from "./services/api";
export default {
    methods: {
        ...mapMutations(["addGenres"]),
    },
    async created() {
        let token = localStorage.getItem("SID");
        if (!token) {
            const { data } = await instance.get("/create_session");
            token = data?.token;
            localStorage.setItem("SID", token);
        }
        instance.defaults.headers.common["Authorization"] = token;
    },
    async mounted() {
        try {
            const { data: genres } = await api.getGenres();
            this.addGenres(genres);
        } catch (err) {}
    },
};
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}

#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
