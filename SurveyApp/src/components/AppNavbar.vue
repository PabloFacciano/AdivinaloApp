<template>
  <div v-if="this.mainStore.currentUser" class="sticky bottom-0 w-full flex justify-evenly border-t bg-zinc-200 border-zinc-600 dark:bg-zinc-800 dark:border-zinc-700">
    <AppTabs 
      class="justify-center text-zinc-800 dark:text-zinc-100"
      borderClass="border-t-4 border-zinc-800 dark:border-zinc-200"
      :tabs="[
        {
          text: 'Inicio',
          to: '/feed',
          visible: true
        },
        {
          text: 'Amigos',
          to: '/friends',
          visible: true
        },
        {
          text: 'Mi Perfil',
          to: `/profile/${this.mainStore.currentUser.id}/`,
          visible: true
        }
      ]"
    /> 

  </div>
</template>

<script>
import AppTabs from './AppTabs.vue'
import { useMainStore } from '../stores/main';

export default {
  data(){
    return {
      mainStore: useMainStore()
    }
  },
  components: {
    AppTabs
  }
};
</script>