<template>
  <v-card>
    <v-btn @click.native="getTickets" outline color="primary" dark>Get Jira Details</v-btn>
    <v-layout row wrap fluid>
      <v-flex ma-1 sm12 md4
      :key="ticket.id"
      v-for="ticket in tickets"
      text-xs-left
      >
        <v-card hover target="_blank" :href="getLink(ticket.ticket)">
          <v-card-title primary-title>
            <h3 class="headline mb-0">{{ticket.ticket}}</h3>
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
  import { mapActions, mapGetters } from 'vuex';
  import { debounce } from 'lodash';

  export default {
    name: 'jira-details',
    data() {
      return {
        tickets: ''
      }
    },
    computed: {},
    methods: {
      getLink(ticket) {
        return `https://6river.atlassian.net/browse/${ticket}`
      },
      ...mapActions({
        getJiraDetails: 'populateJiraDetailsForRelease'
      }),
      async getTickets() {
        this.tickets = await this.$store.dispatch('release-diffs/create', {
          currentRelease: this.$store.state.newRelease
        });
      },
    },
  }
</script>
