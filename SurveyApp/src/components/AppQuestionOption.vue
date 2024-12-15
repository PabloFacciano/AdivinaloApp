<template>
  <button type="button" :disabled="this.readOnly" @click="this.selectOption" :class="{
    'bg-green-600': this.isValid && !this.showSpinner,
    'bg-red-600': this.isNotValid && !this.showSpinner,
    'text-zinc-800 bg-zinc-300 hover:bg-zinc-200 active:bg-zinc-100 dark:text-zinc-200 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-500 ': !this.selected && !this.readOnly && ((!this.isValid && !this.isNotValid) || this.showSpinner),
    'text-white     bg-sky-600  ': this.selected && !this.readOnly && ((!this.isValid && !this.isNotValid) || this.showSpinner),
    'text-zinc-800 bg-zinc-300 dark:text-zinc-200 dark:bg-zinc-700': !this.selected && this.readOnly && ((!this.isValid && !this.isNotValid) || this.showSpinner),
    'text-white     bg-sky-600': this.selected && this.readOnly && ((!this.isValid && !this.isNotValid) || this.showSpinner),
    'cursor-pointer': !this.readOnly && !this.selected && ((!this.isValid && !this.isNotValid) || this.showSpinner),
    'cursor-default': this.readOnly || this.selected,
    'select-none': !this.selected,
    'select-text': this.selected
  }" class="w-full flex font-medium rounded-lg text-sm px-5 py-2.5 my-1 focus:outline-none">
    <svg v-if="!this.showSpinner && this.isValid" class="h-5 w-5 -ml-1 mr-3 " version="1.1"
      xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0,0,256,256">
      <g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter"
        stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none"
        font-size="none" text-anchor="none" style="mix-blend-mode: normal">
        <g transform="scale(5.12,5.12)">
          <path
            d="M25,2c-12.683,0 -23,10.317 -23,23c0,12.683 10.317,23 23,23c12.683,0 23,-10.317 23,-23c0,-4.56 -1.33972,-8.81067 -3.63672,-12.38867l-1.36914,1.61719c1.895,3.154 3.00586,6.83148 3.00586,10.77148c0,11.579 -9.421,21 -21,21c-11.579,0 -21,-9.421 -21,-21c0,-11.579 9.421,-21 21,-21c5.443,0 10.39391,2.09977 14.12891,5.50977l1.30859,-1.54492c-4.085,-3.705 -9.5025,-5.96484 -15.4375,-5.96484zM43.23633,7.75391l-19.32227,22.80078l-8.13281,-7.58594l-1.36328,1.46289l9.66602,9.01563l20.67969,-24.40039z">
          </path>
        </g>
      </g>
    </svg>
    <svg v-if="!this.showSpinner && this.isNotValid" class="h-5 w-5 -ml-1 mr-3 " version="1.1"
      xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0,0,256,256">
      <g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter"
        stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none"
        font-size="none" text-anchor="none" style="mix-blend-mode: normal">
        <g transform="scale(5.12,5.12)">
          <path
            d="M15.125,12.28125l-2.84375,2.84375l9.9375,9.875l-9.9375,9.875l2.84375,2.84375l9.9375,-9.875l9.9375,9.875l2.8125,-2.84375l-9.90625,-9.875l9.90625,-9.875l-2.8125,-2.84375l-9.9375,9.875z">
          </path>
        </g>
      </g>
    </svg>
    <svg v-if="!this.showSpinner && (!this.isValid && !this.isNotValid && this.selected)" class="h-5 w-5 -ml-1 mr-3 " version="1.1"
      xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0,0,256,256">
      <g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter"
        stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none"
        font-size="none" text-anchor="none" style="mix-blend-mode: normal">
        <g transform="scale(5.33333,5.33333)">
          <path
            d="M26.503,3c-9.436,0 -17.239,7.175 -18.332,16.764l-4.513,5.641c-0.607,0.76 -0.811,1.771 -0.542,2.706c0.269,0.935 0.977,1.685 1.895,2.007l2.992,1.047v5.174c0,1.94 1.237,3.655 3.078,4.269l5.58,1.86c0.204,0.068 0.342,0.259 0.342,0.475v0.557c0,0.828 0.672,1.5 1.5,1.5c0.828,0 16.169,0 16.997,0c0.828,0 1.5,-0.672 1.5,-1.5v-3.032c0,-1.668 0.732,-3.277 2.054,-4.532c3.781,-3.585 5.946,-8.665 5.946,-13.936c0,-10.477 -8.296,-19 -18.497,-19zM27,34c-1.105,0 -2,-0.895 -2,-2c0,-1.105 0.895,-2 2,-2c1.105,0 2,0.895 2,2c0,1.105 -0.895,2 -2,2zM30.297,23.28c-1.043,0.976 -1.797,1.68 -1.797,3.22c0,0.828 -0.671,1.5 -1.5,1.5c-0.829,0 -1.5,-0.672 -1.5,-1.5c0,-2.843 1.524,-4.267 2.749,-5.411c1.15,-1.075 1.751,-1.701 1.751,-3.089c0,-1.654 -1.346,-3 -3,-3c-1.654,0 -3,1.346 -3,3c0,0.828 -0.671,1.5 -1.5,1.5c-0.829,0 -1.5,-0.672 -1.5,-1.5c0,-3.309 2.691,-6 6,-6c3.309,0 6,2.691 6,6c0,2.755 -1.499,4.155 -2.703,5.28z">
          </path>
        </g>
      </g>
    </svg>
    <svg v-if="this.showSpinner" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
      fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
      </path>
    </svg>
    <span v-text="this.text"></span>
  </button>
</template>

<script>

export default {
  emits: ['selectedOption'],
  props: {
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
  methods: {
    selectOption() {
      this.$emit('selectedOption');
    }
  }
};
</script>

<style scoped>
/* Add any scoped styles here */
</style>