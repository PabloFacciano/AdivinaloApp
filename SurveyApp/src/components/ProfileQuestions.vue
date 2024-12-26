<template>
  <div class="w-full overflow-auto" v-if="this.currentUser">

    <div class="py-6 sm:mx-3 space-y-3" v-if="this.questions.length > 0">

      <AppQuestion v-for="feedItem in this.questions"
        :key="feedItem.fromUserId + '-' + feedItem.toUserId + '-' + feedItem.id" :data="feedItem"
        :options="questionOptions" />

      <AppPagination :data="this.currentUser.questionsPagination" />

    </div>

    <div v-else
      class="w-full bg-zinc-800 p-8 my-6 sm:w-3/5 lg:w-1/2 mx-auto sm:rounded-lg overflow-hidden shadow-lg dark:shadow-none dark:border dark:border-zinc-700">
      <div>

        <div v-if="this.isCurrentLoggedinUser" class="space-y-4 flex flex-col items-center">
          <div class="text-2xl">Aún no respondiste preguntas...</div>
          <div>¿Qué esperas?</div>
        </div>
        <div v-else  class="space-y-4 flex flex-col items-center">
          <div class="text-2xl">Aún no respondió ninguna pregunta...</div>
          <div>Vuelve a revisarlo más tarde.</div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import { useMainStore } from '../stores/main';
import AppPagination from './AppPagination.vue';
import AppQuestion from './AppQuestion.vue';

export default {
  props: ['id'],
  data() {
    return {
      mainStore: useMainStore()
    };
  },
  components: {
    AppQuestion,
    AppPagination
  },
  computed: {
    questions() {
      if (!this.currentUser) return [];
      return this.currentUser.questionsPagination.getItemsByPagination(this.currentUser.questions);
    },
    currentUser() {
      return this.mainStore.users[this.id];
    },
    isCurrentLoggedinUser() {
      return this.id == this.mainStore.currentUser?.id;
    },
    questionOptions() {
      return {
        showHeader: !this.isCurrentLoggedinUser,
        readOnly: !this.isCurrentLoggedinUser
      };
    }
  }
};
</script>