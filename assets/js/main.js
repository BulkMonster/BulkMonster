const router = new VueRouter({
  mode: 'history',
  // base: '/Portfolio/',
  routes: []
});
const app = new Vue({
  router,
  data() {
    return {
      loader: true
    }
  },
  mounted() {
    this.loader = false;
  }
}).$mount('#app');

// // PWA Code
// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('sw.js').then(() => console.log("[SW] Is activated."));
// }