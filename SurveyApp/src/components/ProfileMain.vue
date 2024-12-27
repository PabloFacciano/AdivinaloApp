<template>
  <div>
    <HomeFeed v-if="this.id == this.mainStore.currentUser.id" />

    <AppMessage
      v-else-if="this.mainStore.currentUser.friendsId.includes(this.id)"
      title="Hola!"
      subtitle="Si me conoces, prueba a adivinar cómo respondería yo a estas preguntas."
    >
      <icon>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0,0,256,256"><g fill="#555555" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(5.12,5.12)"><path d="M25,4c-12.67187,0 -23,8.87891 -23,19.99609c0,6.44922 3.53125,12.06641 8.96094,15.73438c-0.00781,0.21484 0.00781,0.56641 -0.27344,1.61328c-0.35156,1.30078 -1.0625,3.12891 -2.5,5.19141l-1.02344,1.46484h1.78906c6.1875,0 9.76953,-4.03516 10.32422,-4.68359c1.84375,0.43359 3.73828,0.66797 5.72266,0.66797c12.66797,0 23,-8.87891 23,-19.99219c0,-11.11328 -10.32812,-19.99219 -23,-19.99219zM25,6c11.57813,0 21,8.07031 21,17.99609c0,9.92188 -9.42187,17.99219 -21,17.99219c-1.76953,0 -3.49219,-0.20312 -5.26562,-0.61719l-1.1875,-0.27734l-0.78906,0.92188c-0.68359,0.80078 -2.98437,3.15234 -6.77344,3.8125c0.72656,-1.30469 1.27344,-2.63281 1.62891,-3.96484c0.28125,-1.03125 0.33203,-1.57422 0.34375,-2.05078l0.04688,-1.11328l-0.92578,-0.625c-5.13281,-3.47266 -8.07812,-8.60547 -8.07812,-14.07812c0,-9.92578 9.42188,-17.99609 21,-17.99609zM25,13.59766c-2,0 -3.59766,0.60156 -4.69922,1.80469c-1.19922,1.19922 -1.69922,2.79688 -1.80078,4.69531h2.5c0.10156,-1.09766 0.30078,-2.09766 0.59766,-2.69531c0.60156,-1.10156 1.70313,-1.70312 3.30469,-1.70312c1.19922,0 2.19531,0.30078 2.69531,1c0.5,0.60156 0.80469,1.40234 0.80469,2.30078c0,0.69922 -0.20312,1.30078 -0.60156,1.90234c-0.19922,0.39844 -0.5,0.69922 -0.80078,1l-1.09766,1.09766c-1.10156,1.10156 -1.80078,2 -2.10156,2.80078c-0.30078,0.80078 -0.5,1.89844 -0.5,3.19922h2.5c0,-1.19922 0.09766,-2 0.39844,-2.5c0.30078,-0.60156 0.90234,-1.30078 1.80078,-2.19922c1.30078,-1.19922 2.10156,-2.10156 2.5,-2.70312c0.39844,-0.59766 0.59766,-1.39844 0.59766,-2.39844c0,-1.60156 -0.59766,-3 -1.69531,-4c-1.10156,-1.10156 -2.60156,-1.60156 -4.40234,-1.60156zM23.30078,31.30078v2.89844h2.69922v-2.89844z"></path></g></g></svg>
      </icon>
    </AppMessage>

    <AppMessage
    v-else
      :title="`Hola, soy ${this.currentUser?.name}!`"
      subtitle="¿Quieres agregarme como amigo/a?"
    >
      <icon>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0,0,256,256"><g fill="#555555" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(2,2)"><path d="M79.9,77.8c-5.1,-1.8 -10.4,-2.8 -15.9,-2.8v0v0c-16.4,0 -31.6,8.9 -39.7,23.1c-0.8,1.4 -0.3,3.3 1.1,4.1c0.5,0.3 1,0.4 1.5,0.4c1,0 2.1,-0.5 2.6,-1.5c7.1,-12.4 20.3,-20.1 34.5,-20.1v0v0c4.7,0 9.4,0.8 13.8,2.5c0.3,0.1 0.7,0.2 1,0.2c1.2,0 2.4,-0.7 2.8,-2c0.6,-1.6 -0.2,-3.3 -1.7,-3.9zM64,67c12.7,0 23,-10.3 23,-23c0,-12.7 -10.3,-23 -23,-23c-12.7,0 -23,10.3 -23,23c0,12.7 10.3,23 23,23zM64,27c9.4,0 17,7.6 17,17c0,9.4 -7.6,17 -17,17c-9.4,0 -17,-7.6 -17,-17c0,-9.4 7.6,-17 17,-17zM101,86c-11,0 -20,9 -20,20c0,11 9,20 20,20c11,0 20,-9 20,-20c0,-11 -9,-20 -20,-20zM108,109h-4v4c0,1.7 -1.3,3 -3,3c-1.7,0 -3,-1.3 -3,-3v-4h-4c-1.7,0 -3,-1.3 -3,-3c0,-1.7 1.3,-3 3,-3h4v-4c0,-1.7 1.3,-3 3,-3c1.7,0 3,1.3 3,3v4h4c1.7,0 3,1.3 3,3c0,1.7 -1.3,3 -3,3z"></path></g></g></svg>
      </icon>
    </AppMessage>
    
  </div>
</template>

<script>
import HomeFeed from './HomeFeed.vue';
import { useMainStore } from '../stores/main';

export default {
  props: ['id'],
  data(){
    return {
      mainStore: useMainStore()
    }
  },
  components: {
    HomeFeed
  },
  computed:{    
    currentUser() {
      return this.mainStore.users[this.id];
    },
  }
};
</script>