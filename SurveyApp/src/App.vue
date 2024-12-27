<template>
  <div class="transition-colors duration-200">
    <MainApp v-if="this.mainStore?.auth?.session != null" />
    <AppLogin v-else />
  </div>
</template>

<script>
import { useMainStore } from './stores/main';
import MainApp from './views/MainApp.vue';
import AppLogin from './views/AppLogin.vue';

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
