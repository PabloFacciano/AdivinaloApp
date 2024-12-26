import './style.css';


import { createApp } from 'vue';
import App from './App.vue';
const app = createApp(App);


import { createPinia } from 'pinia';
const pinia = createPinia();
app.use(pinia);

import router from './router/router.js'
app.use(router);

import VueGtag from "vue-gtag";
app.use(VueGtag, {
    appName: 'AdivinaloAPP',
    pageTrackerScreenviewEnabled: true,
    config: { id: "G-1HWM3D7HMP" }
}, router)

// https://github.com/HamadaFMahdi/vue-rewards
import VueRewards from "vue-rewards";
app.use(VueRewards);

// vue-turnstile
// https://github.com/ruigomeseu/vue-turnstile


app.mount('#app');