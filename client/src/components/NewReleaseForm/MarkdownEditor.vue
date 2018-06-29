<template>
    <v-card>
      <v-subheader class="headline" my-2>GRM Changes</v-subheader>
      <v-layout row wrap>
        <v-flex sm6 xs12 pa-2>
          <v-text-field
            label="markdown here..."
            v-model="GRMChanges"
            box
            rows=5
            multi-line
            full-width
            @input.native="convertMarkdown()"
          />
        </v-flex>
        <v-flex pa-3 pl-5 sm6 xs12>
          <span class="text-sm-left" v-html="htmlPreview"/>
        </v-flex>
      </v-layout>
    </v-card>
</template>

<script>
  import marked from 'marked';
  import { mapFields } from 'vuex-map-fields';

  marked.setOptions({
    gfm: true,
    breaks: true,
    smartLists: true,
    smartypants: true,
  });

  export default {
    name: 'markdown-editor',
    data() {
      return {
        htmlPreview: ""
      }
    },
    computed: {
      ...mapFields({
        GRMChanges: 'newRelease.GRMChanges'
      })
    },
     methods: {
       convertMarkdown() {
         this.htmlPreview = marked(this.GRMChanges);
       }
    },
  };
</script>

<style scoped>
  .htmlpreview {
    text-align: left;
  }
</style>
