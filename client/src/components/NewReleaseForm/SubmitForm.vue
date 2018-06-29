<template>
  <div class="text-xs-center">
      <v-btn
        :loading="loading"
        :disabled="loading"
        color="primary"
        @click="submitForm()"
      >
        Create New Release
      </v-btn>
      <v-snackbar
          timeout=6000
          bottom
          multi-line
          v-model="snackbar"
        >
        {{ snackBarText }}
      <v-btn flat color="pink" @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';

  export default {
    data() {
      return {
        snackbar: false,
        snackBarText: ""
      }
    },
    methods: {
      ...mapState([
        'newRelease'
      ]),
      async submitForm() {
        const { Release } = this.$FeathersVuex;
        const release = new Release({
          data: {
            versions: this.newRelease().versions,
            GRMChanges: this.newRelease().GRMChanges,
          }
        })

        release.create()
        .then(res => {
          this.snackBarText = `New release created: ${res.tag}`;
          this.snackbar = true;
        })
        .catch(err => {
          this.snackBarText = `Error creating release: ${err.errors[0].message}`;
          this.snackbar = true;
        })
      }
    }
  };
</script>
