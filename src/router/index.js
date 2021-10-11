//该文件用于创建整个应用的路由器
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter) //vue-router本身是一个插件，需要注册

import Show from "../pages/Show/Show";  //引入测试页面

//创建并暴露一个路由器
export default new VueRouter({
    routes:[

        {   //给这个测试页面加上路由
            path: '/show',
            component: Show,
        },


    ]
})