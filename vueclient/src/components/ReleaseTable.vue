<template>
  <v-data-table
    :headers="headers"
    :items="tableData"
    hide-actions
    class="elevation-1"
    v-if="!areReleasesLoading"
  >
    <template slot="items" slot-scope="props">
      <td>{{ props.item.releaseDate }}</td>
      <td class="text-xs-right">{{ props.item.tag }}</td>
      <td class="text-xs-right">{{ props.item.TC }}</td>
      <td class="text-xs-right">{{ props.item.WFM }}</td>
      <td class="text-xs-right">{{ props.item.MM }}</td>
    </template>
  </v-data-table>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';

export default {
  name: 'releases',
  computed: {
    ...mapState('releases', {
      areReleasesLoading: 'isFindPending',
    }),
    ...mapGetters('releases', {
      findReleasesInStore: 'find',
    }),
    releases() {
      return this.findReleasesInStore().data;
    },
    appNames() {
      return this.releases[0].versions
      .map(app => {
        return {
          text: Object.keys(app)[0],
          value: Object.keys(app)[0],
          align: 'center'
          }
        })
    },
    tableData() {
      const data = this.releases.map((release) => {
        const appVersions = release.versions;
        return Object.assign({
          id: release.id,
          tag: release.tag,
          releaseDate: release.releaseDate,
        }, ...appVersions);
      });
      return data;
    },
    headers() {
      return [
        { text: 'Release Date', value: 'releaseDate', align: 'center' },
        { text: 'Tag', value: 'tag', align: 'center' },
      ].concat(this.appNames);
    },
  },
  methods: {
    ...mapActions('releases', {
      findReleases: 'find',
    }),
  },
  created() {
    this.findReleases();
  },
};
</script>
