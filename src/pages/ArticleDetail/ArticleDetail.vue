<template>
    <div>

        <nut-scroller
                :type="'vertical'"
        >
            <div slot="list" v-if="isLoading">
                <row padding="15px 10px 0">
                    <skeleton-square
                            width="360px"
                            height="10px"
                            :count="2"
                    ></skeleton-square>

                </row>

                <row slot="list" padding="15px 10px 0">
                    <skeleton-circle
                            diameter="50px"
                    >
                    </skeleton-circle>

                    <column>
                        <skeleton-square
                                width="300px"
                                :count="2"
                                margin="5px 10px 5px 10px"
                        ></skeleton-square>

                    </column>


                </row>


                <row slot="list" padding="15px 10px 0">


                    <column>
                        <skeleton-square
                                width="350px"
                                :count="15"
                                margin="10px 10px 10px 10px"
                        ></skeleton-square>

                    </column>


                </row>

            </div>


            <div v-else slot="list" class="article">

                <!--标题栏-->
                <div class="title">
                    <h1>
                        <span class="tit">{{articleInfo.title}}</span>
                        <span class="type">{{articleInfo.articleType==0?'原创':'转载'}}</span>
                    </h1>

                </div>

                <!--文章创建时间以及点赞数-->
                <div class="infobox">

                    <nut-row>
                        <nut-col :span="12">
                            <span class="time">{{articleInfo.createTime}}</span>
                        </nut-col>
                        <nut-col :span="7">

                             <span class="viewCount ">
                                <i class="icon-chakan iconfont"></i>
                                {{articleInfo.viewCount}}人看过
                             </span>
                        </nut-col>

                        <nut-col :span="5">

                            <span class="thumbUp ">
                                <i class="icon-dianzan iconfont"></i>
                                 {{articleInfo.thumbUp}}点赞
                            </span>
                        </nut-col>
                    </nut-row>


                </div>

                <!-- 文章的作者信息-->
                <div class="author">

                    <nut-row>
                        <nut-col :span="3">
                            <div class="imgBox">
                                <img :src="articleInfo.avatar" alt="">
                            </div>
                        </nut-col>
                        <nut-col :span="16">
                            <div class="authorDetail">
                                <p class="authorTop">
                                    <span class="authorName"> {{articleInfo.nickname}}</span>
                                    <!--是否为vip，若为vip则添加vip类名-->
                                    <span class="isVip vip iconfont icon-vip"></span>
                                </p>
                                <p class="authorBottom">
                                    <span>{{articleInfo.categoryName}}</span>
                                </p>
                            </div>
                        </nut-col>
                        <nut-col :span="5">
                            <div class="focuson">关注</div>
                        </nut-col>
                    </nut-row>

                </div>


                <!--  文章内容-->
                <div class="content markdown-body sob-article-content" v-html="articleInfo.content"></div>





                <!--文章评论-->
                <div class="review">

                    <div class="reviewHeader">
                        <span>评论({{commentList.length}})</span>
                        <span class="iconfont icon-edit" @click="openCommentPanel(false)">写评论</span>

                    </div>

                    <!--评论列表-->
                    <div class="reviewList" >
                        <div class="reviewItem" v-for="item in commentList" :key="item._id">
                            <!--评论人头像-->
                            <div class="left">
                                <img :src="item.avatar">
                            </div>

                            <div class="reviewRight">
                                <!--评论人信息，点赞-->
                                <div class="top">
                                    <span class="reviewNikename">{{item.nickname}}</span>
                                    <span >{{item.publishTime}}</span>
                                </div>
                                <!--评论内容-->
                                <div class="reviewBottom">{{item.commentContent}}</div>

                                <!--回复评论的按钮-->
                                <div class="comment-btn">
                                    <span
                                        @click="openCommentPanel(true,item)"
                                    >回复</span>
                                </div>

                                <!--下面的子评论-->
                                <!--只有一条回复就直接展示-->
                                <div v-if="item.subComments.length===1">
                                    <div class="subcomment">
                                        <!--评论人头像-->
                                        <div class="subleft">
                                            <img :src="item.subComments[0].yourAvatar">
                                        </div>

                                        <div class="subreviewRight">
                                            <!--评论人信息，点赞-->
                                            <div class="subtop">
                                                <span class="subreviewNikename">{{item.subComments[0].yourNickname}}</span>
                                                <span >{{item.subComments[0].publishTime}}</span>
                                            </div>
                                            <!--评论内容-->
                                            <p class="subreviewBottom">
                                                {{item.subComments[0].beNickname? '回复 '+item.subComments[0].beNickname+':':'' }}
                                                {{item.subComments[0].content}}
                                            </p>
                                            <!--回复评论的按钮-->
                                            <div class="comment-btn">

                                                <span @click="openCommentPanel(true,item.subComments[0])">回复</span>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <!--有一条以上，但是没有做展开，就只显示一条，并添加展开按钮-->
                                <div v-if="item.subComments.length>1 && !item.showMore">
                                    <div class="subcomment">
                                        <!--评论人头像-->
                                        <div class="subleft">
                                            <img :src="item.subComments[0].yourAvatar">
                                        </div>

                                        <div class="subreviewRight">
                                            <!--评论人信息，点赞-->
                                            <div class="subtop">
                                                <span class="subreviewNikename">{{item.subComments[0].yourNickname}}</span>
                                                <span >{{item.subComments[0].publishTime}}</span>
                                            </div>
                                            <!--评论内容-->
                                            <p class="subreviewBottom">
                                                {{item.subComments[0].beNickname? '回复 '+item.subComments[0].beNickname+':':'' }}
                                                {{item.subComments[0].content}}
                                            </p>
                                            <!--回复评论的按钮-->
                                            <div class="comment-btn">
                                                <span  @click="openCommentPanel(true,item.subComments[0])">回复</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!--这里直接就给当前评论加上一个showMore属性，用来标记是否展示更多评论-->
                                    <span class="sub-see-more" @click="item.showMore=true">点击查看更多({{item.subComments.length-1}})</span>
                                </div>

                                <!--有一条以上，并点击了展开按钮，就显示全部-->
                                <div v-if="item.subComments.length>1 && item.showMore">
                                    <div class="subcomment" v-for="subitem in item.subComments" :key="subitem._id">
                                        <!--评论人头像-->
                                        <div class="subleft">
                                            <img :src="subitem.yourAvatar">
                                        </div>

                                        <div class="subreviewRight">
                                            <!--评论人信息，点赞-->
                                            <div class="subtop">
                                                <span class="subreviewNikename">{{subitem.yourNickname}}</span>
                                                <span >{{subitem.publishTime}}</span>
                                            </div>
                                            <!--评论内容-->
                                            <p class="subreviewBottom">
                                                {{subitem.beNickname? '回复 '+subitem.beNickname+':':'' }}
                                                {{subitem.content}}
                                            </p>
                                            <!--回复评论的按钮-->
                                            <div class="comment-btn">
                                                <span  @click="openCommentPanel(true,subitem)">回复</span>
                                            </div>
                                        </div>


                                    </div>
                                    <!--这里直接就给当前评论加上一个showMore属性，用来标记是否展示更多评论-->
                                    <span class="sub-see-more" @click="item.showMore=false">收起</span>

                                </div>
                            </div>
                        </div>

                        <div class="reviewItem" v-show="commentList.length==0">
                            <div class="noComment ">
                              <i class="iconfont icon-meiyoushuju"></i>  暂无评论~~
                            </div>
                        </div>
                    </div>

                </div>


            </div>
        </nut-scroller>


        <!--底部工具栏-->
        <div class="footerTool">
            <!--
               <span class="commentText left">
                    <i class="iconfont icon-pinglun"></i>
                    写评论
                </span>
            -->
            <div class="right">

                <span class="dianzan btn" @click="thumbUp">
                    <i class="iconfont tubiao  "
                       :class="isThumbUp?'icon-dianzan_kuai':'icon-dianzan'"
                       :style="isThumbUp?'color: #007fff;':''"
                    ></i>
                    <span class="desc">{{articleInfo.thumbUp}}</span>
                </span>
                <span class="collect btn" @click="openCollectList">
                    <i class="iconfont tubiao "
                       :class="isCollect?'icon-shoucang3':'icon-shoucang2'"
                       :style="isCollect?'color: #007fff;':''"
                    ></i>
                    <span class="desc">收藏</span>
                </span>

                <span class="share btn">
                    <i class="iconfont tubiao icon-fenxiang1"></i>
                    <span class="desc" @click="shareArticle">分享</span>
                </span>
            </div>

        </div>

        <!--弹出层-收藏夹列表-->
        <nut-popup position="bottom"
                   closeable
                   close-icon="cross"
                   v-model="showCollectList"
                   :style="{ height: '50%' }"
                   close-icon-position="top-right">


                <div  class="nut-vert-list-panel">

                    <div class="collect-item" v-for="item in collectList" :key="item._id" >
                        <div class="item-left">
                            <img :src="item.cover" alt="">
                        </div>

                        <div class="item-center">

                            <div class="above">
                                {{item.name}}

                            </div>
                            <div class="under">
                                <span class="collect-perm iconfont icon-jiesuo">{{item.permission==="0"?'公开':'隐藏'}}</span>
                                <span class="collect-length">{{item.favoriteCount}}条内容</span>
                            </div>
                        </div>

                        <div class="item-right">

                            <span class="collect-btn collected" v-if="isCollect" @click="cancelCollect">取消收藏</span>
                            <span class="collect-btn" @click="collectArticle(item._id)" v-else>收藏</span>

                        </div>


                    </div>

                </div>



        </nut-popup>

        <!--弹出层-评论框-->
        <nut-popup
                   position="top"
                   v-model="showCommentPanel"
                   >

            <!--评论填写框-->
            <nut-textbox
                    class="comment-input"
                    v-model="commentStr"
                    :place-text="commentPlaceText"
                    :max-num="300"
                    :txt-area-h="80"
            ></nut-textbox>
            <nut-button
                    type="light"
                    @click="submitComment"
                    color="#fff"
                    class="comment-submit-btn"
                    block
            >
                提交
            </nut-button>

        </nut-popup>
    </div>

