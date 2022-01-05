import { createRouter, createWebHistory } from 'vue-router';
import Home from './../views/Home.vue';

const routes = [
  {
    name: 'Home',
    path: '/',
    component: Home
  },
  {
    name: 'welcome',
    path: '/welcome',
    component: () =>
      import(/* webpackChunkName: "about" */ './../views/Welcome.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
