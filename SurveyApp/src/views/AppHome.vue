<template>
  <div class="w-full h-full">
    <AppTabs 
      class="px-4 bg-sky-600 text-zinc-100"
      borderClass="border-b-4 border-zinc-100 dark:border-zinc-100 "
      :tabs="[
        {
          text: 'Inicio',
          to: '/',
          visible: true
        }
      ]"
    />
    <RouterView />
  </div>
</template>

<script>
import AppTabs from '../components/AppTabs.vue';

export default {
  components: {
    AppTabs
  }
};
</script>