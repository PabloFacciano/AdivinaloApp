<template>
  <div
    class="w-full bg-zinc-200 dark:bg-zinc-800 flex justify-between items-center p-4 sm:w-3/5 lg:w-1/2 mx-auto sm:rounded-lg overflow-hidden dark:border dark:border-zinc-700">

    <div v-text="this.message"></div>
    <div class="space-x-2">
      <button
        :disabled="!this.showBackButton"
        :class="{
          'bg-zinc-300 dark:bg-zinc-700  active:bg-zinc-400  hover:border-zinc-400 dark:hover:bg-zinc-600 dark:active:bg-zinc-500 cursor-pointer': this.showBackButton,
          'cursor-not-allowed': !this.showBackButton
        }"
        class="border border-zinc-300 dark:border-zinc-700 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none text-zinc-800 dark:text-white"
        @click="previousPage">Anterior</button>
      <button
        :disabled="!this.showNextButton"
        :class="{
          'bg-zinc-300 dark:bg-zinc-700 active:bg-zinc-400  hover:border-zinc-400 dark:hover:bg-zinc-600 dark:active:bg-zinc-500 cursor-pointer': this.showNextButton,
          'cursor-not-allowed': !this.showNextButton
        }"
        class="border border-zinc-300 dark:border-zinc-700 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none text-zinc-800 dark:text-white"
        @click="nextPage">Siguiente</button>
    </div>
  </div>
</template>

<script>
import Pagination from '../class/Pagination'
export default {
  props: {
    data: {
      type: Pagination,
      required: true
    }
  },
  emits: [
    'pageChanged',
    'beforePageChanged'
  ],
  data() {
    return {

    };
  },
  computed: {
    message() {
      if (this.data.size == 1) {
        return `Mostrando ${this.data.current} de ${this.data.max}.`;
      }

      return `Mostrando del ${this.data.current} al ${this.data.current + this.data.size}, de un total de ${this.data.max}.`;
    },
    showBackButton() {
      return this.data.showBackButton;
    },
    showNextButton() {
      return this.data.showNextButton;
    }
  },
  methods: {
    previousPage() {
      if (!this.showBackButton) return;
      this.$emit('beforePageChanged', this.data.current);
      if (this.data.previousPage()){
        this.$emit('pageChanged', this.data.current);
      }
    },
    nextPage() {
      if (!this.showNextButton) return;
      this.$emit('beforePageChanged', this.data.current);
      if (this.data.nextPage()){
        this.$emit('pageChanged', this.data.current);
      }
    }
  }
};
</script>