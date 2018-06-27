<template>
    <v-card>
      <v-flex pa-2>
        <v-text-field
          label="GRM Changes"
          v-model="value"
          box
          rows=10
          multi-line
        >
        </v-text-field>

      </v-flex>
    </v-card>
</template>

<script>
  import Editor from "@servicestack/editor";
  import { mapFields } from 'vuex-map-fields';

  export default {
    name: 'markdown-editor',
    components: {
      Editor
    },
    data () {
      return {
        configs: {
          status: true,
          spellChecker: false
        }
      }
    },
    computed: {
    }
  }
</script>

<style scoped>
  .editor {
    padding: 10px;
  }
  .editorbox {
    margin-top: 20px;
  }
</style>
