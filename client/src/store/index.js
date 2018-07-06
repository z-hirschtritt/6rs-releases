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
      jiraDetails: [],
    },
  },
  getters: {
    getField,
    getNewRelease(state) {
      return state.newRelease.versions;
    },
  },
  mutations: {
    updateField,
    setSelectedReleaseView(state, release) {
      state.selectedRelease = release;
    },
    updateNewReleaseVersions(state, versions) {
      state.newRelease.versions = versions;
    },
  },
  actions: {
    createAndSetDiff({ commit, dispatch, state }, currentRelease = null, previousRelease = null) {
      commit('release-diffs/clearAll');
      dispatch('release-diffs/create', {
        currentRelease: currentRelease || state.newRelease,
        previousRelease,
      });
    },
    updateNewReleaseVersions({ commit, dispatch }, versions) {
      commit('updateNewReleaseVersions', versions);
      dispatch('createAndSetDiff');
    },
  },
  plugins: [
    service('releases'),
    service('repos'),
    service('release-diffs'),
    service('jira'),
  ],
});

