<script setup lang="ts">
/**
 * [COMPONENT] :: APP_ROOT
 * ----------------------------------------------------------------------
 * The root component of the application.
 * Orchestrates the main layout and registers global GSAP specific plugins.
 *
 * @module    src/App.vue
 * ----------------------------------------------------------------------
 */

// =====================================================================
// [SECTION] :: IMPORTS
// =====================================================================
import gsap from 'gsap';
import { ScrollTrigger, SplitText } from 'gsap/all';
import NavBar from "./components/NavBar.vue";
import Hero from "./components/Hero.vue";
import Cocktails from "./components/Cocktails.vue"; 
import About from "./components/About.vue";
import Art from "./components/Art.vue";
import Menu from "./components/Menu.vue";
import Contact from "./components/Contact.vue";

// =====================================================================
// [SECTION] :: CONFIGURATION
// =====================================================================

/**
 * [INIT] :: REGISTER_PLUGINS
 * Registers core GSAP plugins globally for use in child components.
 * - ScrollTrigger: For scroll-based animations.
 * - SplitText: For advanced text manipulation effects.
 */
gsap.registerPlugin(ScrollTrigger, SplitText);
</script>

<template>
    <!-- 
    [LAYOUT] :: MAIN_CONTAINER
    Sequential stacking of landing page sections.
    -->
    <main>
       <NavBar />
       <Hero />
       <Cocktails />
       <About />
       <Art />
       <Menu />
       <Contact />
    </main>
</template>

<style scoped></style>
