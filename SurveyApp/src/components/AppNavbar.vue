<template>
  <div v-if="this.mainStore.currentUser" class="sticky bottom-0 w-full flex justify-evenly p-1 border-t bg-gray-200 border-gray-600 dark:bg-gray-800 dark:border-gray-700">
   
    <AppTabs 
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
          to: `/profile/${this.mainStore.currentUser.id}`,
          visible: true
        }
      ]"
    /> 

  </div>
</template>

<script>
import { useMainStore } from '../stores/main';

export default {
  data(){
    return {
      mainStore: useMainStore()
    }
  }
};
</script>