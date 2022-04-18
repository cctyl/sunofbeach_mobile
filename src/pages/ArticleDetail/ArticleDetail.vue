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

                <!--分隔符-->
                <div class="line"></div>
                <!--文章评论-->
                <div class="review">

                    <div class="reviewHeader">
                        <span>评论({{commentList.length}})</span>
                        <span class="iconfont icon-edit">写评论</span>

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

                                <!--下面的子评论-->
                                <!--太长就不显示这么多-->
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
                                        </div>
                                    </div>
                                    <!--这里直接就给当前评论加上一个showMore属性，用来标记是否展示更多评论-->
                                    <span class="sub-see-more" @click="item.showMore=true">点击查看更多({{item.subComments.length-1}})</span>


                                </div>

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

            <span class="commentText left">
                <i class="iconfont icon-pinglun"></i>
                写评论
            </span>

            <div class="right">

                <span class="dianzan btn">
                    <i class="iconfont tubiao  icon-dianzan"></i>
                    <span class="desc">{{articleInfo.thumbUp}}</span>
                </span>
                <span class="collect btn">
                    <i class="iconfont tubiao icon-shoucang2"></i>
                    <span  class="desc">收藏</span>
                </span>

                <span class="share btn">
                    <i class="iconfont tubiao icon-fenxiang1"></i>
                    <span  class="desc">分享</span>
                </span>
            </div>

        </div>
    </div>

</template>

<script>
    import api from '../../api'
    import moment from 'moment'
    import 'github-markdown-css'
    import 'highlight.js/styles/default.css'
    import hljs from 'highlight.js'

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
            }
        },
        mounted() {
            //设置骨架屏的初始状态
            this.isLoading = true

            //得到传递过来的文章id
            this.id = this.$route.query.id
            //获取文章数据
            this.getArticleDetail()

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
             * 计算距离现在有多长时间
             */
            calcTime(timeStr) {
                let formatResult = moment(timeStr, "YYYY-MM-DD HH:mm").fromNow()
                if (formatResult=='Invalid date'){
                    return timeStr
                }else {
                    return formatResult
                }
            }

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
        border: 1px solid #fc5531;
        color: #fc5531;
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
        color: #fc5531;
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
        border: 1px solid #f15731;
        border-radius: 23px;
        color: #f15731;

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

    .dianzan, .collect, .share {

        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        margin-right: 10px;

    }
    .footerTool .btn .desc {
        width: 32px;
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
        color: #f15731;
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
</style>

