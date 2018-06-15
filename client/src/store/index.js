import { getField, updateField } from 'vuex-map-fields';
import Vue from 'vue';
import Vuex from 'vuex';
import feathersVuex from 'feathers-vuex';
import feathersClient from '../feathers-client';

const { service, FeathersVuex } = feathersVuex(feathersClient, {
  idField: 'id',
});

Vue.use(Vuex);
Vue.use(FeathersVuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    newReleaseForm: {
      tag: '',
      GRMChanges: '',
      releaseDate: '',
    },
  },
  getters: { getField },
  mutations: { updateField },
  actions: {},
  plugins: [
    service('releases'),
    service('repos'),
    service('release-diffs'),
    // auth({ userService: 'users' })
  ],
});

