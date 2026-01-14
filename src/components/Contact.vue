<script setup lang="ts">
/**
 * [COMPONENT] :: CONTACT_FOOTER
 * ----------------------------------------------------------------------
 * The application footer displaying contact info, hours, and social links.
 * Features an entrance animation triggered by scrolling.
 *
 * @module    components/Contact.vue
 * ----------------------------------------------------------------------
 */

// =====================================================================
// [SECTION] :: IMPORTS
// =====================================================================
import { openingHours, socials, storeInfo } from "../constants";
import gsap from "gsap";
import { onMounted, onUnmounted } from "vue";
import { SplitText } from "gsap/all";

// =====================================================================
// [SECTION] :: CONSTANTS
// =====================================================================
const ANIM_STAGGER = 0.02;
const LEAF_Y_OFFSET = '-50';
const ANIM_DURATION = 1;

// =====================================================================
// [SECTION] :: COMPONENT STATE
// =====================================================================
let ctx: gsap.Context;

// =====================================================================
// [SECTION] :: LIFECYCLE HOOKS
// =====================================================================

/**
 * [ hook ] :: ON_MOUNTED
 * Sets up the footer entrance animation (text and decorative leaves).
 */
onMounted(() => {
    ctx = gsap.context(() => {
        // -----------------------------------------------------------------
        // [ANIMATION] :: FOOTER_REVEAL
        // Staggered reveal of text elements followed by leaf movement.
        // -----------------------------------------------------------------
        const titleSplit = new SplitText("#contact h2", {
            type: "words",
        })

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: '#contact',
                start: 'top center',
            },
            ease: "power1.inOut"
        })
        
        timeline
            .from(titleSplit.words, {
                opacity: 0, 
                yPercent: 100, 
                stagger: ANIM_STAGGER
            })
            .from('#contact h3, #contact p', {
                opacity: 0, 
                yPercent: 100, 
                stagger: ANIM_STAGGER
            })
            .to('#f-right-leaf', {
                y: LEAF_Y_OFFSET, 
                duration: ANIM_DURATION, 
                ease: 'power1.inOut'
            })
            // WHY THE '<' SYMBOL?
            // This is a POSITION PARAMETER. '<' means "start at the same time as the START of the PREVIOUS animation".
            // So, #f-left-leaf starts moving at the exact same moment as #f-right-leaf.
            // Without this, they would move sequentially (one after the other).
            .to('#f-left-leaf', {
                y: LEAF_Y_OFFSET, 
                duration: ANIM_DURATION, 
                ease: 'power1.inOut'
            }, '<') // Run concurrently with previous tween
    })
})

/**
 * [ hook ] :: ON_UNMOUNTED
 * Cleanup GSAP context.
 */
onUnmounted(() => {
    ctx?.revert();
})
</script>


<template>
    <!-- [CONTAINER] :: FOOTER_ROOT -->
    <footer id="contact">
        <!-- [DECORATION] :: LEAVES -->
        <img src="/images/footer-right-leaf.png" alt="leaf-right" id="f-right-leaf" />
        <img src="/images/footer-left-leaf.png" alt="leaf-left" id="f-left-leaf" />
        
        <!-- [CONTENT] :: INFO_GRID -->
        <div class="content">
            <h2>{{ storeInfo.heading }}</h2>
            
            <!-- [GROUP] :: ADDRESS -->
            <div>
                <h3>Visit Our Bar</h3>
                <p>{{ storeInfo.address }}</p>
            </div>
            
            <!-- [GROUP] :: CONTACT_DETAILS -->
            <div>
                <h3>Contact Us</h3>
                <p>{{ storeInfo.contact.phone }}</p>
                <p>{{ storeInfo.contact.email }}</p>
            </div>
            
            <!-- [GROUP] :: OPENING_HOURS -->
            <div>
                <h3>Open Every Day</h3>
                <div>
                    <p v-for="time in openingHours" :key="time.day">
                        {{ time.day }} : {{ time.time }}
                    </p>
                </div>
            </div>
            
            <!-- [GROUP] :: SOCIAL_LINKS -->
            <div>
                <h3>Socials</h3>
                
                <div class="flex-center gap-5">
                    <div v-for="social in socials" :key="social.name" >
                        <a
                            :href="social.url"
                            target="_blank"
                            rel="noopener noreferrer"
                            :aria-label="social.name"
                        >
                            <img :src="social.icon" :alt="social.name" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>