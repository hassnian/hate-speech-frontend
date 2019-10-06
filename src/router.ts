import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import ListOfComments from './views/ListOfComments/ListOfComments.vue';
import Results from '@/views/Results/Results.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/list',
      name: 'list',
      component: ListOfComments,
    }, {
      path: '/results',
      name: 'results',
      component: Results,
    },
  ],
});
