<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { goodLists, featureLists } from '../../constants';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let ctx: gsap.Context;

onMounted(() => {
    ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

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
                    scrub: 1.5,
                    pin: true
                }
            });

            maskTimeline
                .to('.will-fade', { opacity: 0, stagger: 0.2, ease: 'power1.inOut' })
                .to('.masked-img', { scale: 1.3, maskPosition: 'center', maskSize: '400%', duration: 1, ease: 'power1.inOut' })
                .to('#masked-content', { opacity: 1, duration: 1, ease: 'power1.inOut' });
        });
    });
});

onUnmounted(() => {
    ctx?.revert();
});
</script>

<template>
    <div id="work">
        <div class="container mx-auto h-full pt-20">
            <h2 class="will-fade">The ART</h2>

            <div class="content">
                <ul class="space-y-4 will-fade">
                    <li v-for="(good, index) in goodLists" :key="index" class="flex items-center gap-2">
                        <img src="/images/check.png" alt="check">
                        <p>{{ good }}</p>
                    </li>
                </ul>
                <div class="cocktail-img">
                    <img src="/images/under-img.jpg" alt="cocktail"
                        class="abs-center masked-img size-full object-contain">
                </div>

                <ul class="space-y-4 will-fade">
                    <li v-for="(feature, index) in featureLists" :key="index" class="flex items-center gap-2">
                        <img src="/images/check.png" alt="check">
                        <p>{{ feature }}</p>
                    </li>
                </ul>
            </div>

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