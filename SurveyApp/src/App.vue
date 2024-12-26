<template>
  <div>
    <MainApp v-if="this.mainStore?.auth?.session != null" />
    <AppLogin v-else />
  </div>
</template>

<script>
import { useMainStore } from './stores/main';
import MainApp from './pages/MainApp.vue';
import AppLogin from './pages/AppLogin.vue';

export default {
  components: {
    MainApp,
    AppLogin
  },
  data(){
    return {
      mainStore: useMainStore()
    }
  }
};
</script>
