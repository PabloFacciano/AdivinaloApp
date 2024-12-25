// Main.js
import { defineStore } from 'pinia';
import User from '../class/User'

export const useMainStore = defineStore('main', {
  state: () => ({
    darkMode: true,
    users: {},
    loadingUser: {},
    currentUserId: null,
    auth: {
      session: null
    }
  }),
  actions: {
    async getUser(_id) {
      if (_id == null) return;

      if (_id in this.users){
        return this.users[_id];
      }
      if (_id in this.loadingUser){
        // in case of parallel calls for same user
        return await this.loadingUser[_id];
      }

      this.loadingUser[_id] = User.getFromDatabase(_id, this.currentUserId);
      this.users[_id] = await this.loadingUser[_id];
      delete this.loadingUser[_id];

      return this.users[_id];
    }
  },
  getters: {
    currentUser(){
      return this.users[this.currentUserId];
    }
  },
});

