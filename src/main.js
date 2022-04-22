import Vue from 'vue'  //引入vue本身
import App from './App.vue' //引入根组件
import router from './router'
import store from './store'
import axios from "axios";

axios.defaults.withCredentials = true; //配置为true

axios.defaults.timeout = 8 * 1000;
//配置axios的拦截器
//请求拦截器
axios.interceptors.request.use(function (request) {
    //发送请求之前，把 token 和 lci 带上，放在请求头中
    let captchaKey = localStorage.getItem("l_c_i")
    let sobToken = localStorage.getItem("sob_token")

    //添加请求头
    request.headers.l_c_i = captchaKey;
    request.headers.sob_token = sobToken;

    return request;
});

//响应拦截器
axios.interceptors.response.use(
    response => {
        //拦截响应，做统一处理
        //只要响应中有 lci 和sob_token，就存入本地
        if ( response.headers.sob_token) {

            //这里只存储了sobtoken，为啥，因为lci 那个请求是通过fetch发起的，和axios没有关系
            localStorage.setItem("sob_token", response.headers.sob_token)

        }
        return response
    }
)


Vue.config.productionTip = false

//注册nutui
import NutUI from '@nutui/nutui';
import '@nutui/nutui/dist/nutui.css';
NutUI.install(Vue);


//全局设置语言环境
import moment from "moment";
moment.locale('zh-cn');


//图片预览插件
import VueImageTouch from 'vue-image-touch';
Vue.use(VueImageTouch);


//导入自定义插件
import moreFunction from "./plugins/moreFunction";
//应用插件，注意必须在vm对象创建之前应用
Vue.use(moreFunction)

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app') //这里挂载的是 public/index.html 的id为app的 div
