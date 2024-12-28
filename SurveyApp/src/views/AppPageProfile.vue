<template>
  <div class="w-full h-full">
    
    <AppMessage
      v-if="this.loadingUser"
      icon="spinner"
      title="Cargando usuario..."
      :subtitle="`user#${this.id}`"
    />

    
    <div v-else-if="this.currentUser" class="transition-colors duration-200">
      <!-- Image -->
      <div class="bg-sky-600 text-zinc-100 pt-4 px-8 flex justify-between items-end text-nowrap overflow-show select-none ">
        <div :class="{
            'bg-sky-600': this.isCurrentUser,
            'bg-pink-600': !this.isCurrentUser
          }"class="flex justify-center items-center overflow-hidden aspect-square rounded-full p-8 text-4xl -mb-8 border-4 border-zinc-100 dark:border-zinc-800 transition-colors duration-200" v-text="this.userInitials"></div>
      </div>

      <div class="bg-zinc-100 dark:bg-zinc-800 flex justify-between items-center pt-12 px-8 pb-4 border-zinc-300 overflow-show transition-colors duration-200">
        <!-- Name -->
        <div>
          <h1 class="text-xl font-medium" v-text="this.currentUser.name ?? 'Loading...'"></h1>
        </div>
        <!-- Actions -->
        <div class="space-x-2 flex">
          <button v-for="button in buttons" :key="button.text" type="button"
            class="flex  text-white bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-sky-600 dark:hover:bg-sky-700 focus:outline-none dark:focus:ring-sky-800"
              :disabled="this.loadingAction == button.id" 
              @click="buttonClick(button)">
              
              <AppIcon
                icon="spinner"
                class="size-5 -ml-1 mr-3"
                v-if="this.loadingAction == button.id"
              />
              <span v-text="button.text"></span>
          </button>
        </div>
      </div>

      <!-- Tabs -->
       
      <AppTabs 
        class="px-4 bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100"
        borderClass="border-b-4 border-zinc-800 dark:border-zinc-200"
        :tabs="[
          {
            text: 'Perfil',
            to: `/profile/${this.id}/info`,
            visible: this.isCurrentUser || (this.areFriends && !this.isBlocked)
          },
          {
            text: 'Preguntas',
            to: `/profile/${this.$route.params.id}/questions`,
            visible: this.isCurrentUser || (this.areFriends && !this.isBlocked)
          },
          {
            text: 'Estadísticas',
            to: `/profile/${this.$route.params.id}/stats`,
            visible: false
          },
          {
            text: 'Actividad',
            to: `/profile/${this.$route.params.id}/activity`,
            visible: false
          }
        ]"
      />

      <!-- Subpage -->
      <RouterView />
    </div>

    <AppMessage
      v-else
      icon="x"
      title="Uy! Este usuario no existe 🥴"
      :subtitle="`user#${this.id}`"
    />
    
  </div>
</template>

<script>
import AppIcon from '../components/AppIcon.vue';
import AppMessage from '../components/AppMessage.vue';
import AppTabs from '../components/AppTabs.vue';
import { useMainStore } from '../stores/main';

export default {
  components: {
    AppMessage,
    AppTabs,
    AppIcon
  },
  props: ['id'],
  data() {
    return {
      mainStore: useMainStore(),
      loadingUser: true,
      loadingAction: null
    }
  },
  watch: {
    id: {
      async handler(newId){
        this.loadingUser = true;
        await this.mainStore.getUser(newId);
        this.loadingUser = false;
      },
      immediate: true
    }
  },
  computed: {
    currentUser(){
      return this.mainStore.users[this.id];
    },
    userInitials() {
      if (!this.currentUser) return '??'
      return this.currentUser.initials;
    },
    isCurrentUser() {
      return this.id == this.mainStore.currentUser?.id ?? false;
    },
    areFriends() {
      return this.mainStore.currentUser?.friendsId?.includes(this.$route.params.id) ?? false;
    },
    isBlocked() {
      return this.mainStore.currentUser?.blockedsId?.includes(this.$route.params.id) ?? true;
    },
    buttons() {
      let buttons = [
        {
          id: 'ask',
          text: 'Descubrir',
          visible: !this.isCurrentUser && this.areFriends && !this.isBlocked,
          action: this.ask
        },
        {
          id: 'ask',
          text: 'Responder',
          visible: this.isCurrentUser,
          action: this.ask
        },
        {
          id: 'addFriend',
          text: 'Agregar como amigo',
          visible: !this.isCurrentUser && !this.areFriends && !this.isBlocked,
          action: this.addFriend
        },
        {
          id: 'block',
          text: 'Bloquear',
          visible: false && !this.isCurrentUser && !this.isBlocked,
          action: this.blockUser
        },
        {
          id: 'block',
          text: 'Desbloquear',
          visible: false && !this.isCurrentUser && this.isBlocked,
          action: this.unblockUser
        }
      ];
      return buttons.filter(a => a.visible);
    }
  },
  methods: {    
    buttonClick(button) {
      if (!button || !button.visible) return;
      button.action();
    },
    ask(){
      this.$router.push('/questions/' + this.id);
    },
    async addFriend(){
      try {
        this.loadingAction = 'addFriend';
        await this.mainStore.currentUser.addFriend(this.id);
        this.$gtag.event('addFriend');
      } catch (error) {
        console.error(`AppPageProfile.vue -- Cannot add friend [${this.id}]`, error)
      } finally {
        this.loadingAction = null;
      }
    },
    async blockUser(){
      try {
        this.loadingAction = 'block';
        await this.mainStore.currentUser.blockUser(this.id);
      } catch (error) {
        console.error(`AppPageProfile.vue -- Cannot block user [${this.id}]`, error)
      } finally {
        this.loadingAction = null;
      }
    },
    async unblockUser(){
      try {
        this.loadingAction = 'block';
        await this.mainStore.currentUser.unblockUser(this.id);
      } catch (error) {
        console.error(`AppPageProfile.vue -- Cannot unblock user [${this.id}]`, error)
      } finally {
        this.loadingAction = null;
      }
    },
  }
};
</script>