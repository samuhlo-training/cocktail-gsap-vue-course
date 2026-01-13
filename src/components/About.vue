<script setup lang="ts">
/**
 * [COMPONENT] :: ABOUT_SECTION
 * ----------------------------------------------------------------------
 * "About Us" section featuring a text introduction and a masonry-like
 * grid of images that animate in on scroll.
 *
 * @module    components/About.vue
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
 * Triggers the entrance animation for text and the image grid.
 */
onMounted(() => {
    // -----------------------------------------------------------------
    // [ANIMATION] :: TEXT_REVEAL
    // Splits the heading into words for individual animation.
    // -----------------------------------------------------------------
    const titleSplit = SplitText.create('#about h2', {
        type: 'words'
    })
    
    // WHY SCROLLTRIGGER?
    // We want these elements to appear ONLY when the user reaches this section.
    // 'start: "top center"' means the animation begins when the TOP of the #about section
    // hits the CENTER of the viewport. This is a good "reading" position.
    const scrollTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: '#about',
            start: 'top center'
        }
    })

    // Sequence: Heading Words -> Grid Images
    scrollTimeline
        .from(titleSplit.words, {
            opacity: 0, 
            duration: 1, 
            yPercent: 100, 
            ease: 'expo.out', 
            stagger: 0.02 // A tiny delay between each word creates a rippling text effect
        })
        // HOW SELECTORS WORK:
        // GSAP can target multiple groups of elements at once. 
        // Here we select all divs inside .top-grid AND .bottom-grid simultaneously.
        .from('.top-grid div, .bottom-grid div', {
            opacity: 0, 
            duration: 1, 
            ease: 'power1.inOut', 
            stagger: 0.04, // Stagger each image's appearance for a cascading grid effect
        }, '-=0.5') 
        // ^ WHAT IS '-=0.5'?
        // This is the POSITION PARAMETER. It tells the timeline to start this animation
        // 0.5 seconds BEFORE the previous animation (the text reveal) finishes.
        // This overlap makes the whole sequence feel faster and more fluid.
})

</script>

<template>
    <!-- [CONTAINER] :: ABOUT_SECTION_ROOT -->
    <div id="about">
        <!-- [SUB-SECTION] :: TEXT_CONTENT -->
        <div className="mb-16 md:px-0 px-5">
            <div className="content">
                <div className="md:col-span-8">
                    <p className="badge">Best Cocktails</p>
                    <h2>
                        Where every detail matters <span className="text-white">-</span>
                        from muddle to garnish
                    </h2>
                </div>

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

        <!-- [SUB-SECTION] :: IMAGE_GRID_TOP -->
        <div className="top-grid">
            <div className="md:col-span-3">
                <div className="noisy" />
                <img src="/images/abt1.png" alt="grid-img-1" />
            </div>

            <div className="md:col-span-6">
                <div className="noisy" />
                <img src="/images/abt2.png" alt="grid-img-2" />
            </div>

            <div className="md:col-span-3">
                <div className="noisy" />
                <img src="/images/abt1.png" alt="grid-img-5" />
            </div>
        </div>

        <!-- [SUB-SECTION] :: IMAGE_GRID_BOTTOM -->
        <div className="bottom-grid">
            <div className="md:col-span-8">
                <div className="noisy" />
                <img src="/images/abt3.png" alt="grid-img-3" />
            </div>

            <div className="md:col-span-4">
                <div className="noisy" />
                <img src="/images/abt4.png" alt="grid-img-4" />
            </div>
        </div>

    </div>
</template>