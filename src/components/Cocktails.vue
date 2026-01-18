<script setup lang="ts">
/**
 * [COMPONENT] :: COCKTAILS_LIST
 * ----------------------------------------------------------------------
 * Displays lists of popular cocktails and mocktails.
 * Features a scroll-triggered parallax animation for decorative leaves.
 *
 * TUTORIAL MODE:
 * This component focuses on "Parallax Mechanics".
 * 1. Offset Logic: Starting elements outside their natural position to create motion.
 * 2. Scrubbed Timelines: Making the animation speed feel exactly like the user's scroll speed.
 * 3. Directional Depth: Moving elements in opposing directions to simulate a 3D space.
 *
 * @module components/Cocktails.vue
 * ----------------------------------------------------------------------
 */

// ================= ====================================================
// [SECTION] :: IMPORTS
// =====================================================================
import { onMounted } from 'vue';
import { cocktailLists, mockTailLists } from '../constants/'
import gsap from 'gsap';

// =====================================================================
// [SECTION] :: LIFECYCLE HOOKS
// =====================================================================

/**
 * [ hook ] :: ON_MOUNTED
 * Sets up the scroll-linked movement for the background leaves.
 */
onMounted(() => {
    // -----------------------------------------------------------------
    // [ANIMATION] :: PARALLAX_CORE
    // WHY USE A TIMELINE?
    // It allows us to group multiple leaf movements under a single scroll control.
    // -----------------------------------------------------------------
    const parallaxTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: '#cocktails',
            start: 'top 30%', // Begin when section is 30% into the viewport
            end: 'bottom 80%', // Finish when bottom is 80% up
            scrub: true,       // Links movement 1:1 with scroll distance
        }
    })

    const OFFSET_VAL = 100; // The amount of "extra" distance the leaves travel

    // [STRATEGY] :: MOTION_FROM_OFFSET
    // We use .from() to define where the leaves come FROM.
    // As you scroll, they move TOWARDS their natural CSS positions (0,0).
    parallaxTimeline
        .from('#c-left-leaf', {
            x: -OFFSET_VAL, // Starts shifted to the left
            y: OFFSET_VAL   // Starts shifted downwards
        })
        .from('#c-right-leaf', {
            x: OFFSET_VAL,  // Starts shifted to the right
            y: OFFSET_VAL   // Starts shifted downwards
        }, 0) // The '0' makes both leaves move at the same time
})
</script>


<template>
    <!-- [CONTAINER] :: COCKTAILS_ROOT -->
    <section id="cocktails" className="noisy">
        
        <!-- [DECORATION] :: PARALLAX_LEAVES -->
        <!-- These move relative to the scroll position -->
        <img src="/images/cocktail-left-leaf.png" alt="Decorative leaf left" id="c-left-leaf" />
        <img src="/images/cocktail-right-leaf.png" alt="Decorative leaf right" id="c-right-leaf" />

        <!-- [BLOCK] :: MENU_LISTINGS_WRAPPER -->
        <div className="list">
            
            <!-- [GROUP] :: CATEGORY_POPULAR_COCKTAILS -->
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

            <!-- [GROUP] :: CATEGORY_LOVED_MOCKTAILS -->
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