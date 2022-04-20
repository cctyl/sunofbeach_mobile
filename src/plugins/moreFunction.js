/**
 * 这是一个插件
 * 是为了提供一些全局方法而定义的
 */
export default {
    //这个install方法会被调用，并且传入 Vue构造函数
    install(Vue) {

        /**
         * 判断是否登录，未登录则跳转到登录页面
         * @returns {boolean}
         */
        Vue.prototype.isLogin = function () {
            let userInfo = this.$store.state.userInfo
            if (!userInfo){
                //不存在，说明没有登录，展示提示，然后跳转到登录页面
                this.$notify.warn("未登录，即将跳转到登录页面...")
                setTimeout(()=>{
                    this.$router.push("/login")
                },1000)

                return false
            }
            return true

        }

        /**
         * 关闭导航栏以及消息列表
         */
        Vue.prototype.closeNavMsg = function () {
            this.$store.dispatch('setMsgBoxShow',false)
            this.$store.dispatch('setNavListShow',false)

        }
    }
}
