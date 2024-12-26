<template>
  <div class="w-full space-y-4" v-if="this.mainStore.currentUser">
    
    <div
    class="w-full bg-zinc-300 dark:bg-zinc-800  p-8 my-4 text-center space-y-4 sm:w-3/5 lg:w-1/2 mx-auto sm:rounded-lg overflow-hidden dark:border dark:border-zinc-700">

      <div class="text-2xl">Es momento de hacer nuevos amigos!</div>
      <div>Comparte tu perfil para que otras personas te envíen una solicitud de amistad...</div>

      <div class="flex justify-center">
        <button type="button"
            class="rounded-lg text-white bg-sky-700 hover:bg-sky-800 font-medium text-sm px-5 py-2.5 me-2 dark:bg-sky-600 dark:hover:bg-sky-700 focus:outline-none dark:focus:ring-sky-800"
            @click="shareProfile">Compartir</button>
      </div>

    </div>

    <div
    class="w-full bg-zinc-300 dark:bg-zinc-800  p-8 my-4 text-center space-y-4 sm:w-3/5 lg:w-1/2 mx-auto sm:rounded-lg overflow-hidden dark:border dark:border-zinc-700">

      <div class=" text-2xl">¿Listo para responder preguntas?</div>
      <div>Así tendrás un perfil más completo y tus amigos podrán adivinar tus respuestas.</div>

      <button type="button"
            class="rounded-lg text-white bg-sky-700 hover:bg-sky-800 font-medium text-sm px-5 py-2.5 me-2 dark:bg-sky-600 dark:hover:bg-sky-700 focus:outline-none dark:focus:ring-sky-800"
            @click="askQuestions">Quiero responder</button>

    </div>

  </div>
</template>

<script>
import { useMainStore } from '../stores/main';

export default {
  data() {
    return {
      mainStore: useMainStore(),
      userIdInput: ""
    };
  },
  methods: {
    async shareProfile(){
      let url = 'https://' + window.location.host + '/profile/' + this.mainStore.currentUser.id
      try {
        await navigator.share({
          url: url,
          text: "Agrégame como amigo"
        });
      } catch (error) {
        console.error('HomeFeed.vue -- Error while sharing: ', error)
        window.prompt('Copia la url usando Ctrl+C', url)
      }
    },
    askQuestions(){
      this.$router.push('/questions/' + this.mainStore.currentUser.id);
    }
  }
};
</script>