/**
 * [APP] :: ENTRY_POINT
 * ----------------------------------------------------------------------
 * The gateway to our Vue application. This file is responsible for
 * assembling the core pieces and mounting them to the browser's DOM.
 *
 * TUTORIAL MODE:
 * 1. Global CSS: We import './assets/main.css' here so it applies to the
 *    entire app, including Tailwind utilities.
 * 2. App Instance: createApp(App) creates the root Vue instance.
 * 3. Mounting: .mount('#app') links Vue to the <div id="app"> in index.html.
 *
 * @module src/main
 * ----------------------------------------------------------------------
 */

import { createApp } from "vue";
import "./assets/main.css";
import App from "./App.vue";

// =====================================================================
// [SECTION] :: INITIALIZATION
// =====================================================================

/**
 * [INIT] :: BOOTSTRAP
 * Executing the final step to bring the application to life.
 */
createApp(App).mount("#app");
