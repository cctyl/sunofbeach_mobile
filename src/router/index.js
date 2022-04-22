//该文件用于创建整个应用的路由器
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter) //vue-router本身是一个插件，需要注册

import store from '../store/index'

import Home from "../pages/Home/Home";
import ArticleDetail from "../pages/ArticleDetail/ArticleDetail";
import Login from "../pages/Login/Login";
import Message from "../pages/Message/Message";
import Moment from "../pages/Moment/Moment";

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            component: Home,
            meta:{
                showHeader:true,
                navText:'首页'
            }
        },
        {
            path: '/detail',
            component: ArticleDetail,
            meta:{
                showHeader:true,
                navText:'首页'
            }

        },
        {
            path:'/login',
            component:Login
        },
        {
            path:'/message',
            component:Message,
            meta:{
                showHeader:true,
                navText:'首页'
            }
        },
        {
            path:'/moment',
            component:Moment,
            meta:{
                showHeader:true,
                navText:'摸鱼'
            }
        },


    ]
})
//初始化时调用一次
//然后，在每一次切换路由之前，执行一次这个方法
//全局前置路由守卫
router.beforeEach((to, from, next) => {
    //接收三个参数
    //to 去哪，下一个路由的路径，名字，参数等等
    //from 从哪来
    //next 下一步

    //到login页面之前，记录下之前的路径
    if (to.path=='/login'){
        store.dispatch('setLastUrl',from.fullPath)
    }


    next()
})

//创建并暴露一个路由器
export default router
