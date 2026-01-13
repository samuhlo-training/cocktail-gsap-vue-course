<div align="center">
  <br />
  <br />
  
  # <code>COCKTAIL_GSAP_VUE_COURSE</code>
  
  **EDUCATIONAL VUE 3 CONVERSION / GSAP LABORATORY**
  
  <br />

  <img src="https://img.shields.io/badge/VUE_3-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D" alt="Vue" />
  <img src="https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=black" alt="GSAP" />
  <img src="https://img.shields.io/badge/TYPESCRIPT-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />


  <br />
  <br />
</div>

---

### 00 __ PREVIEW

![Hero Preview](public/readme/hero.png)

> **ABSTRACT:** A complete port of the GSAP Cocktail website to Vue 3. This project serves as a deep dive into using GSAP with Vue's Composition API, featuring a step-by-step commented codebase to explain the "why" and "how" of every animation.
>
> <br />
>
> **ORIGIN:** Based on the [GSAP Cocktail Course](https://www.youtube.com/watch?v=AW1yfBKRMKc) by [JavaScript Mastery](https://www.youtube.com/@javascriptmastery).
> *Adapted to Vue 3 + TypeScript with extensive educational comments.*

---

### 01 __ ARCHITECTURE & DECISIONS

| COMPONENT | TECH | NOTE |
| :--- | :--- | :--- |
| **Core** | `Vue 3` | Composition API with `<script setup>`. |
| **Motion** | `GSAP` | ScrollTrigger, SplitText (simulated/real), customized for Vue lifecycle. |
| **Styles** | `Tailwind CSS v4` | Utility-first styling. |
| **Typing** | `TypeScript` | Full type safety for components and GSAP contexts. |

<br>

### 02 __ INSTALLATION

*Run local environment:*

```bash
# 1. Clone
git clone https://github.com/samuhlo-training/cocktail-gsap-vue-course.git

# 2. Install dependencies (pnpm enforced)
pnpm install

# 3. Ignite
pnpm dev
```

### 03 __ EDUCATIONAL VALUE

This tailored version focuses on the **Vue implementation** of complex GSAP timelines.

#### A. VUE GSAP CONTEXT
Example of how we handle GSAP cleanup and scoping in Vue 3:

```typescript
// Optimized for Vue's unmount lifecycle
import { onMounted, onUnmounted, ref } from 'vue';
import gsap from 'gsap';

// .. inside component
onMounted(() => {
  const ctx = gsap.context(() => {
    gsap.from('.element', {
      scrollTrigger: { trigger: '.section' },
      y: 100,
      opacity: 0
    });
  }, mainContainer.value); // Scoped to component
});

onUnmounted(() => {
  ctx.revert(); // Essential for SPA navigation
});
```

<div align="center">


<code>VUE ADAPTATION BY <a href='https://github.com/samuhlo'>samuhlo</a></code>
<br>
<small>Original Design & Concept by JavaScript Mastery</small>


<small>Lugo, Galicia</small> </div>