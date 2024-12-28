<template>
  <div>
    <HomeFeed v-if="this.id == this.mainStore.currentUser.id" />

    <AppMessage
      v-else-if="this.mainStore.currentUser.friendsId.includes(this.id)"
      title="Hola!"
      icon="addfriend"
      :subtitle="`Prueba a adivinar cómo respondería yo. Usa el botón 'Descubrir' para comenzar.`"
    />

    <AppMessage
      v-else
      :title="`Hola, soy ${this.currentUser?.name}!`"
      subtitle="¿Quieres agregarme como amigo/a?"
      icon="addfriend"
    />
    
  </div>
</template>

<script>
import HomeFeed from '../views/HomeFeed.vue';
import AppMessage from '../components/AppMessage.vue';
import { useMainStore } from '../stores/main';

export default {
  props: ['id'],
  data(){
    return {
      mainStore: useMainStore()
    }
  },
  components: {
    HomeFeed,
    AppMessage
  },
  computed:{    
    currentUser() {
      return this.mainStore.users[this.id];
    },
  }
};
</script>