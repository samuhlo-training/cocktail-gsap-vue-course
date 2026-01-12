<script setup lang="ts">
    import gsap from 'gsap';
    import { ScrollTrigger, SplitText } from 'gsap/all';
    import NavBar from "./components/NavBar.vue";
    import Hero from "./components/Hero.vue";
    import Cocktails from "./components/Cocktails.vue";

    gsap.registerPlugin(ScrollTrigger, SplitText);
</script>

<template>
    <main>
       <NavBar />
       <Hero />
       <Cocktails />
       
    </main>
</template>

<style scoped></style>
