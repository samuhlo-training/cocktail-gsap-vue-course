<script setup lang="ts">
/**
 * [COMPONENT] :: COCKTAILS_LIST
 * ----------------------------------------------------------------------
 * Displays lists of popular cocktails and mocktails.
 * Features a scroll-triggered parallax animation for decorative leaves.
 *
 * @module    components/Cocktails.vue
 * ----------------------------------------------------------------------
 */

// =====================================================================
// [SECTION] :: IMPORTS
// =====================================================================
import { onMounted } from 'vue';
import { cocktailLists, mockTailLists } from '../../constants/'
import gsap from 'gsap';

// =====================================================================
// [SECTION] :: LIFECYCLE HOOKS
// =====================================================================

/**
 * [ hook ] :: ON_MOUNTED
 * Sets up the scroll-linked parallax effect for the background leaves.
 */
onMounted(() => {
    // -----------------------------------------------------------------
    // [ANIMATION] :: PARALLAX_EFFECT
    // Moves leaves in opposite directions as the user scrolls through the section.
    // -----------------------------------------------------------------
    const parallaxTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: '#cocktails',
            start: 'top 30%',
            end: 'bottom 80%',
            scrub: true,
        }
    })

    const OFFSET_VAL = 100;

    parallaxTimeline
        .from('#c-left-leaf', {
            x: -OFFSET_VAL, 
            y: OFFSET_VAL
        })
        .from('#c-right-leaf', {
            x: OFFSET_VAL, 
            y: OFFSET_VAL
        })
})
</script>


<template>
    <!-- [CONTAINER] :: SECTION_ROOT -->
    <section id="cocktails" className="noisy">
        <!-- [DECORATION] :: LEAVES -->
        <img src="/images/cocktail-left-leaf.png" alt="l-leaf" id="c-left-leaf" />
        <img src="/images/cocktail-right-leaf.png" alt="r-leaf" id="c-right-leaf" />

        <!-- [CONTENT] :: LIST_WRAPPER -->
        <div className="list">
            
            <!-- [GROUP] :: POPULAR_COCKTAILS -->
            <div className="popular">
                <h2>Most popular cocktails:</h2>

                <ul>
                    <li v-for="cocktail in cocktailLists" :key="cocktail.name">
                        <div class="md:me-28">
                            <h3>{{ cocktail.name }}</h3>
                            <p>{{ cocktail.country }} | {{ cocktail.detail }}</p>
                        </div>
                        <span>- {{ cocktail.price }}</span>
                    </li>
                </ul>
            </div>

            <!-- [GROUP] :: MOCKTAILS -->
            <div className="loved">
                <h2>Most loved mocktails:</h2>

                <ul>
                    <li v-for="mockTail in mockTailLists" :key="mockTail.name">
                        <div class="md:me-28">
                            <h3>{{ mockTail.name }}</h3>
                            <p>{{ mockTail.country }} | {{ mockTail.detail }}</p>
                        </div>
                        <span>- {{ mockTail.price }}</span>
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>