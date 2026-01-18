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
