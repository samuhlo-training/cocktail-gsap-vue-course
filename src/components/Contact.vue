<script setup lang="ts">
/**
 * [COMPONENT] :: CONTACT_FOOTER
 * ----------------------------------------------------------------------
 * The application footer displaying contact info, hours, and social links.
 * Features an entrance animation triggered by scrolling.
 *
 * TUTORIAL MODE:
 * This component explores "Timeline Orchestration".
 * 1. Synchronous Action: Using the '<' symbol to make tweens start together.
 * 2. Nested Staggers: Sequencing text reveals (titles then paragraphs) for hierarchy.
 * 3. Lifecycle Cleanup: Ensuring SplitText and Timelines are destroyed to avoid ghosts.
 *
 * @module components/Contact.vue
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

// GSAP context for memory-safe resource cleanup
let ctx: gsap.Context;

// =====================================================================
// [SECTION] :: LIFECYCLE HOOKS
// =====================================================================

/**
 * [ hook ] :: ON_MOUNTED
 * Sets up the footer reveal animation (text and decorative leaves).
 */
onMounted(() => {
    ctx = gsap.context(() => {
        // [STEP 1] :: TEXT_PREP
        // Split text for staggered reveal.
        const titleSplit = new SplitText("#contact h2", {
            type: "words",
        })

        // [STEP 2] :: FOOTER_TIMELINE
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: '#contact',
                start: 'top center',
            },
            ease: "power1.inOut"
        })
        
        // [ANIM] :: TITLES_REVEAL
        timeline
            .from(titleSplit.words, {
                opacity: 0, 
                yPercent: 100, 
                stagger: ANIM_STAGGER
            })
            // [ANIM] :: DETAILS_REVEAL
            .from('#contact h3, #contact p', {
                opacity: 0, 
                yPercent: 100, 
                stagger: ANIM_STAGGER
            })
            
        // [ANIM] :: LEAF_ENTRANCE
        timeline
            .to('#f-right-leaf', {
                y: LEAF_Y_OFFSET, 
                duration: ANIM_DURATION, 
                ease: 'power1.inOut'
            })
            .to('#f-left-leaf', {
                y: LEAF_Y_OFFSET, 
                duration: ANIM_DURATION, 
                ease: 'power1.inOut'
            }, '<') 
            /**
             * WHY THE '<' SYMBOL?
             * This is a POSITION PARAMETER. It means "start at the same time as the previous tween".
             * This ensures the left and right leaves move UP simultaneously rather than one by one.
             */
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
        
        <!-- [DECORATION] :: ENTRANCE_LEAVES -->
        <img src="/images/footer-right-leaf.png" alt="leaf-right" id="f-right-leaf" />
        <img src="/images/footer-left-leaf.png" alt="leaf-left" id="f-left-leaf" />
        
        <!-- [BLOCK] :: INFORMATION_GRID -->
        <div class="content">
            <!-- [ELEMENT] :: MAIN_HEADING -->
            <h2>{{ storeInfo.heading }}</h2>
            
            <!-- [GROUP] :: LOCATION_DETAILS -->
            <div>
                <h3>Visit Our Bar</h3>
                <p>{{ storeInfo.address }}</p>
            </div>
            
            <!-- [GROUP] :: CONTACT_INFO -->
            <div>
                <h3>Contact Us</h3>
                <p>{{ storeInfo.contact.phone }}</p>
                <p>{{ storeInfo.contact.email }}</p>
            </div>
            
            <!-- [GROUP] :: BUSINESS_HOURS -->
            <div>
                <h3>Open Every Day</h3>
                <div>
                    <p v-for="time in openingHours" :key="time.day">
                        {{ time.day }} : {{ time.time }}
                    </p>
                </div>
            </div>
            
            <!-- [GROUP] :: SOCIAL_NETWORK_LINKS -->
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