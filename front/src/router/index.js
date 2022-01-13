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
      import(/* webpackChunkName: "profile" */ './../views/Profile.vue')
  },
  {
    name: 'Comments',
    path: '/comments/:userId/:postId',
    component: () =>
      import(/* webpackChunkName: "comments" */ './../views/Comments.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
