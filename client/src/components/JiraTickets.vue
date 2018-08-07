<template>
  <v-card>
    <v-layout align-start>
    <v-flex xs12>
      <v-subheader class="headline">Jira Details</v-subheader>
    </v-flex>
    <v-spacer/>
    <v-flex ma-1>
      <v-btn
        v-if="!isDiffLoading"
        @click.native="getDiff"
        color="accent"
        icon outline
        >
        <v-icon>cached</v-icon>
      </v-btn>
    </v-flex>
    </v-layout>
    <v-layout row wrap fluid>
      <v-progress-linear
      :size="70"
      v-if="isDiffLoading"
      indeterminate color="primary"
      />
      <v-flex ma-1 sm12 md4
      :key="ticket.id"
      v-for="ticket in diffs"
      text-xs-left
      >
        <v-card hover
        target="_blank"
        :href="getLink(ticket.ticket)"
        >
          <v-card-title primary-title>
            <h3 class="mb-1">{{ticket.ticket}}</h3>
          </v-card-title>
          <v-card-text>
            <strong>Description:</strong>
            {{ticket.description}}
          </v-card-text>
          <v-card-text v-if="ticket.releaseNotes">
            <strong>Release Notes:</strong>
            {{ticket.releaseNotes}}
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
  import { mapActions, mapGetters, mapState } from 'vuex';
  import { debounce } from 'lodash';

  export default {
    name: 'jira-details',
    computed: {
      ...mapState('release-diffs', {
        isDiffLoading: 'isCreatePending'
      }),
      ...mapGetters('release-diffs', {
        findDiffsInStore: 'find',
      }),
      diffs() {
        return this.findDiffsInStore().data;
      },
    },
    methods: {
      getLink(ticket) {
        return `https://6river.atlassian.net/browse/${ticket}`
      },
      getDiff() {
        this.$store.dispatch('createAndSetDiff');
      },
    },
  }
</script>

<style>
 .headline {
   margin-right: 0px;
 }
</style>
