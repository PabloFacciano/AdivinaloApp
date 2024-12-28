<template>
  <div class="w-full h-full space-y-4 py-8">

    <AppIcon
      icon="spinner"
      class="size-6"
      v-if="this.loading"
    />

    <div 
      class="space-y-4" 
      v-else-if="!this.loading && this.questions.length > 0"
    >   
      <div class="w-full sm:w-3/5 lg:w-1/2 mx-auto transition-colors duration-200">
        <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-zinc-800">
          <div class="h-2.5 rounded-full" :class="{
            'bg-sky-600': this.untilNextQuestion > 0 && this.questions[0].selectedOption != null || this.percentage >= 60,
            'bg-yellow-600': this.untilNextQuestion > 0 && this.questions[0].selectedOption == null && this.percentage > 30 && this.percentage < 60,
            'bg-red-600': this.untilNextQuestion > 0 && this.questions[0].selectedOption == null && this.percentage <= 30
          }" :style="{ width: this.percentage + '%' }"></div>
        </div>
      </div>


      <AppQuestion 
        v-for="feedItem in this.questions" 
        :key="feedItem.id"
        :data="feedItem"
        :options="questionOptions"
        @selectedOptionChanged="selectedOptionChanged"
      />   

      <AppPagination :data="this.surveyPagination" @pageChanged="pageChanged" />

      <AppMessage
        icon="userquestion"
        title="¿No te gustan las preguntas?"
        subtitle="O si ya las respondiste todas, las podés cambiar."
        primaryActionText="Cambiar Preguntas"
        @primaryActionClicked="this.loadMoreQuestions"
      />

    </div>

    <AppMessage
      v-else-if="this.askingForCurrentUser"
      icon="x"
      title="Ya no quedan preguntas 😥"
      subtitle="Vuelve a intentarlo más tarde, agregamos preguntas nuevas todas las semanas!"
    />

    <AppMessage
      v-else
      icon="x"
      title="Ya no quedan preguntas 😥"
      subtitle="Tu amigo/a debe responder más preguntas para que vos puedas advinar."
    />
    

  </div>
</template>

<script>
import AppMessage from '../components/AppMessage.vue';
import AppIcon from '../components/AppIcon.vue';
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
      surveyPagination: new Pagination(1, 1, 50),
      untilNextQuestion: 30000,
      interval: null,
      maxWaitTime: 30000,
      defaultWaitTime: 30000,
      answeredWaitTime: 3000
    }
  },
  watch: {
    id: {
      handler(){
        this.loadMoreQuestions();
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
    },
    percentage(){
      return ((this.untilNextQuestion * 100) / this.maxWaitTime);
    }
  },
  methods: {
    async loadMoreQuestions(){
      try {
          this.loading = true;
          let [ fromUserCall, toUserCall, questionsCall ] = await Promise.allSettled([
            this.mainStore.getUser(this.mainStore.currentUser?.id), 
            this.mainStore.getUser(this.id),
            User.getQuestionsFromOtherUser(this.mainStore.currentUser?.id, this.id, this.surveyPagination.max)
          ]);
          if (questionsCall.status == 'fulfilled'){
            this.untilNextQuestion = this.defaultWaitTime;
            this.rawQuestions = questionsCall.value;
            this.surveyPagination.current = 1;
            this.surveyPagination.max = this.rawQuestions.length;
            this.$gtag.event('startSurvey');
          } else {
            this.$gtag.event('noQuestionsFound');
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
    selectedOptionChanged(){
      this.maxWaitTime = this.answeredWaitTime;
      this.untilNextQuestion = this.answeredWaitTime;
    },
    pageChanged(){
      this.maxWaitTime = this.defaultWaitTime;
      this.untilNextQuestion = this.defaultWaitTime;
    },
    setInterval(){
      const timeInterval = 30;
      this.interval = setInterval(() => {
        if (this.untilNextQuestion >= 0){
          this.untilNextQuestion -= timeInterval;
          return;
        } 
        this.surveyPagination.nextPage(); 
        this.pageChanged();
      }, timeInterval);
    }
  },
  mounted(){
    this.setInterval();
  },
  components: {
    AppQuestion,
    AppPagination,
    AppIcon,
    AppMessage
  }
};
</script>