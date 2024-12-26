<template>
  <div class="w-full overflow-auto" v-if="this.currentUser">

    <div class="py-6 sm:mx-3 space-y-3" v-if="this.questions.length > 0">

      <AppQuestion v-for="feedItem in this.questions"
        :key="feedItem.fromUserId + '-' + feedItem.toUserId + '-' + feedItem.id" :data="feedItem"
        :options="questionOptions" />

      <AppPagination :data="this.currentUser.questionsPagination" />

    </div>

    <div v-else
      class="w-full bg-zinc-800 p-8 my-6 sm:w-3/5 lg:w-1/2 mx-auto sm:rounded-lg overflow-hidden dark:border dark:border-zinc-700">
      <div>

        <div v-if="this.isCurrentLoggedinUser" class="space-y-4 flex flex-col items-center">
          <svg class="size-12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0,0,256,256"><g fill="#555555" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(5.12,5.12)"><path d="M25,4c-12.67187,0 -23,8.87891 -23,19.99609c0,6.44922 3.53125,12.06641 8.96094,15.73438c-0.00781,0.21484 0.00781,0.56641 -0.27344,1.61328c-0.35156,1.30078 -1.0625,3.12891 -2.5,5.19141l-1.02344,1.46484h1.78906c6.1875,0 9.76953,-4.03516 10.32422,-4.68359c1.84375,0.43359 3.73828,0.66797 5.72266,0.66797c12.66797,0 23,-8.87891 23,-19.99219c0,-11.11328 -10.32812,-19.99219 -23,-19.99219zM25,6c11.57813,0 21,8.07031 21,17.99609c0,9.92188 -9.42187,17.99219 -21,17.99219c-1.76953,0 -3.49219,-0.20312 -5.26562,-0.61719l-1.1875,-0.27734l-0.78906,0.92188c-0.68359,0.80078 -2.98437,3.15234 -6.77344,3.8125c0.72656,-1.30469 1.27344,-2.63281 1.62891,-3.96484c0.28125,-1.03125 0.33203,-1.57422 0.34375,-2.05078l0.04688,-1.11328l-0.92578,-0.625c-5.13281,-3.47266 -8.07812,-8.60547 -8.07812,-14.07812c0,-9.92578 9.42188,-17.99609 21,-17.99609zM25,13.59766c-2,0 -3.59766,0.60156 -4.69922,1.80469c-1.19922,1.19922 -1.69922,2.79688 -1.80078,4.69531h2.5c0.10156,-1.09766 0.30078,-2.09766 0.59766,-2.69531c0.60156,-1.10156 1.70313,-1.70312 3.30469,-1.70312c1.19922,0 2.19531,0.30078 2.69531,1c0.5,0.60156 0.80469,1.40234 0.80469,2.30078c0,0.69922 -0.20312,1.30078 -0.60156,1.90234c-0.19922,0.39844 -0.5,0.69922 -0.80078,1l-1.09766,1.09766c-1.10156,1.10156 -1.80078,2 -2.10156,2.80078c-0.30078,0.80078 -0.5,1.89844 -0.5,3.19922h2.5c0,-1.19922 0.09766,-2 0.39844,-2.5c0.30078,-0.60156 0.90234,-1.30078 1.80078,-2.19922c1.30078,-1.19922 2.10156,-2.10156 2.5,-2.70312c0.39844,-0.59766 0.59766,-1.39844 0.59766,-2.39844c0,-1.60156 -0.59766,-3 -1.69531,-4c-1.10156,-1.10156 -2.60156,-1.60156 -4.40234,-1.60156zM23.30078,31.30078v2.89844h2.69922v-2.89844z"></path></g></g></svg>
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