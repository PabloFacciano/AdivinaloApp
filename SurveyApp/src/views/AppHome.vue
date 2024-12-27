<template>
  <div class="w-full h-full">
    <AppTabs 
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