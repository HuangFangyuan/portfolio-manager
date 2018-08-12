<template>
  <el-container class="app-container" :syle="height">
    <el-header class="header">
      <a class="app-name" href="/#">Portfolio Manager</a>
      <span class="profile">
        <img class="avatar" src="../assets/logo.png"/>
        <el-dropdown  trigger="click">
          <span class="el-dropdown-link">
            {{ userName }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>Profile</el-dropdown-item>
            <el-dropdown-item @click="logout">Log out</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </span>
    </el-header>
    <el-container>
      <el-aside class="side-nav" width="200px">
        <el-menu class="menu" router>
          <el-menu-item index="/main/dashboard" align="left">
            <template slot="title"><i class="discover-icon"></i>Dashboard</template>
          </el-menu-item>
          <el-menu-item index="/main/CRUD" align="left">
            <template slot="title"><i class="discover-icon"></i>CRUD</template>
          </el-menu-item>
          <el-menu-item index="/main/upload" v-if="role === 'admin'" align="left">
            <template slot="title"><i class="monitor-icon"></i>Upload</template>
          </el-menu-item>
          <el-submenu index="2" align="left">
            <template slot="title"><i class="graph-icon"></i>Aggregation</template>
          </el-submenu>
          <el-submenu index="3" align="left">
            <template slot="title"><i class="setting-icon"></i>Visualize</template>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view/>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
  import USER from '../api/user'
  import PREDICTION from '../util/prediction'
  import { mapState } from 'vuex'
  export default {
    data(){
      return {
        window:{
          height:''
        }
      }
    },
    computed:mapState(['userId','role','userName']),
    methods:{
      logout(){
        USER.logout({
          id: this.userId
        })
          .then(rep => {
          if (PREDICTION.httpSuccess(rep)) {
            this.$store.commit("SET_LOG_FLAG", false);
            this.$store.commit("SET_USER_ID", null);
            this.$store.commit("SET_USER_ROLE", null);
            this.$router.push('/');
          }
          else {
            this.$message.error(rep.data.msg);
          }
        });
      },
      wh() {
        this.window.height = window.innerHeight-153+'px';
      }
    },
    mounted(){
      this.wh()
    }
  }
</script>

<style lang="scss" scoped>
  $icon-h: 18px;
  $icon-w: 18px;
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
  }
  .app-container {
    padding: 0;
    width:100%;
    height:100%;
    background-color: #f2f3f5;
    .header {
      background-color: #19a97b;
      display: flex;
      align-items: center;
      color: white;
      overflow: hidden;
      .app-name {
        font-size: 20px;
        text-decoration: none;
        color: white;
      }
      .profile {
        margin-left: auto;
        width: 200px;
        .avatar {
          height: 20px;
          width: 20px;
          border-radius: 50%;
        }
      }
    }
    .side-nav {
      .menu {
        height: 100%;
        .discover-icon {
          background-image: url("../assets/svg/discover.svg");
          background-size: $icon-w $icon-h;
          width: $icon-w;
          height:$icon-h;
          display: inline-block;
          margin: 0 15px 0 4px;
        }
        .monitor-icon {
          background-image: url("../assets/svg/monitor.svg");
          @extend .discover-icon
        }
        .graph-icon {
          background-image: url("../assets/svg/graph.svg");
          @extend .discover-icon
        }
        .setting-icon {
          background-image: url("../assets/svg/setting.svg");
          @extend .discover-icon
        }
      }
    }
    .main {
      margin-left:20px;
      padding:0;
      height: 100%;
    }
  }
</style>
