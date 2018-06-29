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
    selectedRelease: {},
    newRelease: {
      versions: [],
      GRMChanges: '',
    },
  },
  getters: { getField },
  mutations: {
    updateField,
    setSelectedReleaseView(state, release) {
      state.selectedRelease = release;
    },
    setSelectedVersions(state, versions) {
      state.newRelease.versions = versions;
    },
  },
  actions: {},
  plugins: [
    service('releases'),
    service('repos'),
    service('release-diffs'),
    service('jira'),
    // auth({ userService: 'users' })
  ],
});

