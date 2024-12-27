<template>
  <div class="w-full  flex text-nowrap overscroll-auto transition-colors duration-200">
    <RouterLink 
      v-for="tab in this.visibleTabs" 
      :key="tab.text"
      :to="tab.to" 
      v-text="tab.text" 
      class="py-3 px-4 text-center transition-colors duration-200"
      :activeClass="this.borderClass + ' font-medium'"
      :exactActiveClass="this.borderClass + ' font-medium'"
    />
  </div>
</template>

<script>
import { useMainStore } from '../stores/main.js';
export default {
  props: ['tabs', 'borderClass'],
  data() {
    return {
      mainStore: useMainStore()
    };
  },
  emits: [

  ],
  methods: {

  },
  computed: {
    visibleTabs() {
      return this.tabs.filter(tab => tab.visible);
    }
  }
};
</script>