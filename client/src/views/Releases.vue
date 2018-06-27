<template>
  <div class="release">
    <v-container fluid>
      <ReleaseTable/>
    </v-container>
    <v-container fluid>
      <SingleReleaseView/>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import ReleaseTable from '@/components/ReleaseTable.vue';
import SingleReleaseView from '@/components/SingleReleaseView.vue';

export default {
  name: 'releases',
  components: {
    ReleaseTable,
    SingleReleaseView,
  },
};
</script>
