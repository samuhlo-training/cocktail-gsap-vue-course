<script setup lang="ts">
import { onMounted } from 'vue';
import { navLinks } from '../../constants';
import gsap from 'gsap';


onMounted(() => {
  const navTween = gsap.timeline({
    scrollTrigger: {
      trigger: 'nav',
      start: 'bottom top',
    }
  });

  navTween.fromTo('nav', { backgroundColor: 'transparent' }, { backgroundColor: '#000000050', backdropFilter: 'blur(10px)', duration: 1, ease: 'power1.out' });
});

</script>

<template>
  <nav>
    <div>
      <a href="#home" class="flex items-center gap-2">
        <img src="/images/logo.png" alt="logo" srcset="">
        <p>Velvet Pour</p></a>
      
      <ul>
        <li v-for="nav in navLinks" :key="nav.id">
          <a :href="`#${nav.id}`" class="hover:text-yellow transition-colors duration-300">
            {{ nav.title }}
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>


