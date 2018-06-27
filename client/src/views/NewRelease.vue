<template>
  <v-layout row wrap>
    <v-flex xs12>
      <VersionsPicker/>
    </v-flex>
    <v-flex xs12 mt-3>
      <MarkdownEditor/>
    </v-flex>
    <v-flex xs12 mt-4>
      <SubmitForm/>
    </v-flex>
  </v-layout>
</template>

<script>
// @ is an alias to /src
import VersionsPicker from '@/components/NewReleaseForm/VersionsPicker.vue';
import MarkdownEditor from '@/components/NewReleaseForm/MarkdownEditor.vue';
import SubmitForm from '@/components/NewReleaseForm/SubmitForm.vue';

export default {
  name: 'new-release',
  components: {
    VersionsPicker,
    MarkdownEditor,
    SubmitForm,
  },
};
</script>
