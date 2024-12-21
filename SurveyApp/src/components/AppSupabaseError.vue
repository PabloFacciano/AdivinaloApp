<template>
  <div class="w-full bg-zinc-800 p-8 my-4 text-center space-y-8 sm:w-3/5 lg:w-1/2 mx-auto sm:rounded-lg overflow-hidden shadow-lg dark:shadow-none dark:border dark:border-zinc-700">
    <div class="font-semibold">Ups! Algo salió mal</div>
    <table class="table-auto w-full text-start">
      <tr>
        <td>Error</td>
        <td v-text="error.error"></td>
      </tr>
      <tr>
        <td>Code</td>
        <td v-text="error.error_code"></td>
      </tr>
      <tr>
        <td>Description</td>
        <td v-text="error.error_description"></td>
      </tr>
    </table>
  </div>
</template>

<script>
//#error=access_denied&error_code=otp_expired&error_description=Email+link+is+invalid+or+has+expired
export default {
  props: [ 'error' ]
};
</script>