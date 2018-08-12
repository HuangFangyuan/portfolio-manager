import Vue from 'vue'
import Router from 'vue-router'
import Login from '../pages/login.vue'
import Main from  '../pages/main.vue'
import Dashboard from '../pages/dashboard.vue'

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
        }
      ]
    },
    {
      path:'/main/dashboard',
      component:Dashboard
    }
  ]
})