</template>

<script>
    import api from '../../api'
    import 'github-markdown-css'
    import 'highlight.js/styles/default.css'
    import hljs from 'highlight.js'
    import easyCopy from "../../util/easyCopy";


    const highlightCode = () => {
        const preEl = document.querySelectorAll('pre')
        preEl.forEach((el) => {
            hljs.highlightBlock(el)
        })
    }
    export default {
        name: "ArticleDetail",
        data() {
            return {
                id: '',//文章id
                articleInfo: {}, //文章详情
                isLoading: true,//是否正在加载数据，用于标识 骨架屏的展示
                commentPage: 1,//评论页数
                commentList: [],//评论数据
                isThumbUp:false,//是否点赞
                isCollect:false,//是否收藏
                favoriteId:'',//收藏夹id
                showCollectList:false,//是否展示收藏夹列表
                collectList:[],//收藏夹列表
                currentPage: 1, //收藏夹列表当前所在页码
                showCommentPanel:false,//是否展示评论弹窗
                commentStr:"",//评论内容
                isSubComment:false,//是否是回复评论-用于评论弹窗提交
                commentPlaceText:'说说你的想法吧',//评论回复框中的提示文字
                subCommentInfo:{},//将要回复的评论的相关信息
            }
        },
        mounted() {
            //设置骨架屏的初始状态
            this.isLoading = true

            //得到传递过来的文章id
            this.id = this.$route.query.id

            //获取文章数据
            this.getArticleDetail()

            //获取点赞数据
            this.checkThumbUp()

            //有用户数据才检测
            if (this.$store.state.userInfo){
                //判断是否已收藏
                this.checkCollected()
            }


            //获取评论数据
            this.getCommentList()

            //高亮语法
            highlightCode();


        },
        updated() {
            highlightCode();
        },
        methods: {

            /**
             * 查询文章数据，id从data中取出
             * @returns {Promise<void>}
             */
            async getArticleDetail() {
                let result = await api.getArticleDetail(this.id)
                this.articleInfo = result.data
                this.$nextTick(() => {
                    this.isLoading = false
                })
            },

            /**
             * 获取评论数据
             */
            async getCommentList() {
                let commentResult = await api.getArticleComment(this.id, this.commentPage)

                //对时间进行一下处理
                let commentList = commentResult.data.content.map(item => {

                    item.publishTime = this.calcTime(item.publishTime)
                    item.showMore =false
                    if (item.subComments){
                        for (let i = 0; i <item.subComments.length ; i++) {
                            item.subComments[i].publishTime =  this.calcTime(item.subComments[i].publishTime)
                        }
                    }
                    return item
                })
                this.commentList = commentList
            },



            /**
             * 给当前文章点赞
             */
            async thumbUp(){

                //先判断是否登录
                if (!this.isLogin()){
                    return
                }


                if (this.isThumbUp){
                    //如果已经点赞，不做操作
                    return ;
                }

                await api.articleThumbUp(this.id)

                //点赞后更新点赞数
                this.checkThumbUp()
            },

            /**
             * 获取点赞数据并检查是否点赞
             * @returns {Promise<void>}
             */
            async checkThumbUp(){
                let {code,data} = await api.checkArticleThumbUp(this.id)

                if (code===10000){
                    //已经点赞
                    this.isThumbUp = true
                }
                //赋值点赞数
                this.articleInfo.thumbUp = data
            },

            /**
             * 检测文章是否已经点赞
             * @returns {Promise<void>}
             */
            async checkCollected(){
                //拼接获取该文章的主站url。
                //主站url= https://www.sunofbeach.net/a/ + 文章id
                let articleUrl = `https://www.sunofbeach.net/a/${this.id}`


                let {data} =  await api.checkArticleCollected(articleUrl)
                if (data !== "0"){

                    //已收藏
                    this.favoriteId = data
                    this.isCollect = true
                }
            },

            /**
             * 展示收藏夹列表
             */
            openCollectList(){
                //先判断是否登录
                if (!this.isLogin()){
                    return
                }
                this.showCollectList=true
                this.getCollectList(this.currentPage,false)
            },

            /**
             * 获取收藏夹列表
             */
            async getCollectList(page,isMerge){



                let result = await api.getCollectList(page)
                let list = result.data.content

                if (isMerge) {
                    //合并之前和现在的数据
                    //合并之前，涉及到一个去重问题
                    let obj = {}
                    for (let i = 0; i < this.collectList.length; i++) {
                        obj[this.collectList[i]._id] = this.collectList[i]
                    }
                    for (let i = 0; i < list.length; i++) {
                        //如果拿着你的id去 obj 里找，找不到，说明原本的 this.recommendArticleList没有这个对象
                        if (!obj[list[i]._id]) {
                            this.collectList.push(list[i])
                        } else {
                            // console.log(result.data.list[i].name + '不会被添加')
                        }
                    }
                } else {
                    //更新数据
                    this.collectList = list
                }


            },


            /**
             * 将当前文章添加到收藏夹
             * @param collectId
             */
            async collectArticle(collectionId){

                /*
                    拼接数据
                    {
                         "collectionId":"898237351115664256",
                         "title":"阳光沙滩API文档",
                         "url":"https://www.sunofbeach.net/a/1403262826952323074",
                         "type":"0",
                         "cover":""
                    }

                 */
                let data = {
                    collectionId:collectionId,
                    title:this.articleInfo.title,
                    url: this.getArticleOnPcUrl(),
                    type:"0"
                }

                let result =  await api.collectArticle(data)
                if (result.code ===10000){
                    this.$notify.success('收藏成功！');
                    //成功之后要收起收藏夹列表
                    this.showCollectList=false

                    //更新图标
                    this.isCollect=true

                    //重新获取收藏的id
                    this.checkCollected()

                }else {
                    this.$notify.danger('收藏失败！');
                }
            },

            /**
             * 将当前文章取消收藏
             * @returns {Promise<void>}
             */
            async cancelCollect(){
                let result =  await api.cancelCollect(this.favoriteId)
                if (result.code===10000){
                    this.$notify.success(result.message)
                    //成功之后要收起收藏夹列表
                    this.showCollectList=false

                    //更新图标
                    this.isCollect = false
                }else {
                    this.$notify.danger(result.message)
                }
            },

            /**
             * 分享文章。将主站的文章链接拷贝到内存中
             */
            shareArticle(){
                //生成链接
                let url = this.getArticleOnPcUrl()

                //复制到剪切板
                easyCopy(url)

                //提示
                this.$notify.success("链接已复制到剪切板，快去分享把！")
            },

            /**
             * 获取文章的主站链接
             */
            getArticleOnPcUrl(){
                return `https://www.sunofbeach.net/a/${this.id}`
            },

            /**
             * 提交评论
             */
            async submitComment(){

                if (this.isSubComment){
                    //回复评论
                    let data = {
                        articleId: this.id,
                        parentId: this.subCommentInfo.parentId==="0"?this.subCommentInfo._id:this.subCommentInfo.parentId,
                        beUid: this.subCommentInfo.yourUid || this.subCommentInfo.userId,
                        beNickname: this.subCommentInfo.yourNickname || this.subCommentInfo.nickname,
                        content: this.commentStr
                    }

                    console.log( this.subCommentInfo)
                    console.log(data)

                    let result = await api.addArticleSubComment(data)
                    if (result.code===10000){
                        this.$notify.success(result.message)

                        //清空评论框
                        this.commentStr=''
                        //关闭弹窗
                        this.showCommentPanel=false

                        //获取评论列表
                        this.getCommentList()

                    }else {
                        this.$notify.warn(result.message)
                    }
                }else {
                    //给文章评论
                    let data = {
                        parentId: '0',
                        articleId: this.id,
                        commentContent: this.commentStr,
                    }

                    let result = await api.addArticleComment(data)
                    if (result.code===10000){
                        this.$notify.success(result.message)

                        //清空评论框
                        this.commentStr=''
                        //关闭弹窗
                        this.showCommentPanel=false
                        //获取评论列表
                        this.getCommentList()


                    }else {
                        this.$notify.warn(result.message)
                    }
                }


            },

            /**
             * 展示评论填写框
             */
            openCommentPanel(isSubComment,commentObj){
                if (!this.isLogin()){
                    return
                }
                //清空旧数据
                this.commentStr = ""

                //更新标记，回复对象不同，接口不一致
                this.isSubComment = isSubComment
                this.subCommentInfo = commentObj

                if (this.isSubComment){
                    //回复评论时，需要携带一些参数 A lonely cat  回复 @ccTyL
                    let beReplayUserName = commentObj.yourNickname || commentObj.nickname
                    this.commentPlaceText=`回复 @${beReplayUserName}`
                }else {
                    this.commentPlaceText="说说你的看法吧！"
                }

                this.showCommentPanel=true
            },

        }

    }
