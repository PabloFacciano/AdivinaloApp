<template>
  <div class="bg-sky-600 text-zinc-100 pt-4 px-8 flex text-nowrap overflow-auto overscroll-auto hide-overscroll">
    <RouterLink 
      v-for="tab in this.visibleTabs" 
      :key="tab.text"
      :to="tab.to" 
      v-text="tab.text" 
      class="py-2 px-4 text-center"
      active-class="border-b-4 border-slate-200 font-medium"
    />
  </div>
</template>

<script>
import { useMainStore } from '../stores/main.js';
export default {
  props: ['tabs'],
  data() {
    return {
      mainStore: useMainStore()
    };
  },
  props: [

  ],
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