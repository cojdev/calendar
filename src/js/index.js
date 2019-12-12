/* eslint-disable no-new */
import Vue from 'vue';
import App from './App.vue';

console.log('Todo App');

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
});
