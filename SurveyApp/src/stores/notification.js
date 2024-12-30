// Notification.js
import { defineStore } from 'pinia';
import Notification from '../class/Notification'

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    notifications: []
  }),
  actions: {
    removeByIndex(index){
      this.notifications.splice(index, 1);
    },
    send(text) {
      this.notifications.push(new Notification(text));
    }
  }
});

