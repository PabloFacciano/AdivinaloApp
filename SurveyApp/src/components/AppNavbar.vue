<template>
  <div v-if="this.mainStore.currentUser" class="sticky bottom-0 w-full flex justify-evenly p-1 border-t bg-gray-200 border-gray-600 dark:bg-gray-800 dark:border-gray-700">
   
    
    <RouterLink to="/feed" class="py-2 px-4  hover:bg-sky-900 text-start" active-class="bg-sky-800">
      Inicio
    </RouterLink>

    <RouterLink :to="`/friends`" :class="{ 'bg-sky-800': $route.name === 'friends' }" class="py-2 px-4 hover:bg-sky-900 text-start">
      Amigos
    </RouterLink>

    <RouterLink :to="`/profile/${this.mainStore.currentUser.id}`" class="py-2 px-4 hover:bg-sky-900 text-start" active-class="bg-sky-800">
      Mi Perfil
    </RouterLink>
    

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