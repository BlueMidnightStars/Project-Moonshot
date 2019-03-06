import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import greet from './views/greet.vue';
import enter from './views/enter.vue';
import addition from './views/addition.vue';
import mine from './views/mineOKR.vue';
import look from './views/lookOKR.vue';
import compile from './views/compileOKR.vue';
import not from './views/Today-not.vue';
import notReflection from './views/notReflection.vue';
import Reflection from './views/Reflection.vue';
import records from './views/records.vue';
import complete from './views/complete.vue';






Vue.use(Router);
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
    {
      path: '/',
      name: 'greet',
      component: greet,
    },
    {
      path: '/enter',
      name: 'enter',
      component: enter,
    },
    {
      path: '/addition',
      name: 'addition',
      component: addition,
    },
    {
      path: '/mine',
      name: 'mine',
      component: mine,
    },
    {
      path: '/compile',
      name: 'compile',
      component: compile,
    },
    {
      path: '/look',
      name: 'look',
      component: look,
    },
    {
      path: '/not',
      name: 'not',
      component: not,
    },
    {
      path: '/notReflection',
      name: 'notReflection',
      component: notReflection,
    },
    {
      path: '/Reflection',
      name: 'Reflection',
      component: Reflection,
    },
    {
      path: '/records',
      name: 'records',
      component: records,
    },
    {
      path: '/complete',
      name: 'complete',
      component: complete,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
  ],
});
