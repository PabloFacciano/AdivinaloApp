// Main.js
import { defineStore } from 'pinia';
import User from '../class/User'

export const useMainStore = defineStore('main', {
  state: () => ({
    darkMode: true,
    users: {},
    currentUserId: 1234
  }),
  actions: {
    async getUser(_id) {
      if (_id in this.users){
        return this.users[_id];
      }

      this.users[_id] = await User.getFromDatabase(_id);
      return this.users[_id];
    }
  },
  getters: {
    currentUser(){
      return this.users[this.currentUserId];
    }
  },
});

