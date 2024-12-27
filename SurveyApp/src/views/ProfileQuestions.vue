<template>
  <div class="w-full overflow-auto" v-if="this.currentUser">

    <div class="py-6 sm:mx-3 space-y-3" v-if="this.questions.length > 0">
      <AppQuestion 
        v-for="feedItem in this.questions"
        :key="feedItem.fromUserId + '-' + feedItem.toUserId + '-' + feedItem.id" 
        :data="feedItem"
        :options="questionOptions" 
      />
      <AppPagination 
        :data="this.currentUser.questionsPagination" 
      />
    </div>


    <AppMessage 
      v-else-if="this.isCurrentLoggedinUser" 
      title="No hay nada que mostrar"
      subtitle="Responde preguntas para completar tu perfil."
      icon="x"
    />
    <AppMessage 
      v-else 
      title="Aún no respondió ninguna pregunta..." 
      subtitle="Vuelve a revisar más tarde."
      icon="x" 
    />


  </div>
</template>

<script>
import { useMainStore } from '../stores/main';
import AppPagination from './AppPagination.vue';
import AppQuestion from './AppQuestion.vue';
import AppMessage from '../components/AppMessage.vue';

export default {
  props: ['id'],
  data() {
    return {
      mainStore: useMainStore()
    };
  },
  components: {
    AppQuestion,
    AppPagination,
    AppMessage
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