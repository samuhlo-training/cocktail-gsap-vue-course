<script setup lang="ts">
/**
 * [COMPONENT] :: NAV_BAR
 * ----------------------------------------------------------------------
 * Navigation header that remains fixed and animates on scroll.
 * Handles sticky positioning and background blur effects.
 *
 * TUTORIAL MODE:
 * This component demonstrates "Scroll-Linked Styling":
 * 1. Fixed Layout: Ensuring the header stays accessible at all times.
 * 2. Visual Feedback: Changing background color and blur dynamically.
 * 3. Tween Interpolation: Using 'fromTo' to guarantee consistent state 
 *    even when scrolling rapidly up and down.
 *
 * @module components/NavBar.vue
 * ----------------------------------------------------------------------
 */

// =====================================================================
// [SECTION] :: IMPORTS
// =====================================================================
import { onMounted } from 'vue';
import { navLinks } from '../constants';
import gsap from 'gsap';

// =====================================================================
// [SECTION] :: CONSTANTS
// =====================================================================
const ANIMATION_DURATION = 1;

// =====================================================================
// [SECTION] :: LIFECYCLE HOOKS
// =====================================================================

/**
 * [ hook ] :: ON_MOUNTED
 * Initializes the scroll-triggered transition for the navbar background.
 */
onMounted(() => {
  /**
   * [ANIMATION] :: NAVBAR_SCROLL_EFFECT
   * 
   * TRIGGER LOGIC (start: 'bottom top'):
   * This means the animation starts when the BOTTOM of the 'nav' element
   * hits the TOP of the viewport. Essentially, as soon as the user starts
   * scrolling and the header moves up, we trigger the background change.
   */
  const navTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: 'nav',
      start: 'bottom top',
    }
  });

  // [STRATEGY] :: FROM_TO_GUARANTEE
  // We explicitly define both state A (transparent) and state B (blurred).
  // This ensures that GSAP always knows exactly what values to interpolate 
  // between, preventing visual glitches during erratic scrolling.
  navTimeline.fromTo(
    'nav', 
    { backgroundColor: 'transparent' }, 
    { 
      backgroundColor: '#00000050', // Semi-transparent black
      backdropFilter: 'blur(10px)', // Animating complex CSS filters!
      duration: ANIMATION_DURATION, 
      ease: 'power1.out' 
    }
  );
});

</script>

<template>
  <!-- [CONTAINER] :: NAV_ROOT -->
  <nav>
    <div class="container-inner">
      
      <!-- [GROUP] :: BRANDING_AND_LOGO -->
      <a href="#home" class="brand flex items-center gap-2">
        <img src="/images/logo.png" alt="Velvet Pour Logo" />
        <p>Velvet Pour</p>
      </a>
      
      <!-- [GROUP] :: NAVIGATION_MENU -->
      <ul class="nav-links">
        <li v-for="nav in navLinks" :key="nav.id">
          <a :href="`#${nav.id}`" class="hover:text-yellow transition-colors duration-300">
            {{ nav.title }}
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>


