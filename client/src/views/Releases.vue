<template>
  <div class="new-release">
    <ReleaseTable/>
  </div>
</template>

<script>
// @ is an alias to /src
import ReleaseTable from '@/components/ReleaseTable.vue';

export default {
  name: 'releases',
  components: {
    ReleaseTable,
  },
};
</script>
