<template>
  <div class="w-full h-full">

    <div class="bg-sky-600 pt-4 px-8 flex shadow-xl text-nowrap overflow-auto overscroll-auto hide-overscroll">
      <RouterLink to="/friends/online" class="py-2 px-4 text-center" active-class="border-b-4 border-slate-200 font-medium">
        En línea
      </RouterLink>
      <RouterLink to="/friends/current" class="py-2 px-4 text-center" active-class="border-b-4 border-slate-200 font-medium">
        Agregados
      </RouterLink>
      <RouterLink to="/friends/blocked" class="py-2 px-4 text-center" active-class="border-b-4 border-slate-200 font-medium">
        Bloqueados
      </RouterLink>
    </div>

    <AppWorkInProgress />
  </div>
</template>
  
<script>
import AppWorkInProgress from '../components/AppWorkInProgress.vue';
  // import { useMainStore } from '../stores/main';
  
  export default {
    data(){
      return {
        // mainStore: useMainStore()
      }
    },
  components: {
    AppWorkInProgress
  }
  };
</script>