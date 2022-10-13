import moment from "moment";

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


        /**
         * 把sourceArr中包含的targetArr中的数据除去,然后合并
         * 前提条件：数组中对象必须是同一个格式
         * @param targetArr 旧数组
         * @param sourceArr 新获得的数组，里面包含旧数组的部分值
         * @param uniqueKey 唯一键
         */
        Vue.prototype.mergeTargetFromSource = function (targetArr,sourceArr,uniqueKey) {

            //数组不能为空，唯一键也不能为空
            if (!targetArr||targetArr.length===0
                ||!sourceArr||sourceArr.length===0
                || !uniqueKey
            ){
                return []
            }



            let obj = {}
            for (let i = 0; i < targetArr.length; i++) {
                obj[ targetArr[i][uniqueKey] ] = targetArr[i]
            }
            for (let i = 0; i < sourceArr.length; i++) {
                //如果拿着你的id去 obj 里找，找不到，说明原本的 this.recommendArticleList没有这个对象

                if (!obj[sourceArr[i][uniqueKey]]) {
                    targetArr.push(sourceArr[i])
                }
            }

            return targetArr

        }

        /**
         * 将YYYY-MM-DD HH:mm 格式的时间格式化，并计算距离现在有多久
         * @param timeStr
         * @returns {string|*}
         */
        Vue.prototype.calcTime= function(timeStr) {
            let formatResult = moment(timeStr, "YYYY-MM-DD HH:mm").fromNow()
            if (formatResult=='Invalid date'){
                return timeStr
            }else {
                return formatResult
            }
        }
    }
}
