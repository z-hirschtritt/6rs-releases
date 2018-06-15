<template>
  <div class="new-release">
    <VersionsTable/>
    <NewReleaseForm/>
    <MarkdownEditor/>
    <SubmitForm/>
  </div>
</template>

<script>
// @ is an alias to /src
import VersionsTable from '@/components/VersionsTable.vue';
import NewReleaseForm from '@/components/NewReleaseForm.vue';
import MarkdownEditor from '@/components/MarkdownEditor.vue';
import SubmitForm from '@/components/SubmitForm.vue';

export default {
  name: 'new-release',
  components: {
    VersionsTable,
    NewReleaseForm,
    MarkdownEditor,
    SubmitForm,
  },
};
</script>
