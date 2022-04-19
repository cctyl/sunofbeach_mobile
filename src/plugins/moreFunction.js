/**
 * 这是一个插件
 * 是为了提供一些全局方法而定义的
 */
export default {
    //这个install方法会被调用，并且传入 Vue构造函数
    install(Vue) {

        //往原型上定义方法
        Vue.prototype.isLogin = function (vc) {
            let userInfo = vc.$store.state.userInfo
            if (!userInfo){
                //不存在，说明没有登录，展示提示，然后跳转到登录页面
                vc.$notify.warn("未登录，即将跳转到登录页面...")
                setTimeout(()=>{
                    vc.$router.push("/login")
                },1000)

                return false
            }
            return true

        }
    }
}
