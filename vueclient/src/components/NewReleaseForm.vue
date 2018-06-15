<template>
 <el-form class="form" ref="newReleaseForm" :model="newReleaseForm" label-width="120px">
   <el-row :gutter="10">
    <el-col :sm="12" :xs="24">
      <el-form-item label="Release Tag" width="50%">
        <el-input v-model="releaseTag" ></el-input>
      </el-form-item>
    </el-col>
    <el-col :sm="12" :xs="24">
      <el-form-item label="Release Date" width="50%">
        <el-date-picker
          v-model="releaseDate"
          type="date"
          placeholder="Pick a day">
        </el-date-picker>
      </el-form-item>
    </el-col>
   </el-row>
 </el-form>
</template>


<script>
import { mapFields } from 'vuex-map-fields';
import { mapActions } from 'vuex';

export default {
  name: 'new-release-form',
  computed: {
    ...mapFields([
      'newReleaseForm',
      'newReleaseForm.releaseTag',
      'newReleaseForm.releaseDate',
    ]),
  },
  methods: {},
  created() {},
};
</script>

<style>
  .form {
    padding: 20px 0px;
  }
</style>
