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
  watch: {
    list: {
      async handler(newId){
        await this.refreshList();
      },
      immediate: true
    }
  },
  methods: {
    async refreshList(){
      this.loading = true;
      // Save to store
      await Promise.allSettled(
        this.getUsersIds
        .map(userId => this.mainStore.getUser(userId)));
      // Get from store
      let users = this.getUsersIds.map(userId => this.mainStore.users[userId]);
      this.users = users;
      this.loading = false;
    }
  },
  computed: {
    getUsersIds() {
      if (this.list == 'current' || this.list == 'online'){
        return this.mainStore.currentUser.friendsId;
      } else if (this.list == 'blocked'){
        return this.mainStore.currentUser.blockedsId;
      }
      return [];  
    }
  },
  components: {
    AppFriendsList
  }
};
</script>