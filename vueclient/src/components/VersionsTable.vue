<template>
  <v-data-table
    :headers="repos"
    header-text="repoName"
    :items="selectedVersions"
    :loading="areReposLoading"
    no-data-text=""
    hide-actions
    class="elevation-1"
  >
  <v-progress-circular slot="progress" color="blue" indeterminate></v-progress-circular>
    <template slot="items" slot-scope="props">
      <td
        :key="repo.id"
        v-for="repo in repos"
      >
        <v-menu bottom offset-y>
          <v-btn flat slot="activator">
            {{ props.item[repo.repoName] }}
          </v-btn>
          <v-list>
            <v-list-tile
              v-for="(version, j) in repo.releases.map(r => r.tag_name)"
              :key="j"
              @click="setSelected(repo, version)"
            >
            <v-list-tile-title>{{ version }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </td>
    </template>
  </v-data-table>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';

export default {
  name: 'versions-table',
  computed: {
    ...mapState('repos', {
      areReposLoading: 'isFindPending',
    }),
    ...mapGetters('repos', {
      findReposInStore: 'find',
    }),
  },
  data() {
    return {
      repos: [],
      selectedVersions: [],
    }
  },
  methods: {
    ...mapActions('repos', {
      findRepos: 'find',
    }),
    setSelected: function(repo, version) {
      this.selectedVersions[0][repo.repoName] = version;
      this.$forceUpdate();
    },
    loadData: function() {
      const data = this.findReposInStore().data;

      this.repos = data.map(repo => {
        repo['value'] = repo.repoName;
        repo['sortable'] = false;
        return repo;
      });

      this.selectedVersions[0] = data.reduce((obj, repo) => {
          obj[repo.repoName] = repo.releases[0].tag_name;
          return obj;
      }, {});
    },
  },
  async created() {
    await this.findRepos();
    this.loadData();
  },
};
</script>
