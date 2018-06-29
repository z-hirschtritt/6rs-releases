import Vue from 'vue';
import Router from 'vue-router';
import NewRelease from './views/NewRelease.vue';
import Releases from './views/Releases.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/new-release',
      name: 'new-release',
      component: NewRelease,
    },
    {
      path: '/',
      name: 'releases',
      component: Releases,
    },
  ],
});
