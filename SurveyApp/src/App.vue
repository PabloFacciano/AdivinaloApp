<template>
  <div>
    <MainApp v-if="mainStore.auth.session != null" />
    <AppSupabaseError v-else-if="this.supabaseError != null" :error="this.supabaseError" />
    <AppLogin v-if="mainStore.auth.session == null" />
  </div>
</template>

<script>
import supabase from './db/supabase';
import { useMainStore } from './stores/main';
import MainApp from './pages/MainApp.vue';
import AppLogin from './pages/AppLogin.vue';
import AppSupabaseError from './components/AppSupabaseError.vue';

export default {
  components: {
    MainApp,
    AppLogin,
    AppSupabaseError
  },
  data(){
    return {
      mainStore: useMainStore(),
      supabaseError: null
    }
  },
  mounted(){
    this.handleSupabaseLoginErrors();
    this.handleNewSession();
  },
  methods: {
    handleNewSession(){
      supabase.auth.getSession().then(({ data }) => {
        if (data.session?.user?.id != null){
          this.supabaseError = null;
          this.mainStore.auth.session = data.session;
          this.mainStore.currentUserId = data.session.user?.id;
          this.mainStore.getUser(this.mainStore.currentUserId);
        }
      })
    },
    handleSupabaseLoginErrors(){
      var hash = window.location.hash.substr(1);

      var result = hash.split('&').reduce(function (res, item) {
          var parts = item.split('=');
          res[parts[0]] = parts[1];
          return res;
      }, {});

      this.supabaseError = result;
    }
  }
};
</script>
