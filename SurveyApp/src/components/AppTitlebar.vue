<template>
  <div v-if="this.mainStore.currentUser">
    <div class="bg-sky-600 text-zinc-100 p-1 flex justify-between">

      <div class="flex items-center">
        <!-- 🍔 Menu -->
        <button @click="this.appSidebarOpen = true;" type="button"
          class="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-sky-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-sky-700 dark:focus:ring-sky-600">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px"
            height="24px" viewBox="0,0,256,256">
            <g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt"
              stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0"
              font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal">
              <g transform="scale(10.66667,10.66667)">
                <path d="M2,5v2h20v-2zM2,11v2h20v-2zM2,17v2h20v-2z"></path>
              </g>
            </g>
          </svg>
        </button>
        <!-- Page title -->
        <div class="ms-4">
          {{ this.$route.meta.title ?? '' }}
        </div>
      </div>

      <div class="space-x-2 px-4">
        <!-- Dark mode button -->
        <button @click="toggleDark" type="button"
          class="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-sky-500 rounded-lg focus:outline-none focus:ring-2 dark:text-gray-400 hover:bg-sky-700 focus:ring-sky-600">
          <!-- LIGHT -->
          <svg v-if="!this.darkMode" class="size-6" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0,0,256,256">
            <g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt"
              stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0"
              font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal">
              <g transform="scale(5.12,5.12)">
                <path
                  d="M24.90625,3.96875c-0.04297,0.00781 -0.08594,0.01953 -0.125,0.03125c-0.46484,0.10547 -0.79297,0.52344 -0.78125,1v6c-0.00391,0.35938 0.18359,0.69531 0.49609,0.87891c0.3125,0.17969 0.69531,0.17969 1.00781,0c0.3125,-0.18359 0.5,-0.51953 0.49609,-0.87891v-6c0.01172,-0.28906 -0.10547,-0.56641 -0.3125,-0.76172c-0.21094,-0.19922 -0.49609,-0.29687 -0.78125,-0.26953zM10.65625,9.84375c-0.375,0.06641 -0.67578,0.33984 -0.78125,0.70313c-0.10547,0.36719 0.00391,0.75781 0.28125,1.01563l4.25,4.25c0.24219,0.29688 0.62891,0.43359 1.00391,0.34766c0.37109,-0.08594 0.66406,-0.37891 0.75,-0.75c0.08594,-0.375 -0.05078,-0.76172 -0.34766,-1.00391l-4.25,-4.25c-0.20703,-0.22266 -0.50781,-0.33594 -0.8125,-0.3125c-0.03125,0 -0.0625,0 -0.09375,0zM39.03125,9.84375c-0.22656,0.03125 -0.4375,0.14453 -0.59375,0.3125l-4.25,4.25c-0.29687,0.24219 -0.43359,0.62891 -0.34766,1.00391c0.08594,0.37109 0.37891,0.66406 0.75,0.75c0.375,0.08594 0.76172,-0.05078 1.00391,-0.34766l4.25,-4.25c0.3125,-0.29687 0.40234,-0.76172 0.21875,-1.15234c-0.1875,-0.39453 -0.60156,-0.62109 -1.03125,-0.56641zM24.90625,15c-0.03125,0.00781 -0.0625,0.01953 -0.09375,0.03125c-0.0625,0.00391 -0.125,0.01563 -0.1875,0.03125c-0.01172,0.01172 -0.01953,0.01953 -0.03125,0.03125c-5.30469,0.22656 -9.59375,4.54688 -9.59375,9.90625c0,5.50391 4.49609,10 10,10c5.50391,0 10,-4.49609 10,-10c0,-5.33984 -4.25391,-9.64453 -9.53125,-9.90625c-0.03516,0 -0.05859,-0.03125 -0.09375,-0.03125c-0.10156,-0.03906 -0.20703,-0.05859 -0.3125,-0.0625c-0.01953,0 -0.04297,0 -0.0625,0c-0.03125,0 -0.0625,0 -0.09375,0zM24.9375,17c0.01953,0 0.04297,0 0.0625,0c0.03125,0 0.0625,0 0.09375,0c4.375,0.05078 7.90625,3.61328 7.90625,8c0,4.42188 -3.57812,8 -8,8c-4.41797,0 -8,-3.57812 -8,-8c0,-4.39844 3.54688,-7.96484 7.9375,-8zM4.71875,24c-0.55078,0.07813 -0.9375,0.58984 -0.85937,1.14063c0.07813,0.55078 0.58984,0.9375 1.14063,0.85938h6c0.35938,0.00391 0.69531,-0.18359 0.87891,-0.49609c0.17969,-0.3125 0.17969,-0.69531 0,-1.00781c-0.18359,-0.3125 -0.51953,-0.5 -0.87891,-0.49609h-6c-0.03125,0 -0.0625,0 -0.09375,0c-0.03125,0 -0.0625,0 -0.09375,0c-0.03125,0 -0.0625,0 -0.09375,0zM38.71875,24c-0.55078,0.07813 -0.9375,0.58984 -0.85937,1.14063c0.07813,0.55078 0.58984,0.9375 1.14063,0.85938h6c0.35938,0.00391 0.69531,-0.18359 0.87891,-0.49609c0.17969,-0.3125 0.17969,-0.69531 0,-1.00781c-0.18359,-0.3125 -0.51953,-0.5 -0.87891,-0.49609h-6c-0.03125,0 -0.0625,0 -0.09375,0c-0.03125,0 -0.0625,0 -0.09375,0c-0.03125,0 -0.0625,0 -0.09375,0zM15,33.875c-0.22656,0.03125 -0.4375,0.14453 -0.59375,0.3125l-4.25,4.25c-0.29687,0.24219 -0.43359,0.62891 -0.34766,1.00391c0.08594,0.37109 0.37891,0.66406 0.75,0.75c0.375,0.08594 0.76172,-0.05078 1.00391,-0.34766l4.25,-4.25c0.29688,-0.28516 0.38672,-0.72656 0.22656,-1.10547c-0.15625,-0.37891 -0.53516,-0.62109 -0.94531,-0.61328c-0.03125,0 -0.0625,0 -0.09375,0zM34.6875,33.875c-0.375,0.06641 -0.67578,0.33984 -0.78125,0.70313c-0.10547,0.36719 0.00391,0.75781 0.28125,1.01563l4.25,4.25c0.24219,0.29688 0.62891,0.43359 1.00391,0.34766c0.37109,-0.08594 0.66406,-0.37891 0.75,-0.75c0.08594,-0.375 -0.05078,-0.76172 -0.34766,-1.00391l-4.25,-4.25c-0.1875,-0.19922 -0.44531,-0.30859 -0.71875,-0.3125c-0.03125,0 -0.0625,0 -0.09375,0c-0.03125,0 -0.0625,0 -0.09375,0zM24.90625,37.96875c-0.04297,0.00781 -0.08594,0.01953 -0.125,0.03125c-0.46484,0.10547 -0.79297,0.52344 -0.78125,1v6c-0.00391,0.35938 0.18359,0.69531 0.49609,0.87891c0.3125,0.17969 0.69531,0.17969 1.00781,0c0.3125,-0.18359 0.5,-0.51953 0.49609,-0.87891v-6c0.01172,-0.28906 -0.10547,-0.56641 -0.3125,-0.76172c-0.21094,-0.19922 -0.49609,-0.29687 -0.78125,-0.26953z">
                </path>
              </g>
            </g>
          </svg>
          <!-- DARK -->
          <svg v-if="this.darkMode" class="size-6" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"viewBox="0,0,256,256">
            <g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt"
              stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0"
              font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal">
              <g transform="scale(8.53333,8.53333)">
                <path
                  d="M25.98,20.3c0.36,-0.71 -0.21,-1.44 -0.91,-1.44c-0.15,0 -0.3,0.03 -0.46,0.1c-1.31,0.63 -2.79,0.99 -4.34,0.99c-5.55,0 -10.05,-4.5 -10.05,-10.03c0,-1.66 0.4,-3.22 1.11,-4.59c0.37,-0.72 -0.17,-1.5 -0.87,-1.5c-0.13,0 -0.28,0.03 -0.42,0.1c-4.34,2.01 -7.26,6.48 -7.03,11.53c0.3,6.49 5.67,11.54 12.11,11.54c0.19,0 0.38,0 0.56,-0.01c4.55,-0.21 8.4,-2.89 10.3,-6.69z">
                </path>
              </g>
            </g>
          </svg>
        </button>
        <!-- Side menu -->
        <button @click="signOut" type="button"
        class="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-sky-500 rounded-lg focus:outline-none focus:ring-2 dark:text-gray-400 hover:bg-sky-700 focus:ring-sky-600">
          <svg class="size-6" version="1.1" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink" width="128px" height="128px" viewBox="0,0,256,256">
            <g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt"
              stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0"
              font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal">
              <g transform="scale(2,2)">
                <path
                  d="M4,1c-1.7,0 -3,1.3 -3,3c0,1.7 1.3,3 3,3h120c1.7,0 3,-1.3 3,-3c0,-1.7 -1.3,-3 -3,-3zM74,31c-1.7,0 -3,1.3 -3,3v87h-67c-1.7,0 -3,1.3 -3,3c0,1.7 1.3,3 3,3h120c1.7,0 3,-1.3 3,-3v-90c0,-1.7 -1.3,-3 -3,-3zM34.96289,60.80078c-0.7625,0 -1.5125,0.29844 -2.0625,0.89844c-1.2,1.2 -1.2,3.10117 0,4.20117l9.90039,9.90039h-38.80078c-1.7,0 -3,1.3 -3,3c0,1.7 1.3,3.19922 3,3.19922h38.80078l-9.90039,9.90039c-1.2,1.2 -1.2,3.09922 0,4.19922c0.6,0.6 1.39961,0.90039 2.09961,0.90039c0.7,0 1.49961,-0.30039 2.09961,-0.90039l15,-15c0.1,-0.1 0.30039,-0.3 0.40039,-0.5c0,-0.1 0.09961,-0.09922 0.09961,-0.19922c0.1,-0.1 0.10117,-0.20078 0.20117,-0.30078c0,-0.1 0.09961,-0.19883 0.09961,-0.29883c0,-0.1 0.09961,-0.20078 0.09961,-0.30078c0.1,-0.4 0.1,-0.79922 0,-1.19922c0,-0.1 -0.09961,-0.20078 -0.09961,-0.30078c0,-0.1 -0.09961,-0.20078 -0.09961,-0.30078c0,-0.1 -0.10117,-0.19883 -0.20117,-0.29883c0,-0.1 -0.09961,-0.20117 -0.09961,-0.20117c-0.1,-0.2 -0.20039,-0.3 -0.40039,-0.5l-15,-15c-0.6,-0.6 -1.37422,-0.89844 -2.13672,-0.89844zM89,74c1.7,0 3,1.3 3,3v4c0,1.7 -1.3,3 -3,3c-1.7,0 -3,-1.3 -3,-3v-4c0,-1.7 1.3,-3 3,-3z">
                </path>
              </g>
            </g>
          </svg>
        </button>
      </div>

    </div>
    <Transition name="fade">
      <div v-show="appSidebarOpen" class="backdrop-blur-sm bg-slate-900/30 fixed h-dvh w-full left-0 top-0 p-1"
        @click="this.appSidebarOpen = false;">

      </div>
    </Transition>
    <Transition name="slide">
      <div v-show="appSidebarOpen"
        class="bg-sky-600 fixed z-40 h-dvh w-4/5 left-0 top-0 sm:w-1/2 md:w-1/3 lg:w-1/4 flex flex-col"
        @click="this.appSidebarOpen = false;">

        <button class="p-3 hover:bg-sky-900">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px"
            height="24px" viewBox="0,0,256,256">
            <g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt"
              stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0"
              font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal">
              <g transform="scale(10.66667,10.66667)">
                <path
                  d="M10,4.92969l-7.07031,7.07031l7.07031,7.07031l1.5,-1.5l-4.57031,-4.57031h14.07031v-2h-14.07031l4.57031,-4.57031z">
                </path>
              </g>
            </g>
          </svg>
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
import supabase from '../db/supabase';
import { useMainStore } from '../stores/main';

export default {
  data() {
    return {
      mainStore: useMainStore(),
      appSidebarOpen: false,
      darkMode: false
    }
  },
  methods: {
    toggleDark(){
      this.darkMode = !this.darkMode;
      console.log('darkMode', this.darkMode);
      document.documentElement.classList.toggle('dark');
    },
    async signOut(){
      try {
        await supabase.auth.signOut();
      } catch (error) {
        alert(error)
      }
    }
  }
};
</script>
