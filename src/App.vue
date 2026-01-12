<script setup lang="ts">
    import gsap from 'gsap';
    import { ScrollTrigger, SplitText } from 'gsap/all';
    import HelloWorld from "./components/HelloWorld.vue";

    gsap.registerPlugin(ScrollTrigger, SplitText);
</script>

<template>
    <div class="flex-center h-[100vh]">
        <HelloWorld />
    </div>
</template>

<style scoped></style>
