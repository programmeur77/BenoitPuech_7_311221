import { createRouter, createWebHistory } from 'vue-router';
import Home from './../views/Home.vue';

const routes = [
  {
    name: 'Home',
    path: '/',
    component: Home
  },
  {
    name: 'Wall',
    path: '/wall',
    component: () =>
      import(/* webpackChunkName: "about" */ './../views/Wall.vue')
  },
  {
    name: 'Profile',
    path: '/profile/:userId',
    component: () =>
      import(/* webpackChunkName: "about" */ './../views/Profile.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
