<template>
  <v-card color="secondary">
    <v-container grid-list-md text-xs-center>
      <div class="headline"><strong>Release: {{selectedRelease.tag}}</strong></div>
        <v-layout row wrap>
          <v-flex
            :key="app.appName"
            v-for="app in selectedRelease.versions"
          >
            {{app.appName}}: {{app.tag}}
        </v-flex>
        <v-flex xs12 left>
          <div><strong>GRM Changes:</strong></div>
          {{selectedRelease.grmChanges}}
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'singleRelease',
  computed: {
    ...mapState(['selectedRelease'])
  },

}
</script>

<style>

</style>
