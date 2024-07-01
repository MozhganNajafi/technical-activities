<script setup lang="ts"></script>

<template>
    <div class="routes">
        <router-link to="/">Activity 1</router-link>
        <router-link to="/activity2">Activity 2</router-link>
        <router-link to="/activity3">Activity 3</router-link>
    </div>

    <div class="container">
        <router-view></router-view>
    </div>
</template>

<style scoped>
.container {
    width: 80%;
    margin: 0 auto;
}

.routes {
    padding: 20px 10px;
    text-wrap: nowrap;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    a {
        margin-right: 10px;
        background-color: #6E7BD9;
        color: #fff;
        padding: 8px;
        border-radius: 5px;
        text-decoration: none;
        font-weight: 600;

        &:hover,
        &:focus,
        &:active {
            background-color: #9e82de;
        }
    }
}
</style>