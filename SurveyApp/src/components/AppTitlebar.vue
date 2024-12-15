<template>
  <div v-if="this.mainStore.currentUser">
    <div class="bg-sky-600 p-1 flex justify-between">
      
      <div class="flex items-center">
        <!-- 🍔 Menu -->
        <button @click="this.appSidebarOpen = true;" type="button" class="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-sky-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-sky-700 dark:focus:ring-sky-600">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0,0,256,256"><g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(10.66667,10.66667)"><path d="M2,5v2h20v-2zM2,11v2h20v-2zM2,17v2h20v-2z"></path></g></g></svg>
        </button>
        <!-- Page title -->
        <div class="ms-4">
          {{ this.$route.meta.title ?? '' }}
        </div>
      </div>

      <div>
        <!-- Side menu -->
        <button type="button" class="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-sky-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-sky-700 dark:focus:ring-sky-600">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0,0,256,256"><g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(10.66667,10.66667)"><path d="M12,3c-1.10457,0 -2,0.89543 -2,2c0,1.10457 0.89543,2 2,2c1.10457,0 2,-0.89543 2,-2c0,-1.10457 -0.89543,-2 -2,-2zM12,10c-1.10457,0 -2,0.89543 -2,2c0,1.10457 0.89543,2 2,2c1.10457,0 2,-0.89543 2,-2c0,-1.10457 -0.89543,-2 -2,-2zM12,17c-1.10457,0 -2,0.89543 -2,2c0,1.10457 0.89543,2 2,2c1.10457,0 2,-0.89543 2,-2c0,-1.10457 -0.89543,-2 -2,-2z"></path></g></g></svg>
        </button>
      </div>

    </div>
    <Transition name="fade">
      <div v-show="appSidebarOpen" class="backdrop-blur-sm bg-slate-900/30 fixed h-dvh w-full left-0 top-0 p-1" @click="this.appSidebarOpen = false;">
        
      </div>
    </Transition>
    <Transition name="slide">
      <div v-show="appSidebarOpen" class="bg-sky-600 shadow-xl fixed z-40 h-dvh w-4/5 left-0 top-0 sm:w-1/2 md:w-1/3 lg:w-1/4 flex flex-col" @click="this.appSidebarOpen = false;">
        
        <button class="p-3 hover:bg-sky-900">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0,0,256,256"><g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(10.66667,10.66667)"><path d="M10,4.92969l-7.07031,7.07031l7.07031,7.07031l1.5,-1.5l-4.57031,-4.57031h14.07031v-2h-14.07031l4.57031,-4.57031z"></path></g></g></svg>
        </button>

        <RouterLink to="/" class="py-2 px-4 hover:bg-sky-900 text-start">
          Inicio
        </RouterLink>

        <RouterLink to="/friends/current" class="py-2 px-4 hover:bg-sky-900 text-start">
          Amigos
        </RouterLink>

        <RouterLink :to="`/profile/${this.mainStore.currentUser.id}`" class="py-2 px-4 hover:bg-sky-900 text-start">
          Mi Perfil
        </RouterLink>

      </div>
    </Transition>
  </div>
</template>
  
<script>
  import { useMainStore } from '../stores/main';
  
  export default {
    data(){
      return {
        mainStore: useMainStore(),
        appSidebarOpen: false
      }
    }
  };
</script>
