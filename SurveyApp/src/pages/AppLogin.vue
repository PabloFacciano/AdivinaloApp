<template>
  <form @submit.prevent="handleLogin" >
    <div class="w-full bg-zinc-800 p-8 my-4 text-center space-y-4 sm:w-3/5 lg:w-1/2 mx-auto sm:rounded-lg overflow-hidden shadow-lg dark:shadow-none dark:border dark:border-zinc-700">

      <div class="space-y-8" v-if="this.emailSent == false">
        <div class="text-2xl font-semibold">Iniciar Sesion</div>
        <div>Ingresa tu email y te enviaremos un link mágico para que puedas ingresar a tu cuenta.</div>

        <div>
            <label for="email" class="text-start block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input required type="email" id="email" placeholder="Tu email" v-model="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-800 dark:border-zinc-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>

        <input type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" :value="loading ? 'Espera un momento' : 'Enviar Link'"
          :disabled="loading" />
      </div>
      <div class="space-y-8" v-else>
        <div class="text-2xl font-semibold">Email enviado!</div>
        <div>Ingresa a tu correo, ya te enviamos un link para ingresar.</div>

      </div>

    </div>
  </form>
</template>

<script>
import supabase from '../db/supabase';

export default {
  data() {
    return {
      loading: false,
      emailSent: false,
      email: ''
    }
  },
  methods: {
    async handleLogin() {
      try {
        this.loading = true
        const { error } = await supabase.auth.signInWithOtp({
          email: this.email,
          emailRedirectTo: import.meta.env.BASE_URL
        })
        if (error) throw error
        this.emailSent = true;
        this.$gtag.event('login', { method: 'magiclink' });
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message)
        }
        this.emailSent = false;
      } finally {
        this.loading = false
      }
    }
  }
};
</script>