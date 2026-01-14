<script setup lang="ts">
/**
 * [COMPONENT] :: ART_SECTION
 * ----------------------------------------------------------------------
 * Section demonstrating a mask-reveal effect using GSAP ScrollTrigger.
 * A cocktail image expands to fill the view, revealing text content.
 *
 * @module    components/Art.vue
 * ----------------------------------------------------------------------
 */

// =====================================================================
// [SECTION] :: IMPORTS
// =====================================================================
import { onMounted, onUnmounted } from 'vue';
import { goodLists, featureLists } from '../constants';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// =====================================================================
// [SECTION] :: CONSTANTS
// =====================================================================
const MASK_SCALE_TARGET = 1.3;
const MASK_SIZE_TARGET  = '400%';
const SCRUB_INTENSITY   = 1.5;
const ANIM_DURATION     = 1;

// =====================================================================
// [SECTION] :: COMPONENT STATE
// =====================================================================
let ctx: gsap.Context;

// =====================================================================
// [SECTION] :: LIFECYCLE HOOKS
// =====================================================================

/**
 * [ hook ] :: ON_MOUNTED
 * Initializes the mask expansion animation linked to scroll.
 */
onMounted(() => {
    ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        // Responsive animation setup
        mm.add({
            isMobile: "(max-width: 767px)",
            isDesktop: "(min-width: 768px)",
        }, (context) => {
            const { isMobile } = context.conditions as { isMobile: boolean };
            const start = isMobile ? 'top 20%' : 'top top';

            const maskTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: '#art',
                    start,
                    end: 'bottom center',
                    scrub: SCRUB_INTENSITY,
                    pin: true // WHY PIN? 'pin: true' freezes the #art section in the viewport while the animation plays.
                }
            });

            // -----------------------------------------------------------------
            // [ANIMATION] :: MASK_REVEAL
            // 1. Fades out checklist items.
            // 2. Expands the mask on the center image effectively zooming in.
            // 3. Fades in the final text message.
            // -----------------------------------------------------------------
            maskTimeline
                .to('.will-fade', { 
                    opacity: 0, 
                    stagger: 0.2, 
                    ease: 'power1.inOut' 
                })
                .to('.masked-img', { 
                    // HOW MASK ANIMATION WORKS:
                    // By increasing the scale of the image AND the size of the mask (clip-path effectively),
                    // we create the illusion of "entering" the image.
                    scale: MASK_SCALE_TARGET, 
                    maskPosition: 'center', 
                    maskSize: MASK_SIZE_TARGET, 
                    duration: ANIM_DURATION, 
                    ease: 'power1.inOut' 
                })
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
 * Cleanup GSAP context.
 */
onUnmounted(() => {
    ctx?.revert();
});
</script>

<template>
    <!-- [CONTAINER] :: ART_SECTION_ROOT -->
    <div id="art">
        <div class="container mx-auto h-full pt-20">
            <h2 class="will-fade">The ART</h2>

            <div class="content">
                <!-- [LIST] :: LEFT_FEATURES -->
                <ul class="space-y-4 will-fade">
                    <li v-for="(good, index) in goodLists" :key="index" class="flex items-center gap-2">
                        <img src="/images/check.png" alt="check">
                        <p>{{ good }}</p>
                    </li>
                </ul>
                
                <!-- [IMAGE] :: MASK_SOURCE -->
                <div class="cocktail-img">
                    <img src="/images/under-img.jpg" alt="cocktail"
                        class="abs-center masked-img size-full object-contain">
                </div>

                <!-- [LIST] :: RIGHT_FEATURES -->
                <ul class="space-y-4 will-fade">
                    <li v-for="(feature, index) in featureLists" :key="index" class="flex items-center gap-2">
                        <img src="/images/check.png" alt="check">
                        <p>{{ feature }}</p>
                    </li>
                </ul>
            </div>

            <!-- [CONTENT] :: REVEALED_MESSAGE -->
            <div class="masked-container">
                <h2 class="will-fade">Sip-Worthy Perfection</h2>
                <div id="masked-content">
                    <h3>Made with Craft, Poured with Passion</h3>
                    <p>This isn’t just a drink. It’s a carefully crafted moment made just for you.</p>
                </div>
            </div>
        </div>
    </div>
</template>