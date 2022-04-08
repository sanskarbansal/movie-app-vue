const getBaseUrl = () => "http://localhost:5000";

const getUrl = (endpoint: string) => `${getBaseUrl()}/${endpoint}`;

export default {
    getMovie() {
        return getUrl("movies");
    },
    getGenres() {
        return getUrl("genres");
    },
};
