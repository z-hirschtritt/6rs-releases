<template>
  <el-form>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Create New Release</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';

  export default {
    methods: {
      ...mapActions('releases', {
        createRelease: 'create',
      }),
      ...mapGetters({ getReleaseForm: 'getField'}),
      onSubmit() {
        this.createRelease(this.getReleaseForm('newReleaseForm'));
      }
    }
  };
</script>
