<template>
  <form>
    <AppSupabaseError v-if="this.supabaseError != null" :error="this.supabaseError" />
    <div class="w-full bg-zinc-800 p-8 my-4 text-center space-y-4 sm:w-3/5 lg:w-1/2 mx-auto sm:rounded-lg overflow-hidden shadow-lg dark:shadow-none dark:border dark:border-zinc-700">

      <div class="space-y-8" v-if="this.emailSent == false">
        <div class="text-2xl font-semibold">Iniciar Sesion</div>
        <div>Ingresa tu email y contraseña para ingresar a tu cuenta.</div>

        <div>
            <label for="email" class="text-start block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input required type="email" id="email" placeholder="Tu email" v-model="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-800 dark:border-zinc-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
        <div>
            <label for="password" class="text-start block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
            <input required type="password" id="password" placeholder="Tu contraseña" v-model="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-800 dark:border-zinc-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
        <small>Las contraseñas deben tener al menos 8 caracteres y ser una combinación de mayúsculas, minúsculas, números y símbolos.</small>

        <vue-turnstile site-key="0x4AAAAAAA4C_Esm9u3mDL17" v-model="token" />

        <div class="flex space-x-4" v-if="this.loading">
          <svg class="animate-spin -ml-1 mr-3 h-12 w-12 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <div>Espera un momento por favor...</div>
        </div>
        <div class="flex space-x-4" v-if="!this.loading">
          <input @click="this.login" type="button" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" :value="'Ingresar'"
            :disabled="loading" />
          <input @click="this.signup" type="button" class="w-full text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:border-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" :value="'Registrarme'"
            :disabled="loading" />
        </div>
      </div>
      <div class="space-y-8" v-if="this.emailSent">
        <div class="text-2xl font-semibold">Email enviado!</div>
        <div>Ingresa a tu correo, ya te enviamos un link para ingresar.</div>
      </div>
      <div class="space-y-8" v-if="this.passwordOk">
        <div class="text-2xl font-semibold">Inicio de sesión correcto!</div>
        <div>Espera un momento que actualizaremos la página.</div>
      </div>

    </div>
  </form>
</template>

<script>
import VueTurnstile from 'vue-turnstile';
import supabase from '../db/supabase';
import AppSupabaseError from '../components/AppSupabaseError.vue';
import { useMainStore } from '../stores/main';

export default {
  components: {
    AppSupabaseError,
    VueTurnstile 
  },
  data() {
    return {
      mainStore: useMainStore(),
      token: '',
      loading: false,
      emailSent: false,
      passwordOk: false,
      email: '',
      password: '',
      supabaseError: null
    }
  },
  mounted(){
    this.handleSupabaseLoginErrors();
    this.handleNewSession();
  },
  methods: {
    async login(){
      try {
        this.loading = true
        if (!this.email) throw new Error("El email es obligatorio.")
        if (!this.password) throw new Error("La contraseña es obligatoria.")
        const { error } = await supabase.auth.signInWithPassword({
          email: this.email,
          password: this.password,
          options: { captchaToken: this.token }
        })
        if (error) throw error;
        this.$gtag.event('login');
        this.loading = false;
        this.passwordOk = true;
        this.handleNewSession();
      } catch (error) {
        this.loading = false;
        this.handleAuthError(error, 'signup');
      }
    },
    async signup(){
      try {
        this.loading = true
        if (!this.email) throw new Error("El email es obligatorio.")
        if (!this.password) throw new Error("La contraseña es obligatoria.")
        const { error } = await supabase.auth.signUp({
          email: this.email,
          password: this.password,
          options: { captchaToken: this.token }
        })
        if (error) throw error;
        this.$gtag.event('signup');
        this.loading = false;
        this.passwordOk = true;
        this.handleNewSession();
      } catch (error) {
        this.loading = false;
        this.handleAuthError(error, 'login');
      }
    },
    handleAuthError(error, from){
      if (error.code == "user_already_exists"){
        this.login();
        return;
      }
      if (error.code == "invalid_credentials"){
        alert("Usuario y/o contraseña no válidos.");
        return;
      }
      if (error.code == "user_bannel"){
        alert("Tu usuario fue baneado.");
        return;
      }
      if (error.code == "weak_password"){
        alert("Las contraseñas deben tener al menos 8 caracteres y ser una combinación de mayúsculas, minúsculas, números y símbolos.");
        return;
      }
      alert(error);
    },
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
      if(!window.location.hash) return;
      var hash = window.location.hash.substring(1);

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