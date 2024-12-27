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
      <AppQuestion 
        v-for="feedItem in this.questions" 
        :key="feedItem.id"
        :data="feedItem"
        :options="questionOptions"
        @selectedOptionChanged="selectedOptionChanged"
      />   
      <AppPagination :data="this.surveyPagination"/>
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
      
    },
  },
  components: {
    AppQuestion,
    AppPagination,
    AppIcon,
    AppMessage
  }
};
</script>