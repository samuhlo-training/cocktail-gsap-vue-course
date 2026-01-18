<script setup lang="ts">
/**
 * [COMPONENT] :: ABOUT_SECTION
 * ----------------------------------------------------------------------
 * "About Us" section featuring a text introduction and a masonry-like
 * grid of images that animate in on scroll.
 *
 * TUTORIAL MODE:
 * This component demonstrates:
 * 1. Scroll-Triggered Timelines: Triggering animations when a section enters view.
 * 2. Staggered Arrays: Animating multiple DOM elements (text and images) in a sequence.
 * 3. Position Parameters: Fine-tuning the timing overlap between timeline tweens.
 *
 * @module components/About.vue
 * ----------------------------------------------------------------------
 */

// =====================================================================
// [SECTION] :: IMPORTS
// =====================================================================
import gsap from 'gsap';
import { onMounted } from 'vue';
import { SplitText } from 'gsap/all';

// =====================================================================
// [SECTION] :: LIFECYCLE HOOKS
// =====================================================================

/**
 * [ hook ] :: ON_MOUNTED
 * Orchestrates the entrance animation for text and the masonry grid.
 */
onMounted(() => {
    // -----------------------------------------------------------------
    // [ANIMATION] :: ASSET_PREPARATION
    // Splits the heading into individual words for more granular control.
    // -----------------------------------------------------------------
    const titleSplit = SplitText.create('#about h2', {
        type: 'words'
    })
    
    // -----------------------------------------------------------------
    // [ANIMATION] :: ENTRANCE_TIMELINE
    // WHY SCROLLTRIGGER?
    // We want elements to appear ONLY when the user reaches this section.
    // 'start: "top center"' means the animation begins when the TOP of the section
    // hits the CENTER of the viewport.
    // -----------------------------------------------------------------
    const scrollTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: '#about',
            start: 'top center'
        }
    })

    // [STEP 1] :: TEXT_REVEAL
    // Words slide up and fade in with a tiny stagger for a rippling effect.
    scrollTimeline
        .from(titleSplit.words, {
            opacity: 0, 
            duration: 1, 
            yPercent: 100, 
            ease: 'expo.out', 
            stagger: 0.02 
        })
        
    // [STEP 2] :: MASONRY_GRID_REVEAL
    // Targets multiple groups (.top-grid and .bottom-grid) simultaneously.
    scrollTimeline
        .from('.top-grid div, .bottom-grid div', {
            opacity: 0, 
            duration: 1, 
            ease: 'power1.inOut', 
            stagger: 0.04, 
        }, '-=0.5') 
        /**
         * WHY '-=0.5'?
         * This is a POSITION PARAMETER. It tells the timeline to start this animation
         * 0.5 seconds BEFORE the previous one finishes.
         * This overlap makes the transition feel more fluid and less "robotic".
         */
})

</script>

<template>
    <!-- [CONTAINER] :: ABOUT_ROOT -->
    <div id="about">
        
        <!-- [BLOCK] :: TEXT_CONTENT_WRAPPER -->
        <div className="mb-16 md:px-0 px-5">
            <div className="content">
                <!-- [GROUP] :: HEADING -->
                <div className="md:col-span-8">
                    <p className="badge">Best Cocktails</p>
                    <h2>
                        Where every detail matters <span className="text-white">-</span>
                        from muddle to garnish
                    </h2>
                </div>

                <!-- [GROUP] :: SOCIAL_PROOF -->
                <div className="sub-content">
                    <p>
                        Every cocktail we serve is a reflection of our obsession with detail — from the first muddle to
                        the final garnish. That care is what turns a simple drink into something truly memorable.
                    </p>

                    <div>
                        <p className="md:text-3xl text-xl font-bold">
                            <span>4.5</span>/5
                        </p>
                        <p className="text-sm text-white-100">
                            More than +12000 customers
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- [BLOCK] :: MASONRY_IMAGE_GRID -->
        
        <!-- [GROUP] :: TOP_ROW -->
        <div className="top-grid">
            <div className="md:col-span-3">
                <div className="noisy" />
                <img src="/images/abt1.png" alt="Interior view" />
            </div>

            <div className="md:col-span-6">
                <div className="noisy" />
                <img src="/images/abt2.png" alt="Cocktail preparation" />
            </div>

            <div className="md:col-span-3">
                <div className="noisy" />
                <img src="/images/abt1.png" alt="Bar detail" />
            </div>
        </div>

        <!-- [GROUP] :: BOTTOM_ROW -->
        <div className="bottom-grid">
            <div className="md:col-span-8">
                <div className="noisy" />
                <img src="/images/abt3.png" alt="Wide atmosphere" />
            </div>

            <div className="md:col-span-4">
                <div className="noisy" />
                <img src="/images/abt4.png" alt="Close-up garnish" />
            </div>
        </div>

    </div>
</template>