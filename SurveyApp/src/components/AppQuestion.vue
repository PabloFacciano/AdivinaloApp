<template>
  <div
    class="w-full sm:w-3/5 lg:w-1/2 mx-auto sm:rounded-lg overflow-hidden shadow-lg dark:shadow-none dark:border dark:border-zinc-700">

    <div v-if="this.loadingUser" class="p-8 bg-zinc-800">
      <div class=" text-2xl">Cargando usuario...</div>
      <div>Espera un momento por favor.</div>
    </div>

    <div v-else>
      <!-- Header -->
      <div v-if="this.options.showHeader"
        class="relative flex items-center justify-between p-4 border-b border-gray-300 dark:border-zinc-700 bg-zinc-700">
        <div class="flex items-center">
          <div class="w-10 h-10 rounded-full bg-sky-600 flex items-center justify-center text-white font-bold mr-3"
            v-text="this.questionUser?.initials ?? '??'"></div>
          <span class="font-semibold text-gray-800 dark:text-white" v-text="this.questionUser.name"></span>
        </div>
      </div>

      <!-- Body -->
      <p class="px-4 bg-zinc-800">
      <div class="text-gray-800 dark:text-white text-xl text-center py-8 select-text" v-text="this.data.question"></div>
      <div class="pb-4">

        <AppQuestionOption 
          v-for="option in data.options" 
          :key="option.id" 
          :text="option.value"
          :readOnly="isOptionReadOnly(option)" 
          :selected="isOptionSelected(option)"
          :isValid="isOptionValid(option)"
          :isNotValid="isNotOptionValid(option)"
          :showSpinner="isOptionSelected(option) && (this.data?.db?.saving ?? false)"
          @selectedOption="selectOption(option.id)"></AppQuestionOption>

        <AppQuestionOption 
          :text="'Prefiero no responder'"
          :readOnly="isOptionReadOnly({ id: 0 })" 
          :selected="isOptionSelected({ id: 0 })"
          :isValid="isOptionValid({ id: 0 })"
          :isNotValid="isNotOptionValid({ id: 0 })"
          :showSpinner="isOptionSelected({ id: 0 }) && (this.data?.db?.saving ?? false)"
          @selectedOption="selectOption(0)"></AppQuestionOption>

      </div>
      </p>
    </div>

  </div>
</template>

<script>
import Question from '../class/Question.js';
import AppQuestionOption from './AppQuestionOption.vue';
import * as db from '../db/supabase.js'
import { useMainStore } from '../stores/main';

export default {
  emits: ['selectedOptionChanged'],
  props: {
    data: {
      type: Question,
      required: true
    },
    options: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      mainStore: useMainStore()
    };
  },
  watch: {
    data: {
      handler() {
        this.mainStore.getUser(this.data.toUserId);
      },
      immediate: true
    }
  },
  computed: {
    questionUser() {
      return this.mainStore.users[this.data.toUserId];
    },
    askingForCurrentUser() {
      return this.questionUser?.id == this.mainStore.currentUser?.id;
    },
    loadingUser() {
      return this.questionUser == null;
    },
    isLoading() {
      return this.loadingUser || this.data?.db?.saving;
    },
  },
  methods: {
    isOptionValid(option){
      return this.data.validOption != null && this.data.validOption == option.id && this.data.selectedOption != null && !(this.data?.db?.saving ?? false);
    },
    isNotOptionValid(option){
      return this.data.validOption != null && this.data.validOption != option.id && this.isOptionSelected(option);
    },
    isOptionSelected(option) {
      return option.id == this.data.selectedOption;
    },
    isOptionReadOnly(option) {
      return this.options.readOnly || this.isLoading || this.data?.readOnly || this.isOptionSelected(option);
    },
    async selectOption(optionId) {
      if (this.options.readOnly) return;
      if (await this.data.saveAnswer(this.data.fromUserId, this.data.toUserId, optionId)) {
        this.$emit('selectedOptionChanged', optionId);
      }
    },
    closeMenu() {
      this.menuOpen = false; // Close the menu after selection
    }
  },
  components: {
    AppQuestionOption
  }
};
</script>

<style scoped>
/* Add any scoped styles here */
</style>