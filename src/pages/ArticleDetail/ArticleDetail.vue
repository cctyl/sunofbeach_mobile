<template>
    <div>

        <nut-scroller
                :type="'vertical'"
        >
            <div slot="list" class="article">

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
                <div class="content" v-html="articleInfo.content"></div>



            </div>
        </nut-scroller>


        <!--底部工具栏-->

        <div class="footerTool">

            <span class="commentText left">
                <i class="iconfont icon-pinglun"></i>
                写评论
            </span>

            <span class="dianzan right">
                <i class="iconfont tubiao  icon-dianzan"></i>
                <span>{{articleInfo.thumbUp}}</span>
            </span>
            <span class="collect right">
                <i class="iconfont tubiao icon-shoucang"></i>
                <span>收藏</span>
            </span>

            <span class="share right">
                <i class="iconfont tubiao icon-fenxiang"></i>
                <span>分享</span>
            </span>
        </div>
    </div>

</template>

<script>
    import api from '../../api'

    export default {
        name: "ArticleDetail",
        data() {
            return {
                id: '',//文章id
                articleInfo: {}, //文章详情

            }
        },
        mounted() {
            this.id = this.$route.query.id
            this.getArticleDetail()
        },
        methods: {

            /**
             * 查询文章数据，id从data中取出
             * @returns {Promise<void>}
             */
            async getArticleDetail() {
                let result = await api.getArticleDetail(this.id)
                this.articleInfo = result.data
            }

        }
    }
</script>

<style scoped>
    .nut-scroller{
        height: calc(100vh - 40px)
    }
    .article {
        padding: 10px 18px 55px;

    }

    /*标题*/
    .article .title {
        min-height: 34px;
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
       margin-right: 40px;
    }

    .tubiao {
        font-size: 20px;
        margin-bottom: 5px;
    }

</style>

<style>


</style>