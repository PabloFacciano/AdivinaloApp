<template>
  <button type="button" :disabled="this.readOnly" @click="this.selectOption" :class="{
    'bg-green-600 text-white': this.isValid && !this.showSpinner,
    'bg-red-600 text-white': this.isNotValid && !this.showSpinner,
    'text-zinc-800 bg-zinc-200 hover:bg-zinc-300 active:bg-zinc-400 dark:text-zinc-200 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-500 ': !this.selected && !this.readOnly && ((!this.isValid && !this.isNotValid) || this.showSpinner),
    'text-white     bg-sky-600  ': this.selected && !this.readOnly && ((!this.isValid && !this.isNotValid) || this.showSpinner),
    'text-zinc-800 bg-zinc-200 dark:text-zinc-300 dark:bg-zinc-700': !this.selected && this.readOnly && ((!this.isValid && !this.isNotValid) || this.showSpinner),
    'text-white     bg-sky-600': this.selected && this.readOnly && ((!this.isValid && !this.isNotValid) || this.showSpinner),
    'cursor-pointer transition-transform transform hover:scale-105': !this.readOnly && !this.selected && ((!this.isValid && !this.isNotValid) || this.showSpinner),
    'cursor-default': this.readOnly || this.selected,
    'select-none': !this.selected,
    'select-text': this.selected
  }" class="w-full flex font-medium rounded-lg text-sm px-5 py-2.5 my-1 focus:outline-none transition-colors duration-200">
    <div class="size-1"><div :id="`reward-option-a-${this.value}`" class="size-1"></div></div>
   
    <AppIcon 
      fill="#ffffff"
      icon="check"
      class="h-5 w-5 -ml-1 mr-3"
      v-if="!this.showSpinner && this.isValid"
    />
    <AppIcon 
      fill="#ffffff"
      icon="x"
      class="h-5 w-5 -ml-1 mr-3"
      v-else-if="!this.showSpinner && this.isNotValid"
    />
    <AppIcon 
      fill="#ffffff"
      icon="userquestion"
      class="h-5 w-5 -ml-1 mr-3"
      v-else-if="!this.showSpinner && (!this.isValid && !this.isNotValid && this.selected)"
    />
    <AppIcon
      icon="spinner"
      class="h-5 w-5 -ml-1 mr-3"
      v-else-if="this.showSpinner"
    />
    
    <div class="" v-text="this.text"></div>
  </button>
</template>

<script>

import AppIcon from './AppIcon.vue';

export default {
  emits: ['selectedOption'],
  props: {
    value: {
      type: Number,
      required: false
    },
    text: {
      type: String,
      required: true
    },
    readOnly: {
      type: Boolean,
      required: false,
      default: false
    },
    selected: {
      type: Boolean,
      required: false,
      default: false
    },
    isValid: {
      type: Boolean,
      required: false,
      default: false
    },
    isNotValid: {
      type: Boolean,
      required: false,
      default: false
    },
    showSpinner: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  components: {
    AppIcon
  },
  methods: {
    selectOption() {
      this.$emit('selectedOption');
      this.balloonsReward();
    },
    balloonsReward() {
      const emojis = "✨❤😮🔥🥴⭐👀🤪😱🤡🙈🙊🙌👌💣💥🆗🆒✔💭";
      this.$reward(`reward-option-a-${this.value}`, 'emoji', {
        lifetime: 50,
        startVelocity: 20,
        angle: 120,
        spread: 360,
        elementCount: 35,
        decay: 0.94,
        emoji: emojis[Math.floor(Math.random() * emojis.length)]
      }).reward();
      ;
    }
  }
};
</script>

<style scoped>
/* Add any scoped styles here */
</style>