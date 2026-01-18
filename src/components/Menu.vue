<script setup lang="ts">
/**
 * [COMPONENT] :: COCKTAIL_MENU_CAROUSEL
 * ----------------------------------------------------------------------
 * Interactive carousel for viewing detailed cocktail recipes.
 * Features circular navigation, animations on slide change, and responsive layout.
 *
 * TUTORIAL MODE:
 * This component explores "Reactive vs Imperative" logic.
 * 1. Reactive State: Vue handles the data (index, strings, image paths) automatically.
 * 2. Circular Indexing: Using the modulo operator (%) to create an infinite loop.
 * 3. Imperative Tweens: Triggering GSAP manually via 'watch' because animations 
 *    cannot be purely declarative when they depend on timing.
 *
 * @module components/Menu.vue
 * ----------------------------------------------------------------------
 */

// ================= ====================================================
// [SECTION] :: IMPORTS
// =====================================================================
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { allCocktails } from '../constants';
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
 * 
 * [STRATEGY] :: CIRCULAR_LOGIC
 * (currentIndex + total) % total
 * 1. If index is -1, (-1 + 5) % 5 = 4. Wraps perfectly to the end.
 * 2. If index is 5, (5 + 5) % 5 = 0. Wraps perfectly to the start.
 */
const currentCocktail = computed<Cocktail>(() => {
    return allCocktails[(currentIndex.value + totalCocktails) % totalCocktails] as Cocktail;
});

/**
 * [CALC] :: PREV_COCKTAIL
 * Helper for the "Previous" button label.
 */
const prevCocktail = computed<Cocktail>(() => {
    return allCocktails[(currentIndex.value - 1 + totalCocktails) % totalCocktails] as Cocktail;
});

/**
 * [CALC] :: NEXT_COCKTAIL
 * Helper for the "Next" button label.
 */
const nextCocktail = computed<Cocktail>(() => {
    return allCocktails[(currentIndex.value + 1 + totalCocktails) % totalCocktails] as Cocktail;
});

// =====================================================================
// [SECTION] :: ACTIONS & METHODS
// =====================================================================

/**
 * [ACTION] :: GO_TO_SLIDE
 * Logic to jump to a specific cocktail.
 * @param index - The target position.
 */
const goToSlide = (index: number) => {
    currentIndex.value = (index + totalCocktails) % totalCocktails;
};

/**
 * [ANIMATION] :: EXECUTE_TRANSITION
 * Resets and then slides in the content elements.
 * 
 * WHY NOT USE <transition>?
 * While Vue's <transition> is great for simple entries, GSAP gives us
 * professional-grade control over specific properties like xPercent 
 * and ease curves for each sub-element.
 */
const animateSlide = () => {
    // Reveal Recipe Title
    gsap.fromTo('#title', 
        { opacity: 0 }, 
        { opacity: 1, duration: ANIM_DURATION }
    );
    
    // Slide in the product image from the left
    gsap.fromTo('.cocktail img', 
        { opacity: 0, xPercent: -100 }, 
        { xPercent: 0, opacity: 1, duration: ANIM_DURATION, ease: 'power1.inOut' }
    );
    
    // Pop up the text details from the bottom
    gsap.fromTo('.details h2, .details p', 
        { yPercent: 100, opacity: 0 }, 
        { yPercent: 0, opacity: 1, ease: 'power1.inOut', stagger: 0.1 }
    );
};

// =====================================================================
// [SECTION] :: WATCHERS & LIFECYCLE
// =====================================================================

/**
 * [WATCH] :: TRANSITION_TRIGGER
 * We "watch" the index. Every time it changes (via button click),
 * we manually fire the GSAP animation function.
 */
watch(currentIndex, () => {
    animateSlide();
});

onMounted(() => {
    // Fire the first time to show the initial slide
    animateSlide();
});

onUnmounted(() => {
   // Kill active tweens to prevent them from trying to animate non-existent DOM nodes
   gsap.killTweensOf(['#title', '.cocktail img', '.details h2', '.details p']);
});

</script>

<template>
    <!-- [CONTAINER] :: MENU_ROOT -->
    <section id="menu" aria-labelledby="menu-heading">
        
        <!-- [DECORATION] :: STATIC_LEAVES -->
        <img src="/images/slider-left-leaf.png" alt="Decoration leaf" id="m-left-leaf" />
        <img src="/images/slider-right-leaf.png" alt="Decoration leaf" id="m-right-leaf" />

        <h2 id="menu-heading" class="sr-only">
            Interactive Cocktail Menu
        </h2>

        <!-- [NAV] :: CATEGORY_SELECTOR_TABS -->
        <nav class="cocktail-tabs" aria-label="Cocktail Navigation">
            <button 
                v-for="(cocktail, index) in allCocktails" 
                :key="cocktail.id" 
                @click="goToSlide(index)"
                :aria-current="index === currentIndex ? 'true' : 'false'"
                :class="[
                    index === currentIndex 
                    ? 'text-white border-white' 
                    : 'text-white/50 border-white/50'
                ]"
            >
                {{ cocktail.name }}
            </button>
        </nav>

        <!-- [BLOCK] :: ACTIVE_SLIDE_CONTENT -->
        <div class="content">
            
            <!-- [GROUP] :: ARROW_CONTROLS_OVERLAY -->
            <div class="arrows">
                <!-- PREV BUTTON -->
                <button class="text-left" @click="goToSlide(currentIndex - 1)" :aria-label="`Go to ${prevCocktail.name}`">
                    <span>{{ prevCocktail.name }}</span>
                    <img src="/images/right-arrow.png" alt="arrow icon" aria-hidden="true" />
                </button>

                <!-- NEXT BUTTON -->
                <button class="text-left" @click="goToSlide(currentIndex + 1)" :aria-label="`Go to ${nextCocktail.name}`">
                    <span>{{ nextCocktail.name }}</span>
                    <img src="/images/left-arrow.png" alt="arrow icon" aria-hidden="true" />
                </button>
            </div>

            <!-- [ELEMENT] :: PRODUCT_VISUAL -->
            <div class="cocktail">
                <img :src="currentCocktail.image" class="object-contain" :alt="`Image of ${currentCocktail.name}`"/>
            </div>

            <!-- [GROUP] :: RECIPE_AND_DETAILS -->
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