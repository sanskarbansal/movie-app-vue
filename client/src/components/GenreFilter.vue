<template>
    <div>
        <div class="container" @click="isOpen = !isOpen">
            <div class="selected-item">{{ selectedVal }}</div>
            <div class="items" :class="{ open: isOpen }">
                <div class="item" v-for="(genre, idx) in genres" :key="genre.id" @click="selectedIdx = idx">
                    {{ genre.name }}
                </div>
            </div>
        </div>
        <div v-if="isOpen" class="overlay" @click="isOpen = false"></div>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    data() {
        return {
            isOpen: false,
            selectedIdx: -1,
        };
    },
    computed: {
        ...mapState({
            genres(state) {
                return [{ id: -1, name: "All" }, ...state.genres];
            },
        }),

        selectedVal() {
            if (this.selectedIdx === -1) return "All";
            return this.genres[this.selectedIdx]?.name;
        },
    },
    watch: {
        selectedIdx(newIdx) {
            if (this.selectedIdx !== -1) this.$emit("changeGenre", this.genres[newIdx]);
        },
    },
};
</script>

<style scoped>
.container * {
    box-sizing: border-box;
}
.container {
    border: 1px solid lightblue;
    position: absolute;
    top: 20px;
    right: 20px;
    width: 160px;
    cursor: pointer;
    z-index: 2;
    background: white;
    border-radius: 8px;
}
.items {
    transform: scaleY(0);
    display: none;
    width: 100%;
}
.selected-item,
.item:not(:last-of-type) {
    border-bottom: 1px solid rgb(210, 208, 208);
}
.selected-item,
.item {
    padding: 2px 4px;
}

.selected-item {
    border-radius: 8px;
    border: 1px solid lightgreen;
}
.open {
    transform: scale(100%);
    display: block;
}
.overlay {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
}
</style>
