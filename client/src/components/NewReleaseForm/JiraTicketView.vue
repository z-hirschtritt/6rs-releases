<template>
  <v-layout row wrap>
    <v-flex xs12>

    </v-flex>
  </v-layout>

</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex';

  export default {
    computed: {
      ...mapState('jira', {
        areReposLoading: 'isFindPending',
      }),
      ...mapGetters('jira', {
        findReposInStore: 'find',
      }),
    }
  }
</script>
