<template>

    <nut-tab :is-scroll="true" position-nav="left" :wrapper-height="tabHeight" :def-index="currentTab"
             @tab-switch="tabSwitch"
    >
        <nut-tab-panel tab-title="回复我的">
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
                    <li class="mli" v-for="comment in msgList" :key="comment._id">

                        <div class="mItem">
                            <div class="mleft">

                                <img :src="comment.avatar"
                                     alt="">

                            </div>

                            <div class="mRight">
                                <div class="nickname">{{comment.nickname}}</div>
                                <div class="content">{{comment.content}}</div>
                                <div class="title">点击查看详情</div>
                            </div>
                        </div>


                        <div class="mBottom">
                            <span class="readStatus" :class="comment.hasRead==1?'read':''">{{comment.hasRead==1?'已阅':'未读'}}</span>
                            <div class="mTime">{{comment.publishTime}}</div>
                        </div>
                    </li>
                </div>
            </nut-scroller>
        </nut-tab-panel>

        <nut-tab-panel tab-title="给朕点赞">

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

                        <div class="mBottom">
                            <span class="readStatus" :class="thumbItem.hasRead==1?'read':''">{{thumbItem.hasRead==1?'已阅':'未读'}}</span>
                            <div class="mTime">{{thumbItem.thumbTime}}</div>
                        </div>

                    </li>

                </div>
            </nut-scroller>

        </nut-tab-panel>

        <nut-tab-panel tab-title="文章评论">

            <nut-scroller
                    type="vertical"
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
                            <span class="readStatus" :class="article.hasRead==1?'read':''">{{article.hasRead==1?'已阅':'未读'}}</span>
                            <div class="mTime">{{article.createTime}}</div>
                        </div>
                    </li>
                </div>
            </nut-scroller>


        </nut-tab-panel>

        <nut-tab-panel tab-title="动态评论">
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
                    <li class="mli" v-for="momentItem in msgList" :key="momentItem._id">

                        <div class="mItem">
                            <div class="mleft">

                                <img :src="momentItem.avatar"
                                     alt="">

                            </div>

                            <div class="mRight">
                                <div class="nickname">{{momentItem.nickname}}</div>
                                <span class="content">{{momentItem.content}}</span>

                                <div class="title">
                                    <span class="title-desc">评论了我的动态：</span>
                                    {{momentItem.title}}</div>


                            </div>
                        </div>

                        <div class="mBottom">
                            <span class="readStatus" :class="momentItem.hasRead==1?'read':''">{{momentItem.hasRead==1?'已阅':'未读'}}</span>
                            <div class="mTime">{{momentItem.createTime}}</div>
                        </div>

                    </li>

                </div>
            </nut-scroller>
        </nut-tab-panel>

        <nut-tab-panel tab-title="问题回答">
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
                    <li class="mli" v-for="wendaItem in msgList" :key="wendaItem._id">

                        <div class="mItem">
                            <div class="mleft">

                                <img :src="wendaItem.avatar"
                                     alt="">

                            </div>

                            <div class="mRight">
                                <div class="nickname">{{wendaItem.nickname}}</div>

                                <div class="title">
                                    <span class="title-desc">回答了朕的提问：</span>
                                    {{wendaItem.title}}
                                    <span class="title-desc">去看看问题解决了吗？</span>
                                </div>


                            </div>
                        </div>

                        <div class="mBottom">
                            <span class="readStatus" :class="wendaItem.hasRead==1?'read':''">{{wendaItem.hasRead==1?'已阅':'未读'}}</span>
                            <div class="mTime">{{wendaItem.createTime}}</div>
                        </div>

                    </li>

                </div>
            </nut-scroller>
        </nut-tab-panel>

        <nut-tab-panel tab-title="系统通知">
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
                    <li class="mli" v-for="sysItem in msgList" :key="sysItem._id">

                        <div class="mItem">

                            <div class="mRight">
                                <div>{{sysItem.title}}</div>

                                <!--系统消息是a标签，这里禁止点击，后续如果做了个人中心则将此处进行跳转-->
                                <div class="title" v-html="sysItem.content" @click.prevent="">
                                </div>


                            </div>
                        </div>

                        <div class="mBottom">
                            <div class="mTime">{{sysItem.publishTime}}</div>
                        </div>

                    </li>

                </div>
            </nut-scroller>
        </nut-tab-panel>
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
            this.currentTab = this.$route.query.type?this.$route.query.type* 1:0
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
                //请求结果
                let result = {}

                //不同的tab访问的api是不一样的，根据tab调用不同的接口即可
                switch (this.currentTab) {

                    case 0:{
                        //回复我的
                        result = await api.getAtMessage(page)
                        break
                    }
                    case 1:{
                        //点赞数据

                        result = await api.getThumbMessage(page)
                        break
                    }
                    case 2: {
                        //文章评论
                        result = await api.getArticleMessage(page)
                        break;
                    }
                    case 3:{
                        //动态评论
                        result = await api.getMomentMessage(page)
                        break
                    }
                    case 4:{
                        //问题回答
                        result = await api.getWendaMessage(page)
                        break
                    }
                    case 5:{
                        //系统通知
                        result = await api.getSystemMessage(page)
                        break
                    }


                }
                console.log(result)
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

                this.isUnMore = false
                this.isLoading = false
            },


            /**
             * 下拉刷新
             */
            pulldown() {

                this.isLoading = true

                //根据当前所在tab刷新数据
                this.getMsgData()


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
                this.getMsgData(++this.currentPage, true)


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

    .nut-tab-title-leftnav .nut-tab-active a{
        color: #1d7dfa!important;
    }
    .mli {
        width: 271px;
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
        line-height: 18px;
    }
    .mRight .title .title-desc{
        color: #000;
    }
    .mRight .thumbUpInfo{
        font-size: 16px;
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





</style>

<style>
    .nut-tab-title-leftnav .nut-tab-active a{
        color: #1d7dfa!important;
    }
</style>
