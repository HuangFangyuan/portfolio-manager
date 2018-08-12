import Vue from 'vue'
import Router from 'vue-router'
import Login from '../pages/login'
import Main from  '../pages/main'
import Dashboard from '../pages/dashboard'
import Upload from '../pages/upload'

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
        }
      ]
    },
    {
      path:'/main/dashboard',
      component:Dashboard
    }
  ]
})
