/*
通过操作mutations来操作state
 */
import api from '../api/index'

export default {

    /**
     * 设置最后一次的url
     * @param context
     * @param value
     */
    setLastUrl(context, value) {
        //commit
        context.commit('SET_LAST_URL', value)
    },

    /**
     * 存储用户信息
     * @param context
     * @param vc vue组件对象，用来弹出提示框
     */
    async setUserInfo(context,vc) {


        //先调用接口查询数据
        let checkTokenResult = await api.checkToken()

        //判断cookie是否超时了
        // {"success":false,"code":11126,"message":"账号未登录","data":null}
        if (!checkTokenResult.success) {
            //提示
            vc.$notify.warn("登录信息已过期，请重新登录")
            //超时了就清空原本的数据
            context.commit('SET_USER_INFO', null)
        } else {
            //没超时，正常存储
            let userInfo = checkTokenResult.data
            //commit
            context.commit('SET_USER_INFO', userInfo)
        }


    },

    /**
     * 设置msgBoxShow属性
     * @param context
     * @param value
     */
    setMsgBoxShow(context, value) {
        //commit
        context.commit('SET_MSG_BOX_SHOW', value)
    },

    /**
     * 设置navListShow属性
     * @param context
     * @param value
     */
    setNavListShow(context, value) {
        //commit
        context.commit('SET_NAV_LIST_SHOW', value)
    },

    /**
     * 清除用户数据
     * @param context
     * @param value
     */
    removeUserInfo(context){
        context.commit('SET_USER_INFO', null)
    },



}
