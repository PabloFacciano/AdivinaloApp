<template>
  <div>

    <div class="bg-sky-600 py-36 space-y-8 px-8 sm:px-16 md:px-40 lg:px-60 xl:px-80">
      <div class="font-bold">Adivinalo APP</div>
      <div class="text-4xl font-bold">¿Que tan bien conoces a tus amigos?</div>
      <div>Responde algunas preguntas multiple-choice y descúbrelo ahora. Es gratis!</div>
      <button type="button"
          class="rounded-lg bg-zinc-200 text-sky-700 hover:border hover:border-sky-800 font-medium text-sm px-5 py-2.5 me-2 focus:outline-none"
        @click="$emit('login')">Ingresar</button>
    </div>

    <div class="bg-white text-zinc-800 py-12 space-y-6 px-8 sm:px-16 md:px-40 lg:px-60 xl:px-80">
      <div class="text-2xl font-bold">¿Cómo funciona?</div>
      <div>Elige sabiamente una opción para comprobar si es la misma que tu amigo.</div>
      <video src="/src/assets/questions-demo.mp4" autoplay loop preload="auto" class="w-full aspect-square">
        Tu navegador no admite el elemento <code>video</code>.
      </video>
    </div>
    <hr>
    <div class="bg-white text-zinc-800 py-12 space-y-6 px-8 sm:px-16 md:px-40 lg:px-60 xl:px-80">
      <div class="text-2xl font-bold">Tema Oscuro</div>
      <div>Puedes cambiar a tema claro u oscuro, como te guste.</div>
      <video src="/src/assets/dark-mode-demo.mp4" autoplay loop preload="auto" class="w-full aspect-square">
        Tu navegador no admite el elemento <code>video</code>.
      </video>
    </div>

    <div class="bg-sky-600 py-36 space-y-8 px-8 sm:px-16 md:px-40 lg:px-60 xl:px-80">
      <div class="text-4xl font-bold">¿Aún no tienes una cuenta?</div>
      <div>Crea tu usuario e invita a tus amigos!</div>
      <button type="button"
          class="rounded-lg bg-zinc-200 text-sky-700 hover:border hover:border-sky-800 font-medium text-sm px-5 py-2.5 me-2 focus:outline-none"
        @click="$emit('login')">Registrarse</button>
    </div>

    <div class="bg-zinc-800 py-12 space-y-4 px-8 sm:px-16 md:px-40 lg:px-60 xl:px-80">
      <div class="text-xl font-bold">Adivinalo APP</div>
      <div>Creado con ❤ por <a target="_blank" href="https://www.linkedin.com/in/pablofacciano/" class="underline">Pablo Facciano</a></div>
      
    </div>

  </div>
</template>

<script>
export default {
  emits: [
    'login'
  ]
};
</script>