</script>

<style scoped>
    .nut-scroller {
        height: calc(100vh - 40px);


    }

    .article {
        padding: 10px 18px 55px;

    }

    /*标题*/
    .article .title {
        min-height: 34px;
        background-color: #fff;
    }

    .article .title .tit {
        line-height: 34px;
        letter-spacing: 1px;
        font-size: 23px;
        font-weight: 500;

    }

    .article .title .type {
        display: inline-block;
        font-size: 12px;
        background-color: #ecf5ff;
        color: #409eff;
        margin-top: 8px;
        vertical-align: top;
        padding: 4px 5px;
        border-radius: 5px;
        margin-left: 10px;

    }


    /* 文章信息*/
    .infobox {
        background-color: #fff;
        margin-top: 12px;

        font-size: 12px;
    }

    .infobox .time {
        color: #999aaa;
        height: 22px;
        line-height: 22px;
    }

    .infobox .thumbUp, .viewCount {
        border-radius: 11px;
        border: 1px solid #007fff;
        color: #007fff;
        padding: 2px 8px;
    }

    /*    文章作者信息*/
    .author {
        margin-top: 10px;
        background-color: #fff;
    }

    .imgBox img {
        border-radius: 50%;
        width: 37px;
        height: 37px;
    }

    .authorDetail {
        height: 37px;
        display: flex;
        flex-direction: column;
    }

    .authorTop .authorName {
        font-size: 20px;
    }

    .authorTop .isVip {
        margin-left: 10px;
    }

    .vip {
        color: #007fff;
    }


    .authorBottom {
        margin-top: 8px;
        font-size: 12px;
        color: #666;
    }


    .focuson {

        text-align: center;
        line-height: 33px;
        vertical-align: middle;
        width: 72px;
        height: 32px;
        border: 1px solid #007fff;
        border-radius: 23px;
        color: #007fff;

    }

    /*文章详情*/
    .content {
        background-color: #fff;
        padding: 15px 10px;
        height: 100%;
        width: 100%;
        overflow: hidden;
    }

    .content image {
        width: 100%;
    }

    /*底部工具栏*/
    .footerTool {
        height: 53px;
        width: 100%;
        display: flex;
        padding-left: 10px;
        position: fixed;
        bottom: 0;
        background-color: #fff;
        border-top: 1px solid #ccc;

    }


    .commentText {
        margin: 10px 0;

        width: 180px;
        background-color: #f4f4f4;
        border-radius: 10px;
        text-align: left;

        height: 35px;
        line-height: 35px;
        padding-left: 10px;
        color: #bebfc9;
        margin-right: 20px;
    }

    .commentText .icon-pinglun {
        font-size: 22px;
    }

    .right .dianzan, .collect, .share {

        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        margin-right: 10px;


    }


    .footerTool .btn .desc {
        width: 32px;
        color: #8a93a0;
    }
    .nut-button.light{
        background-color: #1d7dfa!important;
        border: none;
        box-shadow: 0 0 8px 4px rgb(56 142 255 / 16%);
    }

    .right{

        display: flex;
        flex: 1;
        justify-content: space-around;
    }


    .dianzan{
        font-size: 12px;
    }
    .tubiao {
        font-size: 20px;
        margin-bottom: 5px;
    }


    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }


    .image-wrap img {
        max-width: 100%;
    }

    .sob-article-content {
        max-width: 100%;
    }

    .sob-article-content pre code {
        max-width: 100%;
    }

    /*img 设置max-width有效*/
    .sob-article-content img {
        margin-top: 10px;
        max-width: 100%;
        cursor: zoom-in;
    }

    /* 大于等于750px作用，同理max-width为小于等于下作用 不同屏幕的特殊处理，下面是例子 */
    @media (min-width: 750px) {
        .title {
            font-size: 24px;
        }
    }

    @media (max-width: 750px) {
        .summary {
            font-size: 14px;
        }
    }

    /*分割线*/
    .line {
        background-color: #f5f6f7;
        width: 100%;
        height: 10px;
    }

    /*文章评论*/
    .review {


        padding: 10px;


    }

    .reviewHeader {
        display: flex;
        justify-content: space-between;
        font-size: 16px;

        margin-bottom: 10px;
    }

    .reviewHeader :nth-child(2) {
        color: #007fff;
    }

    .reviewItem {

        display: flex;
        flex-direction: row;
        font-size: 15px;

    }

    .reviewItem .left {
        margin-top: 10px;
        width: 45px;


    }

    .reviewItem .left img {
        width: 45px;
        height: 45px;
        border-radius: 50%;

    }

    .reviewItem .reviewRight {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        margin-top: 10px;
    }

    .reviewItem .reviewRight .top {
        display: flex;
        justify-content: space-between;
    }

    .reviewItem .reviewRight .reviewBottom{
        margin-top: 10px;
        line-height: 25px;
    }

    /*子评论*/
    .reviewItem .reviewRight .subcomment{

        margin: 15px 0 5px 20px;
        display: flex;
        font-size: 13px;
    }

    .subleft img{
        width: 25px;
        height: 25px;
        border-radius: 50%;
    }

    .subreviewRight{
        flex: 1;
        margin-left: 5px;

    }
    .subreviewRight .subtop{
      display: flex;
      justify-content: space-between;

    }
    .subreviewRight .subtop .subreviewNikename{




    }
    .subreviewBottom{
        margin-top: 5px;
        line-height: 20px;
    }

    .sub-see-more{
        margin-left: 20px;
        color: #409eff;
    }

    .noComment{
        margin-top: 20px;
        width: 100%;
        text-align: center;
    }
    .noComment i{
        font-size: 18px;
    }

    /*收藏夹弹窗相关*/
    .nut-vert-list-panel{
        padding: 30px 5px 0 10px;
        width: 100%;

    }

    .nut-vert-list-panel .collect-item{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding-top: 10px;

    }
    .nut-vert-list-panel .collect-item .item-left{
    }

    .nut-vert-list-panel .collect-item .item-left img{
        width: 60px;
        height: 60px;

    }

    .nut-vert-list-panel .collect-item .item-center{
        padding-left: 15px;
        flex: 1;
    }

    .nut-vert-list-panel .collect-item .item-center .above{
        height: 40px;
    }

    .nut-vert-list-panel .collect-item .item-center .under{
        font-size: 13px!important;
    }
    .collect-perm{
        font-size: 13px!important;
    }
    .collect-length{
        margin-left: 15px;
    }


    .nut-vert-list-panel .collect-item .item-right{
        width: 111px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .nut-vert-list-panel .collect-item .item-right .collect-btn{

        padding: 10px 5px;
        text-align: center;
        border: 1px solid #dcdfe6;
        border-radius: 2px;

    }
    .collected{
        color: #0084ff;
    }


    /*评论填写框相关*/
    .comment-input{
        margin-top: 10px;
        height: 100px;
    }

    .comment-btn{
        margin-top: 2px;
    }
    .reviewRight .comment-btn span{

        float: right;
        color: #007fff;
        font-size: 13px;
    }

</style>

