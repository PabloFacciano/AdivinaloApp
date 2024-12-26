<template>
  <div class="w-full h-full">

    <div class="bg-sky-600 pt-4 px-8 flex shadow-xl text-nowrap overflow-auto overscroll-auto hide-overscroll">
      <RouterLink v-if="false" to="/friends/online" class="py-2 px-4 text-center"
        active-class="border-b-4 border-slate-200 font-medium">
        En línea
      </RouterLink>
      <RouterLink to="/friends/current" class="py-2 px-4 text-center"
        active-class="border-b-4 border-slate-200 font-medium">
        Agregados
      </RouterLink>
      <RouterLink to="/friends/blocked" class="py-2 px-4 text-center"
        active-class="border-b-4 border-slate-200 font-medium">
        Bloqueados
      </RouterLink>
    </div>

    <AppFriendsList :userList="this.users" :loading="this.loading" />
  </div>
</template>

<script>

import AppFriendsList from '../components/AppFriendsList.vue';
import { useMainStore } from '../stores/main';

export default {
  props: [ 'list' ],
  data() {
    return {
      mainStore: useMainStore(),
      loading: false,
      users: []
    }
  },
  mounted(){
    this.updateUsers();
  }, 
  watch: {
    list: {
      async handler(){
        await this.updateUsers();
      },
      immediate: true
    }
  },
  methods: {
    async updateUsers(){
      let usersId = [];
      if (this.list == 'current' || this.list == 'online') usersId = this.mainStore.currentUser?.friendsId ?? [];
      if (this.list == 'blocked') usersId = this.mainStore.currentUser?.blockedsId ?? [];
      this.users = await this.getUsers(usersId);
    },
    async getUsers(usersId) {
      if (!usersId || usersId.length == 0) return [];

      let usersToReturn = [];
      try {
        this.loading = true;
        let usersCalls = usersId.map(userId => this.mainStore.getUser(userId));
        let usersResult = await Promise.allSettled(usersCalls);
        usersToReturn = usersResult
          .filter(userResult => userResult.status == 'fulfilled')
          .map(userResult => userResult.value)
          .filter(user => ((user.online && this.list == 'online') || this.list != 'online')); // online list

      } catch (error) {
        console.error('AppFriends.vue -- Error while getting users: ', error)
      }
      this.loading = false;
      return usersToReturn;      
    }
  },
  components: {
    AppFriendsList
  }
};
</script>