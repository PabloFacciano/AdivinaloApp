<template>
  <div class="w-full space-y-4" v-if="this.mainStore.currentUser">
    
    <AppMessage
      title="Es momento de hacer nuevos amigos!"
      subtitle="Comparte tu perfil para que otras personas te envíen una solicitud de amistad..."
      primaryActionText="Compartir"
      @primaryActionClicked="this.shareProfile"
    />
    <AppMessage
      title="¿Listo para responder preguntas?"
      subtitle="Así tendrás un perfil más completo y tus amigos podrán adivinar tus respuestas."
      primaryActionText="Quiero responder"
      @primaryActionClicked="this.askQuestions"
    />

  </div>
</template>

<script>
import { useMainStore } from '../stores/main';
import AppMessage from '../components/AppMessage.vue';

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
  },
  components: {
    AppMessage
  }
};
</script>