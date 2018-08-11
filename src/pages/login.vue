<template>
  <div class="wrapper">
    <h2 class="title">Portfolio Manager</h2>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="SOEID">
        <el-input v-model="form.id"></el-input>
      </el-form-item>
      <el-form-item label="Password">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="login">登陆</el-button>
  </div>
</template>

<script>
  import http from '../util/http'
  import prediction from '../util/prediction'
  export default {
    data() {
      return {
        form:{
          id: '',
          password: ''
        }
      }
    },
    methods:{
      login(){
        if(this.id === '' || this.password === ''){
          this.$message.error("id or password is missed");
          return;
        }
        let params = new URLSearchParams();
        params.append('id', this.form.id);
        params.append('password', this.form.password);
        this.$http.post(http.composeUrl('/login'), params)
          .then(rep => {
            if(prediction.httpSuccess(rep)){
              this.$store.commit("SET_LOG_FLAG", true);
              this.$store.commit("SET_USER_ID", rep.data.data.id);
              this.$store.commit("SET_USER_ROLE", rep.data.data.role.id);
              this.$router.push('/home');
            }else{
              this.$message.error("log in failed")
            }
          })
      }
    }
  }
</script>

<style scoped lang="scss">
  .wrapper {
    width: 300px;
    margin: 200px auto;
    /*display: flex;*/
    /*justify-content: center;*/
    .title{
      margin-bottom: 50px;
    }
  }
</style>
