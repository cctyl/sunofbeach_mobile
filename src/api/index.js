/*
    该文件封装了各个请求，调用接口时无需手动输入路径，直接调用此api的方法即可
    接口地址参考 https://www.sunofbeach.net/a/1403262826952323074
 */


import ajax from "./ajax";
import md5 from 'blueimp-md5'


/**
 * 用户登录
 * @param phoneNum 手机号
 * @param password 密码，md5加密
 * @param captcha 验证码
 */
function login(phoneNum, password, captcha) {
    //这里需要引入md5加密
    // 安装 npm install blueimp-md5
    // 引入

    let md5Password = md5(password)

    return ajax(`/uc/user/login/${captcha}`, {
        phoneNum,
        password: md5Password
    }, 'POST')
}

/**
 * 根据手机号获取用户头像
 * @param phoneNum
 * @returns {Promise<unknown>}
 */
function getAvatarByPhone(phoneNum) {
    return ajax(`/uc/user/avatar/${phoneNum}`)

}


/**
 * 退出登录
 */
function logout() {
    return ajax(`/uc/user/logout`)
}

/**
 * 解析token，返回用户信息
 * 需要携带cookie
 */
function checkToken() {
    return ajax(`/uc/user/checkToken`)
}


/**
 * 手机注册时获得短信验证码
 * @param phoneNumber
 * @param verifyCode
 * @returns {Promise<unknown>}
 */
function getSmsForRegister(phoneNumber, verifyCode) {
    return ajax(`/uc/ut/forget/send-sms`, {
        phoneNumber,
        verifyCode
    }, 'POST')
}

/**
 * 校验短信验证码是否正确
 * @param phoneNumber
 * @param smsCode
 * @returns {Promise<unknown>}
 */
function checkSmsCode(phoneNumber, smsCode) {
    return ajax(`/uc/ut/check-sms-code/${phoneNumber}/${smsCode}`)
}

/**
 * 用户注册
 * @param smsCode
 * @param phoneNum
 * @param password
 * @param nickname
 * @returns {Promise<unknown>}
 */
function register(smsCode,
                  {
                      phoneNum,
                      password,
                      nickname
                  }) {


    return ajax(`/uc/user/register/${smsCode}`, {
        phoneNum,
        password,
        nickname
    }, 'POST')
}

/**
 * 通过短信验证码修改密码
 * @param smsCode
 * @param phoneNum
 * @param password
 */
function updatePasswordBySms(smsCode, phoneNum, password) {

    return ajax(`/uc/user/forget/${smsCode}`, {
        phoneNum,
        password
    }, "PUT")
}

/**
 * 根据旧密码修改密码
 * @param oldPwd
 * @param newPwd
 * @param captcha
 */
function updatePassword({
                            oldPwd,
                            newPwd,
                            captcha
                        }) {
    return ajax(`/uc/user/modify-pwd`, {
        oldPwd,
        newPwd,
        captcha
    }, "PUT")
}


/**
 * 获取动态列表
 * @param topicId  话题Id，其中推荐为recommend，获取关注的为 follow 其他的则是话题的id
 * @param page
 */
function getMoyuList(topicId, page) {
    return ajax(`/ct/moyu/list/${topicId}/${page}`)
}

/**
 * 获取热门动态列表
 * @param size 数量
 */
function getHotMoyuList(size) {
    return ajax(`/ct/moyu/hot/${size}`)
}

/**
 * 获得动态的评论
 * @param momentId
 * @param page
 * @param sort
 * @returns {Promise<unknown>}
 */
function getComment(momentId, page, sort) {
    return ajax(`/ct/moyu/comment/${momentId}/${page}?sort=${sort}`)
}

/**
 * 给动态点赞
 * @param momentId
 */
function thumbUp(momentId) {

    return ajax(`/ct/moyu/thumb-up/${momentId}`, null,"PUT")
}

/**
 * 给某个动态评论
 * @param momentId
 * @param content
 */
function comment({
                     momentId,
                     content
                 }) {

    return ajax(`/ct/moyu/comment`, {

        momentId,
        content

    }, 'POST')
}

/**
 * 回复评论
 * @param content
 * @param momentId
 * @param targetUserId
 * @param commentId
 * @returns {Promise<unknown>}
 */
function subComment({
                        content,
                        momentId,
                        targetUserId,
                        commentId
                    }) {

    return ajax(`/ct/moyu/sub-comment`, {

        content,
        momentId,
        targetUserId,
        commentId

    }, 'POST')
}

/**
 * 发表动态
 * @param content
 * @param topicId
 * @param images
 * @returns {Promise<unknown>}
 */
function publishMoyu({
                         content,
                         topicId,
                         images
                     }) {
    return ajax(`/ct/moyu`, {
        content,
        topicId,
        images
    }, 'POST')
}

/**
 * 获取单条动态详情
 * @param momentId
 * @returns {Promise<unknown>}
 */
function getMoyuDetail(momentId) {
    return ajax(`/ct/moyu/${momentId}`)
}

/**
 * 获取首页摸鱼话题
 * @returns {Promise<unknown>}
 */
function getMoyuTopic() {
    return ajax(`/ct/moyu/topic/index`)
}

/**
 * 获得话题列表
 * @returns {Promise<unknown>}
 */
function getMoyuTopicList() {
    return ajax(`/ct/moyu/topic`)
}

/**
 * 关注话题
 * @param id
 * @returns {Promise<unknown>}
 */
function followTopic(id) {
    return ajax(`/ct/moyu/topic/follow/${id}`, null,'POST')
}


/**
 * 取消关注话题
 * @param id
 * @returns {Promise<unknown>}
 */
function unfollwTopic(id) {
    return ajax(`/ct/moyu/topic/follow/${id}`, null, 'DELETE')
}

/**
 * 获取关注的话题列表
 * @returns {Promise<unknown>}
 */
function getFollwTopicList() {
    return ajax(`/ct/moyu/topic/follow`)
}

export default {
    login,
    getAvatarByPhone,
    logout,
    checkToken,
    getSmsForRegister,
    checkSmsCode,
    register,
    updatePasswordBySms,
    updatePassword,
    getMoyuList,
    getHotMoyuList,
    getComment,
    thumbUp,
    comment,
    subComment,
    publishMoyu,
    getMoyuDetail,
    getMoyuTopic,
    getMoyuTopicList,
    followTopic,
    unfollwTopic,
    getFollwTopicList
}