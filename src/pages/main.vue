<template>
  <el-container class="app-container">
    <el-header class="header">
      <a class="app-name" href="/#">Portfolio Manager</a>
      <span class="profile">
        <img class="avatar" src="../assets/logo.png"/>
        <el-dropdown  trigger="click">
          <span class="el-dropdown-link">
            {{ userName }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人信息</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </span>
    </el-header>
    <el-container>
      <el-aside class="side-nav" width="200px">
        <el-menu class="menu" router>
          <el-menu-item index="/log/discover">
            <template slot="title"><i class="discover-icon"></i>发现</template>
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title"><i class="monitor-icon"></i>监控</template>
            <el-menu-item index="/monitor/show">监控列表</el-menu-item>
            <el-menu-item index="/monitor/event">历史事件</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="graph-icon"></i>图表</template>
            <el-menu-item index="/graph/log">日志分析</el-menu-item>
            <el-menu-item index="/graph/event">事件分析</el-menu-item>
            <el-menu-item index="/graph/module">模块分析</el-menu-item>
            <el-menu-item index="/graph/task">任务分析</el-menu-item>
          </el-submenu>
          <!--<el-menu-item index="/graph">-->
            <!--<template slot="title"><i class="graph-icon"></i>图表</template>-->
          <!--</el-menu-item>-->
          <el-submenu index="3">
            <template slot="title"><i class="setting-icon"></i>设置</template>
            <el-menu-item index="/contact/show">联系人</el-menu-item>
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
  export default {
    data() {
      return {
        userName:'Test'
      }
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
