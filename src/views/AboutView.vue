<script setup>
import About from "../components/About.vue"
</script>

<template>
    <main>
        <About />
    </main>
</template>

<style scoped>
 main {
    overflow: hidden;
 }
 @media screen and (max-width: 768px) {
    main {
        overflow: scroll;
    }
 }

</style>