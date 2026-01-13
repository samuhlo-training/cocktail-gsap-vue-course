<script setup lang="ts">
    import gsap from 'gsap';
    import { ScrollTrigger, SplitText } from 'gsap/all';
    import NavBar from "./components/NavBar.vue";
    import Hero from "./components/Hero.vue";
    import Cocktails from "./components/Cocktails.vue"; 
    import About from "./components/About.vue";
    import Art from "./components/Art.vue";
    import Menu from "./components/Menu.vue";

    gsap.registerPlugin(ScrollTrigger, SplitText);
</script>

<template>
    <main>
       <NavBar />
       <Hero />
       <Cocktails />
       <About />
       <Art />
       <Menu />
    </main>
</template>

<style scoped></style>
