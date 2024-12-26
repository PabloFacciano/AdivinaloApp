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
    pageTrackerScreenviewEnabled: true,
    config: { id: "G-1HWM3D7HMP" }
}, router)

// https://github.com/HamadaFMahdi/vue-rewards
import VueRewards from "vue-rewards";
app.use(VueRewards);

app.mount('#app');