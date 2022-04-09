<template>
    <span>
        <div
            class="rating"
            :class="{ active: active && idx < active, locked: yourRatings !== false }"
            @mouseenter="yourRatings === false ? (active = idx + 1) : null"
            @mouseleave="yourRatings === false ? (active = null) : null"
            @click="yourRatings === false ? $emit('submitRating', idx + 1) : null"
            v-for="(_, idx) in '----------'"
            :key="idx"
        >
            {{ idx + 1 }}
        </div>
    </span>
</template>

<script>
export default {
    props: ["id", "movie", "yourRatings"],
    data() {
        return {
            active: this.yourRatings,
        };
    },
    methods: {},
};
</script>

<style scoped lang="scss">
.rating {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1px solid #cfcfcf;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
    cursor: pointer;
}
.locked {
    cursor: default;
}
.active {
    background: red;
    transform: scale(1.2);
    color: white;
    font-weight: bold;
}
@for $i from 1 through 10 {
    .rating:nth-of-type(#{$i}).active {
        transition: all 0.1s linear;
        transition-delay: #{$i * 0.015}s;
    }
}
</style>
