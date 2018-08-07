<template>
  <v-data-table
    :headers="headers"
    :items="tableData"
    hide-actions
    class="elevation-1"
    v-model="selected"
    item-key="tag"
    :loading="areReleasesLoading"
    no-data-text=""
  >
    <v-progress-circular slot="progress" color="blue" indeterminate></v-progress-circular>
    <template slot="items" slot-scope="props">
      <td>
        <v-checkbox
          v-model="props.selected"
          hide-details
          color="secondary"
        ></v-checkbox>
      </td>
      <td
        :key="i"
        v-for="(header, i) in headers.slice(1)"
        @click="selectRelease(props.item)"
        style="padding: 0px; max-width: 10px"
      >
        {{props.item[header.value]}}
      </td>
    </template>
  </v-data-table>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';
import * as R from 'ramda';

export default {
  name: 'releases',
  data() {
    return {
      selected: [],
      headers: [],
      tableData: [],
    }
  },
  computed: {
    ...mapState('releases', {
      areReleasesLoading: 'isFindPending',
    }),
    ...mapState({
      selectedReleases: 'selectedReleases'
    }),
    ...mapGetters('releases', {
      findReleasesInStore: 'find',
    }),
  },
  methods: {
    ...mapActions('releases', {
      findReleases: 'find',
    }),
    selectRelease(release) {
      this.$store.dispatch('setSelectedReleaseView', release);
    },
    setTableData() {
      const data = R.clone(this.findReleasesInStore().data);

      const uniqueAppNames = [...new Set(
        data.reduce((acc, release) => {
          return [...acc, ...release.versions.map((version) => version.repo.repo)]
        }, [])
      )];

      const appHeaders = uniqueAppNames.map((appName) => {
        return {
          text: appName,
          value: appName,
          align: 'center',
          sortable: false,
        };
      });

      this.headers = [
        { text: 'Compare', value: 'selected', sortable: false},
        { text: 'Release Date', value: 'createdAt', align: 'center' },
        { text: 'Id', value: 'id', align: 'center' },
        { text: 'Tag', value: 'tag', align: 'center' },
        ...appHeaders
      ]

      this.tableData = data.map((release) => {
        const apps = release.versions.reduce((acc, app) => {
          acc[app.repo.repo] = app.tag || app.tag_name
	        return acc;
        }, {});
        return Object.assign(release, apps);
      });
    },
  },
  async created() {
    await this.findReleases();
    this.setTableData();
    this.selectRelease(this.findReleasesInStore().data.slice(-1)[0])
  },
};
</script>
