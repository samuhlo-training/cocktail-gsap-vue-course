<script setup lang="ts">
/**
 * [COMPONENT] :: COCKTAIL_MENU_CAROUSEL
 * ----------------------------------------------------------------------
 * Interactive carousel for viewing detailed cocktail recipes.
 * Features circular navigation, animations on slide change, and responsive layout.
 *
 * @module    components/Menu.vue
 * ----------------------------------------------------------------------
 */

// =====================================================================
// [SECTION] :: IMPORTS
// =====================================================================
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { allCocktails } from '../../constants';
import type { Cocktail } from '../types';
import gsap from 'gsap';

// =====================================================================
// [SECTION] :: COMPONENT STATE
// =====================================================================
const currentIndex = ref(0);
const totalCocktails = allCocktails.length;
const ANIM_DURATION = 1;

// =====================================================================
// [SECTION] :: COMPUTED DATA
// =====================================================================

/**
 * [CALC] :: CURRENT_COCKTAIL
 * Returns the cocktail object for the active slide.
 * Handles circular indexing wrapping.
 */
const currentCocktail = computed<Cocktail>(() => {
    return allCocktails[(currentIndex.value + totalCocktails) % totalCocktails] as Cocktail;
});

/**
 * [CALC] :: PREV_COCKTAIL
 * Returns the cocktail for the "Previous" button label.
 */
const prevCocktail = computed<Cocktail>(() => {
    return allCocktails[(currentIndex.value - 1 + totalCocktails) % totalCocktails] as Cocktail;
});

/**
 * [CALC] :: NEXT_COCKTAIL
 * Returns the cocktail for the "Next" button label.
 */
const nextCocktail = computed<Cocktail>(() => {
    return allCocktails[(currentIndex.value + 1 + totalCocktails) % totalCocktails] as Cocktail;
});

// =====================================================================
// [SECTION] :: ACTIONS & METHODS
// =====================================================================

/**
 * [ACTION] :: GO_TO_SLIDE
 * Updates the current index to the specified slide number.
 * 
 * @param index - The target index to navigate to.
 */
const goToSlide = (index: number) => {
    currentIndex.value = (index + totalCocktails) % totalCocktails;
};

/**
 * [ANIMATION] :: SLIDE_TRANSITION
 * Animates the entrance of the new slide's content elements.
 * Resets opacity and position before fading/sliding in.
 */
const animateSlide = () => {
    // Animate Recipe Title
    gsap.fromTo('#title', 
        { opacity: 0 }, 
        { opacity: 1, duration: ANIM_DURATION }
    );
    
    // Animate Cocktail Image
    gsap.fromTo('.cocktail img', 
        { opacity: 0, xPercent: -100 }, 
        { xPercent: 0, opacity: 1, duration: ANIM_DURATION, ease: 'power1.inOut' }
    );
    
    // Animate Description Heading
    gsap.fromTo('.details h2', 
        { yPercent: 100, opacity: 0 }, 
        { yPercent: 0, opacity: 1, ease: 'power1.inOut' }
    );
    
    // Animate Description Text
    gsap.fromTo('.details p', 
        { yPercent: 100, opacity: 0 }, 
        { yPercent: 0, opacity: 1, ease: 'power1.inOut' }
    );
};

// =====================================================================
// [SECTION] :: WATCHERS & LIFECYCLE
// =====================================================================

/**
 * [WATCH] :: ON_INDEX_CHANGE
 * Triggers the slide transition animation whenever the active slide changes.
 */
watch(currentIndex, () => {
    animateSlide();
});

onMounted(() => {
    // Initial animation when component mounts
    animateSlide();
});

onUnmounted(() => {
   // Cleanup GSAP tweens on unmount
   gsap.killTweensOf(['#title', '.cocktail img', '.details h2', '.details p']);
});

</script>

<template>
    <!-- [CONTAINER] :: CAROUSEL_ROOT -->
    <section id="menu" aria-labelledby="menu-heading">
        <!-- [DECORATION] :: LEAVES -->
        <img src="/images/slider-left-leaf.png" alt="left-leaf" id="m-left-leaf" />
        <img src="/images/slider-right-leaf.png" alt="right-leaf" id="m-right-leaf" />

        <h2 id="menu-heading" class="sr-only">
            Cocktail Menu
        </h2>

        <!-- [NAV] :: TABS -->
        <nav class="cocktail-tabs" aria-label="Cocktail Navigation">
            <button 
                v-for="(cocktail, index) in allCocktails" 
                :key="cocktail.id" 
                @click="goToSlide(index)"
                :class="[
                    index === currentIndex 
                    ? 'text-white border-white' 
                    : 'text-white/50 border-white/50'
                ]"
            >
                {{ cocktail.name }}
            </button>
        </nav>

        <!-- [CONTENT] :: MAIN_SLIDE -->
        <div class="content">
            
            <!-- [NAV] :: ARROW_CONTROLS -->
            <div class="arrows">
                <button class="text-left" @click="goToSlide(currentIndex - 1)">
                    <span>{{ prevCocktail.name }}</span>
                    <img src="/images/right-arrow.png" alt="right-arrow" aria-hidden="true" />
                </button>

                <button class="text-left" @click="goToSlide(currentIndex + 1)">
                    <span>{{ nextCocktail.name }}</span>
                    <img src="/images/left-arrow.png" alt="left-arrow" aria-hidden="true" />
                </button>
            </div>

            <!-- [IMAGE] :: COCKTAIL_VISUAL -->
            <div class="cocktail">
                <img :src="currentCocktail.image" class="object-contain" :alt="currentCocktail.name"/>
            </div>

            <!-- [TEXT] :: DETAILS -->
            <div class="recipe">
                <div class="info">
                    <p>Recipe for:</p>
                    <p id="title">{{ currentCocktail.name }}</p>
                </div>

                <div class="details">
                    <h2>{{ currentCocktail.title }}</h2>
                    <p>{{ currentCocktail.description }}</p>
                </div>
            </div>
        </div>
    </section>
</template>