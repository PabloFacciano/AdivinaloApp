<template>
  <div class="flex flex-col h-dvh">
    <AppTitlebar />
    <router-view v-slot="{ Component, route }">
      <Transition name="page" mode="out-in">
        <div class="flex items-stretch flex-1" :key="route.name" v-if="this.mainStore.currentUser">
          <component :is="Component"></component>
        </div>
        <div class="w-full h-full flex justify-center items-center" v-else>
          <svg class="animate-spin -ml-1 mr-3 h-12 w-12 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      </Transition>
    </router-view>
    <AppNavbar />
  </div>
</template>

<script>
import { useMainStore } from './stores/main';
import AppNavbar from './components/AppNavbar.vue';
import AppTitlebar from './components/AppTitlebar.vue';

export default {
  components: {
    AppTitlebar,
    AppNavbar
  },
  data(){
    return {
      mainStore: useMainStore()
    }
  },
  mounted(){    
    this.mainStore.getUser(this.mainStore.currentUserId);
  }
};
</script>

<style>
/* ----- SLIDE ----- */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
  
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}

/* ----- FADE ----- */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* ----- PAGE ----- */
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease;
  z-index: -1000;
  
}
.page-enter-from,
.page-leave-to {
  transform: translateY(-10%);
  opacity: 0;
}

</style>