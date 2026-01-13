/**
 * [APP] :: ENTRY_POINT
 * ----------------------------------------------------------------------
 * Main initialization file for the Vue 3 application.
 * Imports global styles, the root component, and mounts the app to the DOM.
 *
 * @module    src/main
 * ----------------------------------------------------------------------
 */

import { createApp } from 'vue'
import './assets/main.css'
import App from './App.vue'

// =====================================================================
// [SECTION] :: INITIALIZATION
// =====================================================================

/**
 * [INIT] :: CREATE_APP
 * Creates the Vue application instance and mounts it to the #app element.
 */
createApp(App).mount('#app')
