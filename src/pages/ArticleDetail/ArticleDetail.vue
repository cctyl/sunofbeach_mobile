<template>
    <div class="article">

        <!--标题栏-->
        <div class="title">
            <h1>
                <span class="tit">[Java安全]JDK8u191之后的JNDI注入绕过(javax.el.ELProcessor依赖)</span>
                <span class="type">原创</span>
            </h1>

        </div>

        <!--文章创建时间以及点赞数-->
        <div class="infobox">

            <nut-row>
                <nut-col :span="12">
                    <span class="time">2021-10-13 15:56:09</span>
                </nut-col>
                <nut-col :span="7">

                     <span class="viewCount ">
                        <i class="icon-chakan iconfont"></i>
                        220人看过
                     </span>
                </nut-col>

                <nut-col :span="5">

                    <span class="thumbUp ">
                        <i class="icon-dianzan iconfont"></i>
                        10点赞
                    </span>
                </nut-col>
            </nut-row>


        </div>

        <!-- 文章的作者信息-->
        <div class="author"></div>
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
            console.log(this.id)
            // this.getArticleDetail()
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
    .article {
        padding: 10px 18px 0;
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

</style>