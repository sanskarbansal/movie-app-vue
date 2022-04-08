<template>
    <div class="list-container">
        <span class="content">{{ getGenre(genres[currentIdx]) }}</span>
        <span class="btn" :class="{ disabled: currentIdx === 0 }" @click="handleLeftClick">&lt;</span>
        <span class="btn right" :class="{ disabled: currentIdx === genres.length - 1 }" @click="handleRightClick">&gt;</span>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    props: {
        genres: Array,
    },
    data() {
        return {
            currentIdx: 0,
        };
    },
    methods: {
        handleLeftClick() {
            if (this.currentIdx > 0) this.currentIdx--;
        },
        handleRightClick() {
            if (this.currentIdx < this.genres.length - 1) this.currentIdx++;
        },
    },
    computed: {
        ...mapGetters(["getGenre"]),
    },
};
</script>

<style scoped>
.list-container {
    position: absolute;
    display: inline-block;
    right: 10px;
    top: 5px;
    border: 1px solid rgba(173, 216, 230, 0.563);
}
.btn {
    display: inline-flex;
    cursor: pointer;
    width: 20px;
    height: 20px;
    color: rgb(107, 203, 107);
    font-weight: bolder;
    justify-content: center;
    align-items: center;
    transition: all 0.5s ease-in;
}
.content {
    display: inline-block;
    padding: 0 8px;
}

.right {
    border-left: 1px solid rgba(174, 170, 170, 0.387);
}

.btn:not(.disabled):hover {
    color: green;
}
.disabled {
    color: black;
    cursor: default;
}
</style>
