<script setup lang="ts">
/**
 * [COMPONENT] :: NAV_BAR
 * ----------------------------------------------------------------------
 * Navigation header that remains fixed or animates on scroll.
 * Handles sticky positioning and background blur effects.
 *
 * @module    components/NavBar.vue
 * ----------------------------------------------------------------------
 */

// =====================================================================
// [SECTION] :: IMPORTS
// =====================================================================
import { onMounted } from 'vue';
import { navLinks } from '../../constants';
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
 * Initializes the scroll-triggered animation for the navbar background.
 */
/**
 * [ hook ] :: ON_MOUNTED
 * Initializes the scroll-triggered animation for the navbar background.
 */
onMounted(() => {
  /**
   * [ANIMATION] :: NAVBAR_SCROLL_EFFECT
   * Changes the navbar background from transparent to semi-transparent black
   * with a blur effect when the user scrolls past the top of the page.
   *
   * HOW IT WORKS:
   * We use a GSAP Timeline with a ScrollTrigger.
   *
   * TRIGGER LOGIC (start: 'bottom top'):
   * This means the animation starts when the BOTTOM of the 'nav' element
   * hits the TOP of the viewport. Essentially, as soon as the user starts
   * scrolling and the header moves up, we trigger the background change.
   */
  const navTween = gsap.timeline({
    scrollTrigger: {
      trigger: 'nav',
      start: 'bottom top',
    }
  });

  // WHY FROMTO?
  // We explicitly define both state A (transparent) and state B (blurred/colored).
  // This ensures that even if the user scrolls up and down quickly, GSAP
  // always knows exactly what values to interpolate between.
  navTween.fromTo(
    'nav', 
    { backgroundColor: 'transparent' }, 
    { 
      backgroundColor: '#000000050', 
      backdropFilter: 'blur(10px)', // GSAP can animate complex CSS props like filters!
      duration: ANIMATION_DURATION, 
      ease: 'power1.out' 
    }
  );
});

</script>

<template>
  <!-- [ELEMENT] :: NAV_CONTAINER -->
  <nav>
    <div>
      <!-- [GROUP] :: BRANDING -->
      <a href="#home" class="flex items-center gap-2">
        <img src="/images/logo.png" alt="logo" srcset="">
        <p>Velvet Pour</p></a>
      
      <!-- [GROUP] :: LINKS -->
      <ul>
        <li v-for="nav in navLinks" :key="nav.id">
          <a :href="`#${nav.id}`" class="hover:text-yellow transition-colors duration-300">
            {{ nav.title }}
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>


