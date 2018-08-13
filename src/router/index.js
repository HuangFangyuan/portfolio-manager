import Vue from 'vue'
import Router from 'vue-router'
import Login from '../pages/login.vue'
import Main from  '../pages/main.vue'
import Dashboard from '../pages/dashboard.vue'
import Upload from '../pages/upload.vue'
import Manager from '../pages/manager.vue'
import Portfolio from '../pages/portfolio.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path:'/',
    component:Login,
  },
    {
      path:'/main',
      component:Main,
      children:[
        {
          path:'/main/dashboard',
          component:Dashboard
        },{
          path:'/main/upload',
          component:Upload
        },{
          path:'/main/manager',
          component:Manager
        },{
          path:'/main/portfolio',
          component:Portfolio
        }
      ]
    }
  ]
})
