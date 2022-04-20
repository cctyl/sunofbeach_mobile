/*
    直接操作state的地方
 */
export default {


    SET_LAST_URL(state,value){

        //修改state
        state.lastUrl=value
    },

    SET_USER_INFO(state,value){

        //修改state
        state.userInfo=value
    },

    SET_MSG_BOX_SHOW(state,value){
        //修改state
        state.msgBoxShow=value
    },

    SET_NAV_LIST_SHOW(state,value){
        //修改state
        state.navListShow=value
    },

}
