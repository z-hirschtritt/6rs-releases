<template>
  <v-card>
    <v-container grid-list-md text-xs-center pa-3>
        <div class="headline primary--text"><strong>Release: {{selectedRelease.tag}}</strong></div>
          <v-layout row wrap>

            <v-flex
              :key="app.id"
              v-for="app in selectedRelease.versions"
              class="versions"
              my-2
            >
              <strong>{{app.repo.repo}}</strong>: {{app.tag_name}}
          </v-flex>
          <v-flex mx-2 xs12 left text-xs-left>
            <div><strong>GRM Changes:</strong></div>
          <span v-html="grmHtml()"></span>
          </v-flex>
        </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';
import marked from 'marked';

export default {
  name: 'singleRelease',
  computed: {
    ...mapState(['selectedRelease'])
  },
  methods: {
    grmHtml() {
      return marked(this.selectedRelease.GRMChanges);
    }
  },
}
</script>

<style>
  .versions {
    border-top: .5px solid;
    border-top-color: lightgrey;
    border-bottom: .5px solid;
    border-bottom-color: lightgrey;
  }
</style>
