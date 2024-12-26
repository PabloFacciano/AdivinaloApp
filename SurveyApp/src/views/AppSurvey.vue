<template>
  <div class="w-full h-full space-y-4 py-8">

    <div v-if="this.loading" class="w-full h-full flex justify-center items-center">
      <svg class="animate-spin -ml-1 mr-3 h-12 w-12 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>

    <div class="space-y-4" v-else-if="!this.loading && this.questions.length > 0">
      <AppQuestion 
        v-for="feedItem in this.questions" 
        :key="feedItem.id"
        :data="feedItem"
        :options="questionOptions"
        @selectedOptionChanged="selectedOptionChanged"
      />
      <AppPagination :data="this.surveyPagination"/>
    </div>

    <div
    v-else
    class="w-full bg-zinc-800 p-8 text-center space-y-4 sm:w-3/5 lg:w-1/2 mx-auto sm:rounded-lg overflow-hidden shadow-lg dark:shadow-none dark:border dark:border-zinc-700">

      <div class=" text-2xl">Ya no quedan preguntas 😥</div>
      <div>Estamos trabajando en esto.</div>

    </div>

  </div>
</template>

<script>
import AppQuestion from '../components/AppQuestion.vue';
import AppPagination from '../components/AppPagination.vue';
import { useMainStore } from '../stores/main';
import Pagination from '../class/Pagination';
import User from '../class/User';

export default {
  props: [ 'id' ],
  data() {
    return {
      mainStore: useMainStore(),
      loading: true,
      rawQuestions: [],
      surveyPagination: new Pagination(1, 1, 10)
    }
  },
  watch: {
    id: {
      async handler(){
        try {
          this.loading = true;
          let [ fromUserCall, toUserCall, questionsCall ] = await Promise.allSettled([
            this.mainStore.getUser(this.mainStore.currentUser?.id), 
            this.mainStore.getUser(this.id),
            User.getQuestionsFromOtherUser(this.mainStore.currentUser?.id, this.id, this.surveyPagination.max)
          ]);
          if (questionsCall.status == 'fulfilled'){
            this.rawQuestions = questionsCall.value;
            this.surveyPagination.max = this.rawQuestions.length;
          } else {
            throw new Error('No questions found', { cause: questionsCall })
          }
        } catch (error) {
          console.error('AppSurvey.vue -- No user/s or questions found', error);
          this.rawQuestions = [];
          this.surveyPagination.max = 0;
        } finally {        
          this.loading = false;
        }
      },
      immediate: true
    }
  },
  computed: {
    toUser(){
      return this.mainStore.users[this.id];
    },
    askingForCurrentUser() {
      return this.toUser?.id == this.mainStore.currentUser?.id;
    },
    questionOptions(){
      return {
        readOnly: false,
        showHeader: true
      }
    },
    questions(){
      let questions = this.surveyPagination.getItemsByPagination(this.rawQuestions);
      return questions;
    }
  },
  methods: {
    selectedOptionChanged(){
      //let next = this.surveyPagination.nextPage();
    }
  },
  components: {
    AppQuestion,
    AppPagination
  }
};
</script>