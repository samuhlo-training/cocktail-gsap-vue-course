<script setup lang="ts">
/**
 * [COMPONENT] :: APP_ROOT
 * ----------------------------------------------------------------------
 * The main entry point of the Vue application.
 * It serves as the layout orchestrator, stacking all major sections
 * of the landing page and initializing global GSAP plugins.
 *
 * TUTORIAL MODE:
 * This component demonstrates how to register GSAP plugins globally 
 * so they are available throughout the component tree.
 *
 * @module src/App.vue
 * ----------------------------------------------------------------------
 */

// =====================================================================
// [SECTION] :: IMPORTS
// =====================================================================
import { onMounted } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger, SplitText } from 'gsap/all';
import Lenis from 'lenis';

// Components
import NavBar from "./components/NavBar.vue";
import Hero from "./components/Hero.vue";
import Cocktails from "./components/Cocktails.vue"; 
import About from "./components/About.vue";
import Art from "./components/Art.vue";
import Menu from "./components/Menu.vue";
import Contact from "./components/Contact.vue";

// =====================================================================
// [SECTION] :: LIFECYCLE
// =====================================================================

/**
 * [INIT] :: REGISTER_PLUGINS
 * Hooks into the mounting phase to prepare GSAP.
 * - ScrollTrigger: Enables scroll-based animation logic.
 * - SplitText: Allows breaking strings into characters/words for animation.
 */
onMounted(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    // -----------------------------------------------------------------
    // [INIT] :: LENIS_SMOOTH_SCROLL
    // TUTORIAL MODE:
    // Why do we need this special setup?
    // 
    // 1. The Problem: GSAP ScrollTrigger relies on reading the scroll position
    //    extremely frequently. Standard "smooth scroll" libraries often desync,
    //    causing elements to "jitter" or "shake" as they try to catch up.
    //
    // 2. The Solution: We tell ScrollTrigger exactly when Lenis updates.
    // -----------------------------------------------------------------
    
    // [1] Initialize Lenis instance
    // We use 'autoRaf: false' implying we will control the loop manually (via GSAP ticker)
    const lenis = new Lenis();

    // [2] Synchronize ScrollTrigger
    // Tell ScrollTrigger to listen to the 'lenis' scroll event updates.
    // This ensures that when Lenis moves, ScrollTrigger knows immediately.
    lenis.on('scroll', ScrollTrigger.update);

    // [3] Integrate with GSAP Ticker
    // Instead of using Lenis's internal requestAnimationFrame, we add it to GSAP's ticker.
    // This keeps all animations (tweens) and scroll updates in the EXACT same frame.
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000); // Convert time to milliseconds for Lenis
    });

    // [4] Disable Lag Smoothing
    // GSAP has a feature to "skip" frames if the CPU is too busy (lagSmoothing).
    // In a scroll context, skipping frames means the scroll jumps. We disable it
    // to force smooth continuity at all costs.
    gsap.ticker.lagSmoothing(0);
});

</script>

<template>
    <!-- 
    [BLOCK] :: MAIN_LAYOUT
    The single-page structure where sections are stacked vertically.
    -->
    <main>
        <!-- [ELEMENT] :: NAVIGATION -->
        <NavBar />

        <!-- [ELEMENT] :: HERO_LANDING -->
        <Hero />

        <!-- [ELEMENT] :: FEATURED_LISTS -->
        <Cocktails />

        <!-- [ELEMENT] :: MASONRY_ABOUT -->
        <About />

        <!-- [ELEMENT] :: ART_MASK_REVEAL -->
        <Art />

        <!-- [ELEMENT] :: RECIPE_CAROUSEL -->
        <Menu />

        <!-- [ELEMENT] :: CONTACT_FOOTER -->
        <Contact />
    </main>
</template>

<style scoped></style>
