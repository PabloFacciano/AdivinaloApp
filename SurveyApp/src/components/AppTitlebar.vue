<template>
  <div v-if="this.mainStore.currentUser">
    <div class="bg-sky-600 text-zinc-100 p-1 flex justify-between ">

      <div class="flex items-center">
        <!-- 🍔 Menu -->
        <button @click="this.appSidebarOpen = true;" type="button"
          class="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-sky-500 rounded-lg hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-200 dark:text-zinc-400 dark:hover:bg-sky-700 dark:focus:ring-sky-600">
          <AppIcon 
            fill="#ffffff"
            icon="mainmenu"
            class="size-6"
          />
        </button>
        <!-- Page title -->
        <div class="ms-4">
          {{ this.$route.meta.title ?? '' }}
        </div>
      </div>

      <div class="space-x-2 px-4">
        <!-- Dark mode button -->
        <button @click="toggleDark" type="button"
          class="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-sky-500 rounded-lg focus:outline-none focus:ring-2 dark:text-zinc-400 hover:bg-sky-700 focus:ring-sky-600">
          <AppIcon 
            fill="#ffffff"
            icon="sun"
            class="size-6"
            v-if="!this.darkMode"
          />
          <AppIcon 
            fill="#ffffff"
            icon="moon"
            class="size-6"
            v-if="this.darkMode"
          />
        </button>
        <!-- Side menu -->
        <button @click="signOut" type="button"
        class="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-sky-500 rounded-lg focus:outline-none focus:ring-2 dark:text-zinc-400 hover:bg-sky-700 focus:ring-sky-600">
          <AppIcon 
            fill="#ffffff"
            icon="exit"
            class="size-6"
          />
        </button>
      </div>

    </div>
    <Transition name="fade">
      <div v-show="appSidebarOpen" class="backdrop-blur-sm bg-zinc-900/30 fixed h-dvh w-full left-0 top-0 p-1"
        @click="this.appSidebarOpen = false;">

      </div>
    </Transition>
    <Transition name="slide">
      <div v-show="appSidebarOpen"
        class="bg-sky-600 fixed z-40 h-dvh w-4/5 left-0 top-0 sm:w-1/2 md:w-1/3 lg:w-1/4 flex flex-col"
        @click="this.appSidebarOpen = false;">
        <button class="p-3 hover:bg-sky-900">
          <AppIcon 
            fill="#ffffff"
            icon="goleft"
            class="size-6"
          />
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
import AppIcon from './AppIcon.vue';
import supabase from '../db/supabase';
import { useMainStore } from '../stores/main';

export default {
  data() {
    return {
      mainStore: useMainStore(),
      appSidebarOpen: false,
      darkMode: true
    }
  },
  components: {
    AppIcon
  },
  methods: {
    toggleDark(){
      this.darkMode = !this.darkMode;
      document.documentElement.classList.toggle('dark');
    },
    async signOut(){
      if (!confirm("¿Cerrar sesión?")) return;
      try {
        await supabase.auth.signOut();
      } catch (error) {
        alert(error)
      }
    }
  }
};
</script>
