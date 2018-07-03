<template>
  <v-layout row wrap>
    <v-flex xs12 mt-3>
      <VersionSelectors/>
    </v-flex>
    <v-flex xs12 mt-3>
      <MarkdownEditor/>
    </v-flex>
    <v-flex xs12 mt-3>
      <JiraTickets/>
    </v-flex>
    <v-flex xs12 mt-4>
      <SubmitForm/>
    </v-flex>
  </v-layout>
</template>

<script>
// @ is an alias to /src
import MarkdownEditor from '@/components/NewReleaseForm/MarkdownEditor.vue';
import SubmitForm from '@/components/NewReleaseForm/SubmitForm.vue';
import VersionSelectors from '@/components/NewReleaseForm/VersionSelectors.vue';
import JiraTickets from '@/components/JiraTickets.vue';

export default {
  name: 'new-release',
  components: {
    MarkdownEditor,
    SubmitForm,
    VersionSelectors,
    JiraTickets,
  },
};
</script>
