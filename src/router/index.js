//该文件用于创建整个应用的路由器
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter) //vue-router本身是一个插件，需要注册

import Home from "../components/Home";

//创建并暴露一个路由器
export default new VueRouter({
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            component: Home
        }
    ]
})