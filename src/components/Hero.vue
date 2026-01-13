<script setup lang="ts">
/**
 * [COMPONENT] :: HERO_SECTION
 * ----------------------------------------------------------------------
 * The landing section of the application featuring a video background,
 * split-text animations, and parallax effects on scroll.
 *
 * @module    components/Hero.vue
 * ----------------------------------------------------------------------
 */

// =====================================================================
// [SECTION] :: IMPORTS
// =====================================================================
import { ref, onMounted, onUnmounted } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger, SplitText } from 'gsap/all';


gsap.registerPlugin(ScrollTrigger, SplitText);

// =====================================================================
// [SECTION] :: CONSTANTS & CONFIG
// =====================================================================
const TEXT_ANIM_DURATION = 1.8;
const TEXT_ANIM_STAGGER  = 0.06;
const TEXT_DELAY         = 1;

// Parallax movement values
const P_RIGHT_LEAF_Y = 200;
const P_LEFT_LEAF_Y  = -200;
const P_ARROW_Y      = 100;

// =====================================================================
// [SECTION] :: COMPONENT STATE
// =====================================================================
const videoRef = ref<HTMLVideoElement | null>(null);
let ctx: gsap.Context;

// =====================================================================
// [SECTION] :: LIFECYCLE HOOKS
// =====================================================================

/**
 * [ hook ] :: ON_MOUNTED
 * Initializes GSAP context, text animations, and scroll-triggered video control.
 */
onMounted(() => {
  ctx = gsap.context(() => {
    // -----------------------------------------------------------------
    // [ANIMATION] :: TEXT_SPLIT
    // Splits title and subtitle for staggered entrance effects.
    // -----------------------------------------------------------------
    const heroSplit = new SplitText(".title", {
      type: "chars, words",
    });

    const paragraphSplit = new SplitText(".subtitle", {
      type: "lines",
    });

    // Apply text-gradient class to each character of the title
    heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));

    // Animate Title
    gsap.from(heroSplit.chars, {
      yPercent: 100,
      duration: TEXT_ANIM_DURATION,
      ease: "expo.out",
      stagger: TEXT_ANIM_STAGGER,
    });

    // Animate Subtitle
    gsap.from(paragraphSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: TEXT_ANIM_DURATION,
      ease: "expo.out",
      stagger: TEXT_ANIM_STAGGER,
      delay: TEXT_DELAY,
    });

    // -----------------------------------------------------------------
    // [ANIMATION] :: PARALLAX_SCROLL
    // Moves decorative elements (leaves, arrow) at different speeds.
    // -----------------------------------------------------------------
    gsap.timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
      .to(".right-leaf", { y: P_RIGHT_LEAF_Y }, 0)
      .to(".left-leaf", { y: P_LEFT_LEAF_Y }, 0)
      .to(".arrow", { y: P_ARROW_Y }, 0);

    // -----------------------------------------------------------------
    // [ANIMATION] :: VIDEO_CONTROL
    // Syncs video playback with scroll position. Handles responsive start/end points.
    // -----------------------------------------------------------------
    const mm = gsap.matchMedia();

    mm.add({
      isMobile: "(max-width: 767px)",
      isDesktop: "(min-width: 768px)",
    }, (context) => {
      const { isMobile } = context.conditions as { isMobile: boolean };
      const startValue = isMobile ? "top 50%" : "center 60%";
      const endValue = isMobile ? "120% top" : "bottom top";

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "video", // targeting the video tag directly
          start: startValue,
          end: endValue,
          scrub: true,
          pin: true,
        },
      });

      // Ensure metadata is loaded for duration
      const initVideoAnim = () => {
        if (videoRef.value && videoRef.value.duration) {
          tl.to(videoRef.value, {
            currentTime: videoRef.value.duration,
            ease: "none", // important for scrubbing
          });
        }
      };

      if (videoRef.value) {
        if (videoRef.value.readyState >= 1) {
          initVideoAnim();
        } else {
          videoRef.value.onloadedmetadata = initVideoAnim;
        }
      }
    });
  });
});

/**
 * [ hook ] :: ON_UNMOUNTED
 * Cleans up GSAP context to prevent memory leaks or conflict.
 */
onUnmounted(() => {
  ctx?.revert();
});
</script>

<template>
  <section id="hero" class="noisy">
    <h1 class="title">MOJITO</h1>

    <img
      src="/images/hero-left-leaf.png"
      alt="left-leaf"
      class="left-leaf"
    />
    <img
      src="/images/hero-right-leaf.png"
      alt="right-leaf"
      class="right-leaf"
    />

    <div class="body">
      <!-- <img src="/images/arrow.png" alt="arrow" class="arrow" /> -->

      <div class="content">
        <div class="space-y-5 hidden md:block">
          <p>Cool. Crisp. Classic.</p>
          <p class="subtitle">
            Sip the Spirit <br /> of Summer
          </p>
        </div>

        <div class="view-cocktails">
          <p class="subtitle">
            Every cocktail on our menu is a blend of premium ingredients,
            creative flair, and timeless recipes — designed to delight your
            senses.
          </p>
          <a href="#cocktails">View cocktails</a>
        </div>
      </div>
    </div>
  </section>

  <div class="video absolute inset-0">
    <video
      ref="videoRef"
      muted
      playsinline
      preload="auto"
      src="/videos/output.mp4"
    ></video>
  </div>
</template>