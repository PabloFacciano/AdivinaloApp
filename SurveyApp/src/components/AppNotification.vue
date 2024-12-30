<template>
  <div class="w-full flex flex-col sticky">

    <div 
      v-for="(notification, index) in this.notificationStore.notifications"
      :key="index"
      class="bg-sky-700 text-white shadow-lg flex items-center justify-around p-2"
    >
      <div class="" v-html="notification.text"></div>
      <button
        @click="this.notificationStore.removeByIndex(index)" 
        type="button"
        class="flex items-center justify-center p-2 w-10 h-10 rounded-lg focus:outline-none focus:ring-2 dark:text-zinc-400 hover:bg-sky-700 focus:ring-sky-600">
        <AppIcon 
          fill="#ffffff"
          icon="x"
          class="size-6"
        />
      </button>
    </div>

  </div>
</template>

<script>
import AppIcon from './AppIcon.vue';
import { useNotificationStore } from '../stores/notification.js';
export default {
  data() {
    return {
      notificationStore: useNotificationStore()
    };
  },
  props: [

  ],
  emits: [

  ],
  methods: {

  },
  computed: {

  },
  components: {
    AppIcon
  }
};
</script>