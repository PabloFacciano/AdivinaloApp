<template>
  <div class="w-full h-full">
    
    <AppMessage
      v-if="this.loadingUser"
      icon="spinner"
      title="Cargando usuario..."
      :subtitle="`user#${this.id}`"
    />

    
    <div v-else-if="this.currentUser">
      <!-- Image -->
      <div class="bg-sky-600 text-zinc-100 pt-4 px-8 flex justify-between items-end text-nowrap overflow-show select-none ">
        <div class="flex justify-center items-center overflow-hidden aspect-square rounded-full p-8 text-4xl -mb-8  bg-gray-600 border-4 border-zinc-100 dark:border-zinc-800" v-text="this.userInitials"></div>
      </div>

      <div class="flex justify-between items-center pt-12 px-8 pb-4 border-zinc-300 dark:bg-zinc-800  overflow-show">
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
              <svg v-if="this.loadingAction == button.id" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
                fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
              </svg>
              <span v-text="button.text"></span>
          </button>
        </div>
      </div>

      <!-- Tabs -->
       
      <AppTabs 
        :tabs="[
          {
            text: 'Perfil',
            to: `/profile/${this.id}/`,
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
import AppMessage from '../components/AppMessage.vue';
import AppTabs from '../components/AppTabs.vue';
import { useMainStore } from '../stores/main';

export default {
  components: {
    AppMessage,
    AppTabs
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
          text: 'Preguntar',
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