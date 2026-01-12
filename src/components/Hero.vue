<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger, SplitText } from 'gsap/all';


gsap.registerPlugin(ScrollTrigger, SplitText);

const videoRef = ref<HTMLVideoElement | null>(null);
let ctx: gsap.Context;

onMounted(() => {
  ctx = gsap.context(() => {
    // Text Animations
    const heroSplit = new SplitText(".title", {
      type: "chars, words",
    });

    const paragraphSplit = new SplitText(".subtitle", {
      type: "lines",
    });

    // Apply text-gradient class
    heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));

    gsap.from(heroSplit.chars, {
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
    });

    gsap.from(paragraphSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
      delay: 1,
    });

    // Parallax & ScrollTrigger common
    gsap.timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
      .to(".right-leaf", { y: 200 }, 0)
      .to(".left-leaf", { y: -200 }, 0)
      .to(".arrow", { y: 100 }, 0);

    // Video ScrollTrigger with Responsive Logic
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