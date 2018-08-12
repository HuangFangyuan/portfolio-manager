<template>
  <div class="wrapper">
    <h3 align="left" class="title">Upload Data File</h3>
    <el-upload
      class="upload"
      ref="upload"
      :action="url"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :auto-upload="false">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>

<script>
  export default {
    name: "upload",
    data() {
      return {
        url:"",
        fileList: []
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
  .wrapper {
    background-color: #ffffff;
    /*border-radius: 10px;*/
    width: 500px;
    height: 200px;
    border: 2px solid #ececee;
    .title{
      margin: 20px 20px 20px 20px;
    }
    .upload{
      margin: 100px 20px;
    }
  }
</style>
