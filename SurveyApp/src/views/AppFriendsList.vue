<template>
  <div>

    <AppMessage v-if="!this.loading && (!this.userList || this.userList.length == 0)"
      title="No hay usuarios que mostrar" subtitle="Prueba agregar más amigos y vuelve a intentarlo más tarde." />

    <div
      v-else
      class="w-full bg-zinc-50 dark:bg-zinc-800 my-4 sm:w-3/5 lg:w-1/2 mx-auto sm:rounded-lg overflow-hidden dark:border dark:border-zinc-700">
      <ul role="list" class="divide-y divide-zinc-100 dark:divide-zinc-700 px-4">

        <li class="flex justify-between gap-x-6 py-3 animate-pulse" v-for="i in 5" v-if="this.loading">
          <div class="flex min-w-0 gap-x-4">
            <div class="size-8 flex-none rounded-full bg-zinc-50 dark:bg-zinc-900"></div>
            <div class="min-w-0 flex flex-col items-start justify-center space-y-2">
              <p class="text-sm/6 bg-zinc-900 w-24 h-4 rounded"></p>
              <p class="truncate text-xs/5 bg-zinc-900 w-48 h-4 rounded"></p>
            </div>
          </div>
          <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end justify-center space-y-2">
            <p class="text-sm/6 bg-zinc-900 w-12 h-4 rounded"></p>
            <p class="truncate text-xs/5 bg-zinc-900 w-20 h-4 rounded"></p>
          </div>
        </li>

        <li v-for="user in this.userList" :key="user.id">
          <RouterLink :to="`/profile/${user.id}`" class="flex justify-between gap-x-6 py-3">
            <div class="flex min-w-0 gap-x-4">
              <div class="relative size-8 rounded-full bg-zinc-300 dark:bg-sky-600 flex items-center justify-center">
                <div v-if="user.online" class="absolute -bottom-0.5 -right-0.5 flex items-center justify-center">
                  <div class="p-2 absolute inline-flex h-full w-full rounded-full bg-zinc-50 dark:bg-zinc-800"></div>
                  <div class="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></div>
                </div>
                <div class="flex items-center justify-center text-xs" v-text="user.initials"></div>
              </div>
              <div class="min-w-0 flex items-center">
                <p class="text-sm/6 font-semibold text-zinc-900 dark:text-white" v-text="user.name"></p>
              </div>
            </div>
            <div class="hidden shrink-0 sm:flex sm:items-center">
              <p class="text-xs/5 text-zinc-500">Ver perfil</p>
            </div>
          </RouterLink>
        </li>

      </ul>
    </div>


  </div>
</template>

<script>
import AppMessage from '../components/AppMessage.vue';

export default {
  props: ['userList', 'loading'],
  components: {
    AppMessage
  },
  data() {
    return {

    }
  },
  methods: {

  }
};
</script>