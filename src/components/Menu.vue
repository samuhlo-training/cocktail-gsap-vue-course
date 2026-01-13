<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { allCocktails } from '../../constants';
// It's a type import, so we use `import type`
import type { Cocktail } from '../types';
import gsap from 'gsap';

const currentIndex = ref(0);
const totalCocktails = allCocktails.length;

// Computed properties for current, prev, and next cocktails
// Equivalent to the helper functions in the React version
const currentCocktail = computed<Cocktail>(() => {
    return allCocktails[(currentIndex.value + totalCocktails) % totalCocktails] as Cocktail;
});

const prevCocktail = computed<Cocktail>(() => {
    return allCocktails[(currentIndex.value - 1 + totalCocktails) % totalCocktails] as Cocktail;
});

const nextCocktail = computed<Cocktail>(() => {
    return allCocktails[(currentIndex.value + 1 + totalCocktails) % totalCocktails] as Cocktail;
});

const goToSlide = (index: number) => {
    currentIndex.value = (index + totalCocktails) % totalCocktails;
};

// GSAP Animation Logic


const animateSlide = () => {
    // Kill any ongoing animations to avoid conflicts if user clicks fast
    // In Vue with GSAP Context, we can use ctx.revert() or just overwrite: 'auto'
    
    // However, since we want to re-run animations on change, we can just target the elements.
    // The original React code used useGSAP with simple fromTo.
    
    gsap.fromTo('#title', { opacity: 0 }, { opacity: 1, duration: 1 });
    
    gsap.fromTo('.cocktail img', 
        { opacity: 0, xPercent: -100 }, 
        { xPercent: 0, opacity: 1, duration: 1, ease: 'power1.inOut' }
    );
    
    gsap.fromTo('.details h2', 
        { yPercent: 100, opacity: 0 }, 
        { yPercent: 0, opacity: 1, ease: 'power1.inOut' } // fixed opacity: 100 -> 1
    );
    
    gsap.fromTo('.details p', 
        { yPercent: 100, opacity: 0 }, 
        { yPercent: 0, opacity: 1, ease: 'power1.inOut' } // fixed opacity: 100 -> 1
    );
};

// Watch for changes in currentIndex to trigger animation
watch(currentIndex, () => {
    animateSlide();
});

onMounted(() => {
    // Initial animation when component mounts
    animateSlide();
});

onUnmounted(() => {
   // Cleanup if necessary, though simpler animations usually just overwrite
   gsap.killTweensOf(['#title', '.cocktail img', '.details h2', '.details p']);
});

</script>

<template>
    <section id="menu" aria-labelledby="menu-heading">
        <img src="/images/slider-left-leaf.png" alt="left-leaf" id="m-left-leaf" />
        <img src="/images/slider-right-leaf.png" alt="right-leaf" id="m-right-leaf" />

        <h2 id="menu-heading" class="sr-only">
            Cocktail Menu
        </h2>

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

        <div class="content">
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

            <div class="cocktail">
                <img :src="currentCocktail.image" class="object-contain" :alt="currentCocktail.name"/>
            </div>

            <div class="recipe">
                <div class="info">
                    <p>Recipe for:</p>
                    <p id="title">{{ currentCocktail.name }}</p>
                </div>

                <div class="details">
                    <!-- Note: The original data has 'title' and 'description' properties -->
                    <h2>{{ currentCocktail.title }}</h2>
                    <p>{{ currentCocktail.description }}</p>
                </div>
            </div>
        </div>
    </section>
</template>