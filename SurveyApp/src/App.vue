<template>
  <div class="transition-colors duration-200">
    <span class="underline"></span>
    <AppNotification />
    <MainApp v-if="this.mainStore?.auth?.session != null" />
    <AppLogin v-else-if="this.showLogin" />
    <AppLandingPage v-else @login="this.showLogin = true;" />
  </div>
</template>

<script>
import { useMainStore } from './stores/main';
import { useNotificationStore } from './stores/notification';
import MainApp from './views/MainApp.vue';
import AppLogin from './views/AppLogin.vue';
import AppLandingPage from './views/AppLandingPage.vue';
import AppNotification from './components/AppNotification.vue';

export default {
  components: {
    MainApp,
    AppLandingPage,
    AppLogin,
    AppNotification
  },
  data(){
    return {
      mainStore: useMainStore(),
      notificationStore: useNotificationStore(),
      showLogin: false
    }
  },
  mounted(){
    this.notificationStore.send('Enviame tus comentarios <a class="underline" href="https://forms.gle/HXk8WTzJmu9wB3VL6" target="_blank">aquí</a>');
  }
};
</script>
