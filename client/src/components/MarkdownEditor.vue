<template>
  <div>
    <markdown-editor class="markdownEditor" v-model="GRMChanges" ref="markdownEditor" :configs="configs"></markdown-editor>
  </div>
</template>

<script>
  // import Editor from "@sericestack/editor";

  import markdownEditor from 'vue-simplemde/src/markdown-editor'
  import { mapFields } from 'vuex-map-fields';

  export default {
    components: {
      markdownEditor
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
      ...mapFields([
        'newReleaseForm.GRMChanges',
      ]),
      simplemde () {
        return this.$refs.markdownEditor.simplemde
      },
    }
  }
</script>

<style>
  @import '~simplemde/dist/simplemde.min.css';
  @import '~github-markdown-css';
  .markdownEditor {
    text-align: left;
  }
</style>
