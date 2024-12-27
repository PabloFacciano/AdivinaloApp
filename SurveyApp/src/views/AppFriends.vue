<template>
  <div class="w-full h-full">
    <AppTabs 
      :tabs="[
        {
          text: 'En línea',
          to: '/friends/online',
          visible: false
        },
        {
          text: 'Agregados',
          to: '/friends/current',
          visible: true
        },
        {
          text: 'Bloqueados',
          to: '/friends/blocked',
          visible: true
        }
      ]"
    />
    <AppFriendsList :userList="this.users" :loading="this.loading" />
  </div>
</template>

<script>

import AppFriendsList from './views/AppFriendsList.vue';
import AppTabs from '../components/AppTabs.vue';
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
    AppFriendsList,
    AppTabs
  }
};
</script>