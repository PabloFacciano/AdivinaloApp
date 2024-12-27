<template>
  <div
    class="bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100 w-full my-4 sm:w-3/5 lg:w-1/2 mx-auto sm:rounded-lg overflow-hidden dark:border dark:border-zinc-700">

    <div class="p-8 space-y-4">
      <AppIcon class="size-12" v-if="this.icon" :icon="this.icon" fill="#666"/>
      <div v-if="this.title" class="text-2xl" v-text="this.title"></div>
      <div v-if="this.subtitle" v-text="this.subtitle"></div>
      <div class="flex space-x-4">
        <button type="button"
        v-if="this.primaryActionText" 
        class="rounded-lg text-white bg-sky-700 hover:bg-sky-800 font-medium text-sm px-5 py-2.5 me-2 dark:bg-sky-600 dark:hover:bg-sky-700 focus:outline-none dark:focus:ring-sky-800"
        v-text="this.primaryActionText"
        @click="$emit('primaryActionClicked')"></button>
        <button type="button"
          v-if="this.secondaryActionText" 
          class="rounded-lg text-white bg-sky-700 hover:bg-sky-800 font-medium text-sm px-5 py-2.5 me-2 dark:bg-sky-600 dark:hover:bg-sky-700 focus:outline-none dark:focus:ring-sky-800"
          v-text="this.primaryActionText"
        @click="$emit('secondaryActionClicked')"></button>
      </div>
    </div>

  </div>
</template>

<script>
import AppIcon from '../components2/AppIcon.vue';
export default {
  emits: [ 'primaryActionClicked', 'secondaryActionClicked' ],
  props: {
    title: {
      type: String,
      required: false
    },
    subtitle: {
      type: String,
      required: false
    },
    primaryActionText: {
      type: String,
      required: false
    },
    secondaryActionText: {
      type: String,
      required: false
    },
    icon: {
      type: String,
      required: false
    },
  },
  data() {
    return {

    }
  },
  methods: {

  },
  components: {
    AppIcon
  }
};
</script>