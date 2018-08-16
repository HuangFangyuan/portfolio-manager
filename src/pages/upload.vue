<template>
  <div class="wrapper">
    <h3 class="title">Upload Data File</h3>
    <div class="upload-wrapper">
      <el-select class="select" v-model="type.type" placeholder="select">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled">
        </el-option>
      </el-select>
      <el-upload
        class="upload"
        ref="upload"
        :action="url"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :auto-upload="false"
        :data = type>
        <el-button slot="trigger" size="small" type="primary">select file</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">upload</el-button>
        <div slot="tip" class="el-upload__tip">note: cvs file only</div>
      </el-upload>
    </div>
  </div>
</template>

<script>
  import { baseUrl } from "../api/public";

  export default {
    name: "upload",
    data() {
      return {
        url: baseUrl + "/uploadFile",
        fileList: [],
        type:{
          type:''
        },
        options:[
          {
            label:'Stock',
            value:'Stock'
          },
          {
            label:'Commodity',
            value:'Commodity'
          }
        ]
      }
    },
    methods: {
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/css/common";
  .wrapper {
    /*border: 2px solid #ececee;*/
    .title{
      text-align: left;
      margin: 0px 20px 20px 20px;
    }
    .upload-wrapper {
      /*display: flex;*/
      /*align-content: flex-start;*/
      width: 400px;
      text-align: center;
      .select{
        margin: 40px;
      }
      .upload{
        @extend .select
      }
    }
  }
</style>
