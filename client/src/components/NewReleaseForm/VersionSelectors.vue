<template>
  <v-layout row wrap fill-height>
    <v-flex
      mx-1
      style="max-width: 10rem"
      :key="repo.id"
      v-for="(repo, i) in repos"
    >
      <v-select
        :label="repo.repoName"
        :items="repo.releases"
        item-text="tag_name"
        item-value="tag_name"
        :value="selected[i]"
        @change="handleSelection(i, $event)"
        return-object
        autocomplete
        :loading="areReposLoading"
      ></v-select>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';
import { mapFields } from 'vuex-map-fields';
import * as R from 'ramda';

export default {
  name: 'version-selectors',
  computed: {
    ...mapState('repos', {
      areReposLoading: 'isFindPending',
    }),
    ...mapGetters('repos', {
      findReposInStore: 'find',
    }),
    selected() {
      return this.$store.state.newRelease.versions;
    },
    repos() {
      return this.findReposInStore().data;
    }
  },
  methods: {
    loadInitialSelected() {
      const initialSelected = this.repos().map(repo => repo.releases[0]);
      this.$store.commit('setSelectedVersions', initialSelected)
    },
    ...mapActions('repos', {
      findRepos: 'find',
    }),
    handleSelection(index, value) {
      this.selected[index] = value;
      this.$store.commit('setSelectedVersions', this.selected);
    }
  },
  async beforeMount() {
    await this.findRepos();
    this.loadInitialSelected();
  }
}
</script>

