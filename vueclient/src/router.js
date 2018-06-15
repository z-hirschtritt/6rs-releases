import Vue from 'vue';
import Router from 'vue-router';
import NewRelease from './views/NewRelease.vue';
import Releases from './views/Releases.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'new-release',
      component: NewRelease,
    },
    {
      path: '/releases',
      name: 'releases',
      component: Releases,
    },
  ],
});
