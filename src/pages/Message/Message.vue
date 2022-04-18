<template>

    <nut-tab :is-scroll="true" position-nav="left" :wrapper-height="tabHeight" :def-index="currentTab"
             @tab-switch="tabSwitch"
    >
        <nut-tab-panel tab-title="文章">

            <nut-scroller
                    :type="'vertical'"
                    :is-un-more="isUnMore"
                    :is-loading="isLoading"
                    @pulldown="pulldown"
                    unloadMoreTxt="到底了"
                    @loadMore="loadMoreVert"
                    :init-data="msgList"

            >


                <div slot="list">
                    <li class="mli" v-for="article in msgList" :key="article._id">

                        <div class="mItem">
                            <div class="mleft">

                                <img :src="article.avatar"
                                     alt="">

                            </div>

                            <div class="mRight">
                                <div class="nickname">{{article.nickname}}</div>
                                <div class="content">{{article.content}}</div>
                                <div class="title">{{article.title}}</div>


                            </div>
                        </div>


                        <div class="mBottom">
                            <div class="mType">@我</div>
                            <span class="readStatus" :class="article.hasRead==1?'read':''">{{article.hasRead==1?'已阅':'未读'}}</span>
                            <div class="mTime">{{article.createTime}}</div>
                        </div>
                    </li>

                </div>
            </nut-scroller>


        </nut-tab-panel>
        <nut-tab-panel tab-title="点赞">

            <nut-scroller
                    :type="'vertical'"
                    :is-un-more="isUnMore"
                    :is-loading="isLoading"
                    @pulldown="pulldown"
                    unloadMoreTxt="到底了"
                    @loadMore="loadMoreVert"
                    :init-data="msgList"

            >


                <div slot="list">
                    <li class="mli" v-for="thumbItem in msgList" :key="thumbItem._id">

                        <div class="mItem">
                            <div class="mleft">

                                <img :src="thumbItem.avatar"
                                     alt="">

                            </div>

                            <div class="mRight">
                                <div class="nickname">{{thumbItem.nickname}}</div>
                                <span class="thumbUpInfo">给朕的内容点赞：</span>
                                <div class="title">{{thumbItem.title}}</div>


                            </div>
                        </div>


                    </li>

                </div>
            </nut-scroller>

        </nut-tab-panel>
        <nut-tab-panel tab-title="@朕">页签3</nut-tab-panel>
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
                currentTab: 0, //当前所在tab
                tabHeight: 600,//tab的高度
                msgList: [],// 数据列表，通用
                isUnMore: false,//对于滑动组件，是否没有更多数据
                isLoading: false,//是否正在下拉刷新数据
                currentPage: 1,//当前所在页码数
                totalPages: 1,//评论的总页数，用于判断是否还有下一页
            }
        },
        created() {
            this.currentTab = this.$route.query.type * 1
            //设置整个tab的高度
            this.tabHeight = document.body.scrollHeight * 0.89
        },
        mounted() {
            //根据当前所在tab的索引，刷新数据
            this.tabSwitch(this.currentTab)


        },
        methods: {

            /**
             * 获取消息列表，具体调用什么api取决于当前所在tab
             * @param page 当前页码数
             * @param isMerge 是否将新数据和并到旧数据中
             *
             */
            async getMsgData(page = 1, isMerge = false) {


                //不同的tab访问的api是不一样的，所以在这里先判断一下是哪个tab，再做额外处理
                switch (this.currentTab) {
                    //这里加大括号是为了限制变量的作用域，否则第二个case会受到第一个case的变量名的影响
                    case 0: {
                        //文章评论
                        let result = await api.getArticleMessage(page)

                        //取出评论列表
                        let msgList = result.data.content

                        //取出总页数
                        this.totalPages = result.data.totalPages

                        if (isMerge) {
                            //合并之前和现在的数据
                            //合并之前，涉及到一个去重问题
                            let obj = {}
                            for (let i = 0; i < this.msgList.length; i++) {
                                obj[this.msgList[i]._id] = this.msgList[i]
                            }
                            for (let i = 0; i < msgList.length; i++) {
                                //如果拿着你的id去 obj 里找，找不到，说明原本的 this.msgList没有这个对象

                                if (!obj[msgList[i].id]) {
                                    this.msgList.push(msgList[i])
                                } else {
                                    // console.log('不会被添加')
                                }
                            }
                        } else {
                            //更新数据
                            this.msgList = msgList
                        }

                        break;
                    }
                    case 1:{
                        //点赞数据

                        let result = await api.getThumbMessage(page)
                        console.log(result)
                        break
                    }
                    case 2:{
                        //@我的
                        let result = await api.getAtMessage(page)
                        console.log(result)
                        break
                    }

                    case 3:{
                        //动态评论
                        let result = await api.getMomentMessage(page)
                        console.log(result)
                        break
                    }

                    case 4:{
                        //问题
                        let result = await api.getWendaMessage(page)
                        console.log(result)
                        break
                    }

                    case 5:{
                        //通知

                        let result = await api.getSystemMessage(page)
                        console.log(result)
                        break
                    }


                }


            },


            /**
             * 下拉刷新
             */
            pulldown() {

                this.isLoading = true

                //根据当前所在tab刷新数据
                switch (this.currentTab) {
                    case 0:
                        //刷新@我板块
                        this.getMsgData()
                        break;
                }
                clearTimeout(this.timer)

                this.timer = setTimeout(() => {
                    this.isLoading = false
                }, 300)
            },


            /**
             * 上拉加载更多
             */
            loadMoreVert() {
                //判断是否还有下一页
                if (this.currentPage >= this.totalPages) {
                    //如果当前页码已经大于 或者等于最大页码数，那就不加载下一页
                    // console.log("到底了")
                    this.isUnMore = true
                    return
                }

                this.isUnMore = true


                //根据当前所在tab刷新数据
                switch (this.currentTab) {
                    case 0:
                        //刷新@我板块下一页
                        this.getMsgData(++this.currentPage, true)
                        break;
                }

                clearTimeout(this.timer)
                this.timer = setTimeout(() => {
                    this.isUnMore = false
                }, 300)

            },

            /**
             * 切换了tab
             */
            tabSwitch(val) {
                //更新tab索引
                this.currentTab = val;

                //切换后刷新数据
                this.getMsgData()

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

        margin-top: 20px;
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
        font-size: 16px;

    }

    .mRight .content {
        font-size: 16px;
        line-height: 1.5;
    }

    .mRight .title {

        margin-top: 10px;
        font-size: 14px;
        color: #406599;
    }


    .mBottom {

        margin-top: 16px;
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


    .nut-scroller {
        height: calc(100vh - 100px);


    }

    .thumbUpInfo{
        font-size: 14px;
    }


</style>
