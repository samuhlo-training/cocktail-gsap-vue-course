<script setup lang="ts">
/**
 * [COMPONENT] :: ART_SECTION
 * ----------------------------------------------------------------------
 * Section demonstrating a mask-reveal effect using GSAP ScrollTrigger.
 * A cocktail image expands to fill the view, revealing the main message.
 *
 * TUTORIAL MODE:
 * This component focuses on "Masking" as a storytelling tool.
 * 1. Pinned Sections: Freezing the section in place while animating its internal state.
 * 2. Visual Layering: Transitions between different content layers (checklists vs hero image).
 * 3. MatchMedia: Adapting complex timelines for mobile vs desktop screen heights.
 *
 * @module components/Art.vue
 * ----------------------------------------------------------------------
 */

// =====================================================================
// [SECTION] :: IMPORTS
// =====================================================================
import { onMounted, onUnmounted } from 'vue';
import { goodLists, featureLists } from '../constants';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// [GSAP] Register the required plugin
gsap.registerPlugin(ScrollTrigger);

// =====================================================================
// [SECTION] :: CONFIGURATION
// =====================================================================
const MASK_SCALE_TARGET = 1.3;
const MASK_SIZE_TARGET  = '400%';
const SCRUB_INTENSITY   = 1.5;
const ANIM_DURATION     = 1;

// GSAP context for memory-safe resource cleanup
let ctx: gsap.Context;

// =====================================================================
// [SECTION] :: LIFECYCLE HOOKS
// =====================================================================

/**
 * [ hook ] :: ON_MOUNTED
 * Initializes the mask expansion sequence linked to user scroll.
 */
onMounted(() => {
    ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        // -----------------------------------------------------------------
        // [ANIMATION] :: RESPONSIVE_TIMELINE
        // -----------------------------------------------------------------
        mm.add({
            isMobile: "(max-width: 767px)",
            isDesktop: "(min-width: 768px)",
        }, (context) => {
            const { isMobile } = context.conditions as { isMobile: boolean };
            
            // On desktop, we want a "lock-on" feel (top top).
            // On mobile, we trigger slightly later to avoid cutting off headers.
            const start = isMobile ? 'top 20%' : 'top top';

            const maskTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: '#art',
                    start,
                    end: 'bottom center',
                    scrub: SCRUB_INTENSITY,
                    pin: true 
                    /**
                     * WHY PIN?
                     * 'pin: true' freezes the #art section in the viewport.
                     * This allows the user to scroll "through" the animation sequence
                     * without moving to the next section of the page yet.
                     */
                }
            });

            // [STEP 1] :: EXIT_LISTS
            // Fades out the side checklists to clear the visual field.
            maskTimeline
                .to('.will-fade', { 
                    opacity: 0, 
                    stagger: 0.2, 
                    ease: 'power1.inOut' 
                })

            // [STEP 2] :: MASK_REVEAL
            // HOW IT WORKS:
            // By increasing the 'maskSize' property (linked to a CSS clip-path or mask),
            // and scaling the image simultaneously, we create the illusion of 
            // "entering" the cocktail glass.
            maskTimeline
                .to('.masked-img', { 
                    scale: MASK_SCALE_TARGET, 
                    maskPosition: 'center', 
                    maskSize: MASK_SIZE_TARGET, 
                    duration: ANIM_DURATION, 
                    ease: 'power1.inOut' 
                })

            // [STEP 3] :: CONTENT_REVEAL
            // Final fade of the headline message once the zoom is complete.
            maskTimeline
                .to('#masked-content', { 
                    opacity: 1, 
                    duration: ANIM_DURATION, 
                    ease: 'power1.inOut' 
                });
        });
    });
});

/**
 * [ hook ] :: ON_UNMOUNTED
 * Cleanup GSAP resources.
 */
onUnmounted(() => {
    ctx?.revert();
});
</script>

<template>
    <!-- [CONTAINER] :: ART_ROOT -->
    <div id="art">
        <div class="container mx-auto h-full pt-20">
            
            <!-- [ELEMENT] :: HEADING -->
            <h2 class="will-fade">The ART</h2>

            <!-- [BLOCK] :: COMPOSITION_GRID -->
            <div class="content">
                
                <!-- [GROUP] :: LEFT_FEATURES_LIST -->
                <ul class="space-y-4 will-fade">
                    <li v-for="(good, index) in goodLists" :key="index" class="flex items-center gap-2">
                        <img src="/images/check.png" alt="check icon">
                        <p>{{ good }}</p>
                    </li>
                </ul>
                
                <!-- [ELEMENT] :: CENTRAL_MASKED_IMAGE -->
                <div class="cocktail-img">
                    <img 
                        src="/images/under-img.jpg" 
                        alt="Signature cocktail detail"
                        class="abs-center masked-img size-full object-contain"
                    >
                </div>

                <!-- [GROUP] :: RIGHT_FEATURES_LIST -->
                <ul class="space-y-4 will-fade">
                    <li v-for="(feature, index) in featureLists" :key="index" class="flex items-center gap-2">
                        <img src="/images/check.png" alt="check icon">
                        <p>{{ feature }}</p>
                    </li>
                </ul>
            </div>

            <!-- [BLOCK] :: FINAL_REVEAL_CONTENT -->
            <div class="masked-container">
                <h2 class="will-fade">Sip-Worthy Perfection</h2>
                
                <!-- This content is hidden initially (opacity 0) -->
                <div id="masked-content">
                    <h3>Made with Craft, Poured with Passion</h3>
                    <p>This isn’t just a drink. It’s a carefully crafted moment made just for you.</p>
                </div>
            </div>
        </div>
    </div>
</template>