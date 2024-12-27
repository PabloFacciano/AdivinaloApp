<template>
  <div class="w-full h-full">

    <div class="bg-sky-600 text-zinc-100 pt-4 ps-8 flex text-nowrap">
      <RouterLink to="/" class="py-2 px-4 text-center" active-class="border-b-4 border-slate-200 font-medium">
        Inicio
      </RouterLink>
    </div>

    <RouterView />

  </div>
</template>

<script>
// import { useMainStore } from '../stores/main';

export default {
  data() {
    return {
      // mainStore: useMainStore()
    }
  }
};
</script>