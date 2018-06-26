<template>
  <div class="release">
    <v-container fluid>
      <ReleaseTable/>
    </v-container>
    <v-container fluid>
      <VersionsTable/>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import ReleaseTable from '@/components/ReleaseTable.vue';
import VersionsTable from '@/components/VersionsTable.vue';

export default {
  name: 'releases',
  components: {
    ReleaseTable,
    VersionsTable,
  },
};
</script>
