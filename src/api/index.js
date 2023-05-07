/*
    该文件封装了各个请求，调用接口时无需手动输入路径，直接调用此api的方法即可
    接口地址参考 https://www.sunofbeach.net/a/1403262826952323074
 */


import ajax from "./ajax";
import md5 from 'blueimp-md5'


export default {
    /**
     * 用户登录
     * @param phoneNum 手机号
     * @param password 密码，md5加密
     * @param captcha 验证码
     */
    login(phoneNum, password, captcha) {
        //这里需要引入md5加密
        // 安装 npm install blueimp-md5
        // 引入
        let md5Password = md5(password)

        return ajax(`/uc/user/login/${captcha}`, {
            phoneNum,
            password: md5Password
        }, 'POST')
    },

    /**
     * 根据手机号获取用户头像
     * @param phoneNum
     * @returns {Promise<unknown>}
     */
    getAvatarByPhone(phoneNum) {
        return ajax(`/uc/user/avatar/${phoneNum}`)

    },


    /**
     * 退出登录
     */
    logout() {
        return ajax(`/uc/user/logout`)
    },

    /**
     * 解析token，返回用户信息
     * 需要携带cookie
     */
    checkToken() {
        return ajax(`/uc/user/checkToken`)
    },


    /**
     * 手机注册时获得短信验证码
     * @param phoneNumber
     * @param verifyCode
     * @returns {Promise<unknown>}
     */
    getSmsForRegister(phoneNumber, verifyCode) {
        return ajax(`/uc/ut/forget/send-sms`, {
            phoneNumber,
            verifyCode
        }, 'POST')
    },

    /**
     * 校验短信验证码是否正确
     * @param phoneNumber
     * @param smsCode
     * @returns {Promise<unknown>}
     */
    checkSmsCode(phoneNumber, smsCode) {
        return ajax(`/uc/ut/check-sms-code/${phoneNumber}/${smsCode}`)
    },

    /**
     * 用户注册
     * @param smsCode
     * @param phoneNum
     * @param password
     * @param nickname
     * @returns {Promise<unknown>}
     */
    register(smsCode,
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
    },

    /**
     * 通过短信验证码修改密码
     * @param smsCode
     * @param phoneNum
     * @param password
     */
    updatePasswordBySms(smsCode, phoneNum, password) {

        return ajax(`/uc/user/forget/${smsCode}`, {
            phoneNum,
            password
        }, "PUT")
    },

    /**
     * 根据旧密码修改密码
     * @param oldPwd
     * @param newPwd
     * @param captcha
     */
    updatePassword({
                       oldPwd,
                       newPwd,
                       captcha
                   }) {
        return ajax(`/uc/user/modify-pwd`, {
            oldPwd,
            newPwd,
            captcha
        }, "PUT")
    },


    /**
     * 获取动态列表
     * @param topicId  话题Id，其中推荐为recommend，获取关注的为 follow 其他的则是话题的id
     * @param page
     */
    getMoyuList(topicId, page) {
        return ajax(`/ct/moyu/list/${topicId}/${page}`)
    },

    /**
     * 获取热门动态列表
     * @param size 数量
     */
    getHotMoyuList(size) {
        return ajax(`/ct/moyu/hot/${size}`)
    },


    /**
     * 给动态点赞
     * @param momentId
     */
    momentThumbUp(momentId) {

        return ajax(`/ct/moyu/thumb-up/${momentId}`, null, "PUT")
    },


    /**
     * 回复评论
     * @param content
     * @param momentId
     * @param targetUserId
     * @param commentId
     * @returns {Promise<unknown>}
     */
    subComment({
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
    },

    /**
     * 发表动态
     * @param content
     * @param topicId
     * @param images
     * @returns {Promise<unknown>}
     */
    publishMoyu({
                    content,
                    topicId,
                    images
                }) {
        return ajax(`/ct/moyu`, {
            content,
            topicId,
            images
        }, 'POST')
    },

    /**
     * 获取单条动态详情
     * @param momentId
     * @returns {Promise<unknown>}
     */
    getMoyuDetail(momentId) {
        return ajax(`/ct/moyu/${momentId}`)
    },

    /**
     * 获取首页热门摸鱼话题
     * @returns {Promise<unknown>}
     */
    getMoyuHotTopic() {
        return ajax(`/ct/moyu/topic/index`)
    },

    /**
     * 获取首页全部摸鱼话题
     * @returns {Promise<unknown>}
     */
    getMoyuAllTopic() {
        return ajax(`/ct/moyu/topic`)
    },



    /**
     * 关注话题
     * @param id
     * @returns {Promise<unknown>}
     */
    followTopic(id) {
        return ajax(`/ct/moyu/topic/follow/${id}`, null, 'POST')
    },


    /**
     * 取消关注话题
     * @param id
     * @returns {Promise<unknown>}
     */
    unfollwTopic(id) {
        return ajax(`/ct/moyu/topic/follow/${id}`, null, 'DELETE')
    },

    /**
     * 获取关注的话题列表
     * @returns {Promise<unknown>}
     */
    getFollwTopicList() {
        return ajax(`/ct/moyu/topic/follow`)
    },

    /**
     * 获取顶部分类，也就是tag列表
     */
    getCategoryList(){
        return ajax(`/ct/category/list`)
    },

    /**
     * 获得轮播图数据
     */
    getLoopList(){
        return ajax(`/ast/home/loop/list`)
    },

    /**
     *  获得推荐文章数据
     * @param page
     */
    getRecommendArticleList(page){
        return ajax(`/ct/content/home/recommend/${page}`)
    },


    /**
     * 根据categoryId查询文章数据
     * @param categoryId
     * @param page
     */
    getArticleListByCategoryId(categoryId,page){
        return ajax(`/ct/content/home/recommend/${categoryId}/${page}`)
    },

    /**
     * 查询文章详情
     * @param id
     */
    getArticleDetail(id){
        return ajax(`/ct/article/detail/${id}`)
    },


    /**
     * 获取文章评论
     * @param id
     * @returns {Promise | Promise<unknown>}
     */
    getArticleComment(articleId,page){
        return ajax(`/ct/article/comment/${articleId}/${page}`)
    },

    /**
     * 获取本人未读消息
     * 凭证存储在cookie当中了
     * @returns {Promise | Promise<unknown>}
     */
    getMsgCount() {
        return ajax(`/ct/msg/count`)
    },




    /**
     * 将消息全部已读
     */
    readAllMsg(){
        return ajax(`/ct/msg/read`)
    },


    /**
     * 获取文章评论列表
     */
    getArticleMessage(page=1){
        return ajax(`/ct/ucenter/message/article/${page}`)
    },

    /**
     * 获取动态评论列表
     */
    getMomentMessage(page=1){
        return ajax(`/ct/ucenter/message/moment/${page}`)
    },

    /**
     * 获取问答评论列表
     */
    getWendaMessage(page=1){
        return ajax(`/ct/ucenter/message/wenda/${page}`)
    },


    /**
     * 获取点赞评论列表
     */
    getThumbMessage(page=1){
        return ajax(`/ct/ucenter/message/thumb/${page}`)
    },


    /**
     * 获取系统通知列表
     */
    getSystemMessage(page=1){
        return ajax(`/ct/ucenter/message/system/${page}`)
    },

    /**
     * 获取被at的消息
     */
    getAtMessage(page=1){
        return ajax(`/ct/ucenter/message/at/${page}`)
    },

    /**
     * 文章点赞
     * @param articleId
     * @returns {Promise | Promise<unknown>}
     */
    articleThumbUp(articleId) {
        return ajax(`/ct/article/thumb-up/${articleId}`, null, "PUT")
    },
    /**
     * 检查文章点赞数，判断是否已经点赞
     * @param articleId
     */
    checkArticleThumbUp(articleId) {
        return ajax(`/ct/article/check-thumb-up/${articleId}`)
    },
    /**
     * 判断文章是否被收藏
     * @param articleUrl
     */
    checkArticleCollected(articleUrl) {
        return ajax(`/ct/favorite/checkCollected?url=${articleUrl}`)
    },

    /**
     * 获取收藏夹列表
     * @param page
     */
    getCollectList(page){

        return ajax(`/ct/collection/list/${page}`)
    },


    /**
     * 收藏文章
     * @param data
     */
    collectArticle(data){

        return ajax(`/ct/favorite`, data, 'POST')
    },

    /**
     * 取消收藏
     * @param collectId
     */
    cancelCollect(favoriteId) {
        return ajax(`/ct/favorite/${favoriteId}`, null, 'DELETE')
    },
    /**
     * 对文章评论
     * @param data
     */
    addArticleComment(data) {
        return ajax(`/ct/article/comment`, data, 'POST')
    },
    /**
     * 对文章下的评论进行回复
     * @param data
     * @returns {Promise | Promise<unknown>}
     */
    addArticleSubComment(data) {
        return ajax(`/ct/article/sub-comment`, data, 'POST')
    },

    /**
     * 获取摸鱼评论列表
     * @param momentId
     * @returns {Promise<unknown>}
     */
    getMoyuCommontList(momentId,page=1) {
        return ajax(`/ct/moyu/comment/${momentId}/${page}?sort=0`)
    },


    /**
     * 评论摸鱼动态
     * POST /ct/moyu/comment
     * comment: {
          momentId: '',
          content: ''
        }
     */
    sendMoyuComment(momentId,content){
        return ajax(`/ct/moyu/comment`, {
            momentId,
            content
        }, 'POST')
    }
}
