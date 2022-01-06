<template>

    <nut-tab  :is-scroll="true" position-nav="left" :wrapper-height="tabHeight" :def-index="0">
        <nut-tab-panel tab-title="@朕">

            <ul>
                <li class="mli" v-for="article in articleMsgList" :key="article._id">

                    <div class="mItem">
                        <div class="mleft">

                            <img src="https://imgs.sunofbeaches.com/group1/M00/00/07/rBsADV22ZymAV8BwAABVL9XtNSU926.png"
                                 alt="">

                        </div>

                        <div class="mRight">
                            <div class="nickname">拉大锯</div>
                            <div class="content">你的21号文章我还没弄，电脑坏了，等寄回来我再恢复。</div>
                            <div class="title">24.阳光沙滩-移动端Vue教程-用户消息盒子结构

                            </div>


                        </div>
                    </div>


                    <div class="mBottom">
                        <div class="mType">@我</div>
                        <span class="readStatus read">已阅</span>
                        <div class="mTime">2021-11-17 09:45</div>
                    </div>
                </li>

                <li class="mli">

                    <div class="mItem">
                        <div class="mleft">

                            <img src="https://imgs.sunofbeaches.com/group1/M00/00/07/rBsADV22ZymAV8BwAABVL9XtNSU926.png"
                                 alt="">

                        </div>

                        <div class="mRight">
                            <div class="nickname">拉大锯</div>
                            <div class="content">你的21号文章我还没弄，电脑坏了，等寄回来我再恢复。</div>
                            <div class="title">24.阳光沙滩-移动端Vue教程-用户消息盒子结构

                            </div>


                        </div>
                    </div>


                    <div class="mBottom">
                        <div class="mType">@我</div>
                        <span class="readStatus read">已阅</span>
                        <div class="mTime">2021-11-17 09:45</div>
                    </div>
                </li>
            </ul>


        </nut-tab-panel>
        <nut-tab-panel tab-title="点赞">页签2</nut-tab-panel>
        <nut-tab-panel tab-title="文章">页签3</nut-tab-panel>
        <nut-tab-panel tab-title="动态">页签4</nut-tab-panel>
        <nut-tab-panel tab-title="问题">页签5</nut-tab-panel>
        <nut-tab-panel tab-title="通知">页签6</nut-tab-panel>
    </nut-tab>


</template>

<script>
    import api from '../../api/index'

    export default {
        name: "Message",
        data() {
            return {
                currentTab: 1, //当前所在tab
                tabHeight: 600,//tab的高度
                articleMsgList:[],// 文章评论列表
            }
        },
        created() {
            this.currentTab = this.$route.query.type
            //设置整个tab的高度
            this.tabHeight = document.body.scrollHeight * 0.89
        },
        mounted() {

            this.getArticleMessage(1)

        },
        methods: {

            /**
             * 获取文章评论列表
             * @param page
             */
            async getArticleMessage(page = 1) {

                let result = await api.getArticleMessage(page)
                let articleMsgList =  result.data.content
                this.articleMsgList = articleMsgList

            },


        }
    }
</script>

<style scoped>
    .tab {
        height: 100%;
    }

    .nut-tab {
        height: 80%;
    }


    .mli {

        margin-top: 30px;
        padding-bottom: 20px;
        border-bottom: 1px solid #ccc;
    }

    .mItem {
        display: flex;
        font-size: 18px;
    }

    .mleft img {

        width: 40px;
        height: 40px;
        border-radius: 50%;
    }

    .mRight {
        padding-left: 10px;
        display: flex;
        flex-direction: column;

    }

    .mRight .nickname {
        margin-bottom: 10px;
        font-weight: bold;

    }

    .mRight .content {
        font-size: 16px;
    }

    .mRight .title {

        margin-top: 10px;
        font-size: 14px;
        color: #406599;
    }


    .mBottom {

        margin-top: 15px;
        display: flex;
        justify-content: space-between;
        font-size: 15px;
    }

    .mBottom .readStatus {
        padding: 2px 5px 2px 5px;
        color: #fff;
        font-size: 12px;
        border-radius: 10%;
        background-color: #f56c6c;

        height: 20px;
        text-align: center;
        line-height: 20px;
    }

    .mBottom .read {
        background-color: #e6a23c;
    }

    .mType {

        width: 46px;
        height: 22px;
        text-align: center;
        line-height: 22px;
        border: 1px solid #ccc;
        font-size: 13px;
        color: #636363;
        border-radius: 10%;
    }

    .mTime {
        height: 22px;
        line-height: 22px;
        align-self: end;
    }


</style>
