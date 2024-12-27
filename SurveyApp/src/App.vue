<template>
  <div class="transition-colors duration-200">
    <MainApp v-if="this.mainStore?.auth?.session != null" />
    <AppLogin v-else-if="this.showLogin" />
    <AppLandingPage v-else @login="this.showLogin = true;" />
  </div>
</template>

<script>
import { useMainStore } from './stores/main';
import MainApp from './views/MainApp.vue';
import AppLogin from './views/AppLogin.vue';
import AppLandingPage from './views/AppLandingPage.vue';

export default {
  components: {
    MainApp,
    AppLandingPage,
    AppLogin
  },
  data(){
    return {
      mainStore: useMainStore(),
      showLogin: false
    }
  }
};
</script>
