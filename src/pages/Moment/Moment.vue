<template>
    <div class="container">
        <!--骨架屏-->
        <div v-if="isSkeletonLoading">

            <row padding="2px 20px 2px">
                <skeleton-square
                        width="355px"
                        height="20px"
                ></skeleton-square>

            </row>

            <row slot="list" padding="15px 20px 0">

                <skeleton-square
                        width="50px"
                        height="50px"
                >
                </skeleton-square>

                <column>
                    <skeleton-square
                            width="100px"
                            :count="1"
                            margin="5px 10px 5px"
                            height="20px"
                    ></skeleton-square>
                    <skeleton-square
                            width="140px"
                            :count="1"
                            margin="5px 10px 5px"
                            height="20px"
                    ></skeleton-square>
                </column>

            </row>

            <row slot="list" padding="15px 10px 0">


                <skeleton-square
                        width="350px"
                        :count="1"
                        margin="5px 10px 5px"
                        height="100px"
                ></skeleton-square>

            </row>

            <row slot="list" padding="2px 10px 0">


                <skeleton-square
                        width="165px"
                        :count="1"
                        margin="5px 10px 5px"
                        height="20px"
                ></skeleton-square>
                <skeleton-square
                        width="160px"
                        :count="1"
                        margin="5px 10px 5px"
                        height="20px"
                ></skeleton-square>
            </row>

            <row slot="list" padding="15px 20px 0">

                <skeleton-square
                        width="50px"
                        height="50px"
                >
                </skeleton-square>

                <column>
                    <skeleton-square
                            width="100px"
                            :count="1"
                            margin="5px 10px 5px"
                            height="20px"
                    ></skeleton-square>
                    <skeleton-square
                            width="140px"
                            :count="1"
                            margin="5px 10px 5px"
                            height="20px"
                    ></skeleton-square>
                </column>

            </row>

            <row slot="list" padding="15px 10px 0">


                <skeleton-square
                        width="350px"
                        :count="1"
                        margin="5px 10px 5px"
                        height="100px"
                ></skeleton-square>

            </row>

            <row slot="list" padding="2px 10px 0">


                <skeleton-square
                        width="165px"
                        :count="1"
                        margin="5px 10px 5px"
                        height="20px"
                ></skeleton-square>
                <skeleton-square
                        width="160px"
                        :count="1"
                        margin="5px 10px 5px"
                        height="20px"
                ></skeleton-square>
            </row>

            <row slot="list" padding="15px 20px 0">

                <skeleton-square
                        width="50px"
                        height="50px"
                >
                </skeleton-square>

                <column>
                    <skeleton-square
                            width="100px"
                            :count="1"
                            margin="5px 10px 5px"
                            height="20px"
                    ></skeleton-square>
                    <skeleton-square
                            width="140px"
                            :count="1"
                            margin="5px 10px 5px"
                            height="20px"
                    ></skeleton-square>
                </column>

            </row>

            <row slot="list" padding="15px 10px 0">


                <skeleton-square
                        width="350px"
                        :count="1"
                        margin="5px 10px 5px"
                        height="100px"
                ></skeleton-square>

            </row>

            <row slot="list" padding="2px 10px 0">


                <skeleton-square
                        width="165px"
                        :count="1"
                        margin="5px 10px 5px"
                        height="20px"
                ></skeleton-square>
                <skeleton-square
                        width="160px"
                        :count="1"
                        margin="5px 10px 5px"
                        height="20px"
                ></skeleton-square>
            </row>


        </div>

        <template v-else>
            <!--标签栏-->
            <nut-scroller class="tagScroll">

                <div slot="list" class="tagItem nut-hor-list-item " :class="{tagCurrent: currentTag==-1}"
                     @click="changeTag(-1,'recommend')"
                >
                    <span class="tagTitle">推荐</span>
                </div>

                <div slot="list" class="tagItem nut-hor-list-item " :class="{tagCurrent: currentTag==index}"
                     v-for="(item,index) in categoryList" :key="item.id"
                     @click="changeTag(index,item)"
                >
                    <span class="tagTitle">{{item.topicName}}</span>
                </div>

            </nut-scroller>

            <div class="line"></div>
            <nut-scroller

                    ref="mynutscroller"

                    :scrollTo="scrollY"
                    type="vertical"
                    class="totalScroll"
                    @loadMore="loadMoreVert"
                    @pulldown="pulldown"
                    @scrollChange="scrollChange"
                    :is-un-more="isUnMore"
                    :is-loading="isLoading"
                    @scrollToCbk="scrollToCbk"
                    unloadMoreTxt="加载中"
            >
                <div slot="list" class="moment-list">


                    <div v-for="item in momentList" :key="item.id">
                        <li class="moment-item">

                            <div class="header">
                                <div class="avatar">
                                    <img v-lazy="{
                                        src:item.avatar,
                                        loading:require('../../assets/img/loading.png')}"
                                         alt="">
                                </div>
                                <div class="userinfo">
                                    <div class="nickname">{{item.nickname}}</div>
                                    <div class="desc">
                                        <div class="post">砖块开发 @无业</div>
                                        <div class="dot">·</div>
                                        <div class="publish-time">{{calcTime(item.createTime)}}</div>
                                    </div>
                                </div>

                            </div>
                            <div class="middle">
                                <div class="content" v-html="item.content">

                                </div>
                                <div class="img-list">

                                    <img v-lazy="{
                                        src:img,
                                        loading:require('../../assets/img/loading.png')}" v-for="img in item.images" :key="img">
                                </div>

                                <div class="topic" v-if="item.topicName">
                                    <i class="iconfont icon-topic">{{item.topicName}}</i>
                                </div>

                            </div>
                            <div class="action">


                                <i class="action-btn iconfont icon-dianzan" :class="{active:idIsContainMe(item.thumbUpList)}"><span style="padding: 0px 5px">{{item.thumbUpCount}}</span></i>

                                <i class="action-btn iconfont icon-pinglunxiao" >
                                    <span style="padding: 0px 5px">{{item.commentCount}}</span>
                                </i>
                                <i class="action-btn iconfont icon-fenxiang1"></i>
                            </div>
                        </li>
                        <div class="line"></div>
                    </div>



                </div>


            </nut-scroller>

        </template>

    </div>
</template>

<script>
    import api from '../../api/index'

    export default {
        name: "Moment",
        data() {
            return {
                isSkeletonLoading: true,//标识骨架屏是否展示
                isUnMore: false,//对于滑动组件，是否没有更多数据
                isLoading: false,//是否正在下拉刷新数据
                currentTag: -1,//记录当前是哪个tag被选中了
                categoryList: [], //顶部标签数组
                currentTagId: 'recommend',//记录当前被选中的tagid
                currentPage: 1, //当前所在页码
                scrollY: 0, //页面要滚动到哪个位置，是负数
                currentScroll: 0,//现在滚动到哪了
                scrollElem: {},//正在滚动的容器
                imgList: [],//emoji图片列表
                momentList: [],//动态列表
                toast:{},//提示框对象
            }
        },
        created() {
            const files = require.context("@/assets/img/emoji", true, /\.*\.jpg|png$/).keys()
            this.imgList = []
            for (let i = 0; i < files.length; i++) {

                //去掉路径前面的 .  ./img13.png ---> /img13.png
                let currentImgPath = files[i].slice(1)

                //只传递路劲字符串是无法引用的，必须用require
                this.imgList.push(require("../../assets/img/emoji" + currentImgPath))

            }
        },
        mounted() {
            //展示骨架屏
            this.isSkeletonLoading = true
            this.getMoYuList();
            this.getMomentTopicList()
        },
        methods: {

            /**
             * 获取动态话题列表
             */
            async getMomentTopicList() {
                let allTopicResult = await api.getMoyuAllTopic()
                let hotTopicResult = await api.getMoyuHotTopic()
                let allTopicList = allTopicResult.data


                //从allTopicList中找到hotTopicList的数据
                //为什么要这么做呢，是因为hotTopicList中数据格式和allTopicList中数据格式不一致
                let hotTopicIds = hotTopicResult.data.map(currentValue => currentValue.id)


                //在allTopicList中的hotTopic
                let hotInAll = []

                //去除了hotTopic的剩余topic
                let hotNotInAll = []

                //分类
                allTopicList.forEach(item => {
                    if (hotTopicIds.includes(item.id)) {
                        hotInAll.push(item)
                    } else {
                        hotNotInAll.push(item)
                    }
                })

                //将hotInAll插入到hotNotInAll前面
                this.categoryList = hotInAll.concat(hotNotInAll)


            },

            /**
             * 获取动态列表
             * @param topicId  话题Id，其中推荐为recommend，获取关注的为 follow
             * @param page     为页码，从1开始
             * @param isMerge  合并还是更像数据，用于无缝加载以及下拉刷新
             */
            async getMoYuList(topicId = 'recommend', page = 1, isMerge = false) {


                let result = await api.getMoyuList(topicId, page)
                if (isMerge) {
                    this.momentList = this.mergeTargetFromSource(this.momentList, result.data.list, 'id')
                } else {
                    this.momentList = result.data.list
                }

                //关闭骨架屏
                this.isSkeletonLoading = false

                this.isUnMore = false
                this.isLoading = false
                if (this.toast.hide){

                    this.$nextTick(() => {
                        this.toast.hide();
                    })
                }

            },


            /**
             * 上拉加载更多
             */
            loadMoreVert() {
                this.isUnMore = true
                this.getMoYuList(this.currentTagId,++this.currentPage, true)

                this.toast  =  this.$toast.loading('加载中...',{
                    duration:3000,
                    id:'momentLoading'
                });

            },

            /**
             * 下拉刷新
             */
            pulldown() {
                console.log("下拉")
                this.isLoading = true
                this.getMoYuList(this.currentTagId,1, false)

            },

            /**
             * 页面滚动时的回调
             */
            scrollChange(scrollY) {

                this.currentScroll = scrollY
                if ((-scrollY) > 200) {
                    this.isShowBacktop = true
                } else {
                    this.isShowBacktop = false

                }
            },

            /**
             * 滚动到指定位置后的回调
             * 可以不写内容，但似乎不能没有
             */
            scrollToCbk() {
                console.log("scrollToCbk")
            },

            /**
             * 切换标签页的回调
             * @param tagIndex
             */
            changeTag(tagIndex, tagItem) {
                this.currentTag = tagIndex

                //如果不是推荐页，那么这个tagItem是有值的
                if (tagItem) {
                    this.currentTagId = tagItem.id


                } else {
                    //如果是推荐页，那么将currentTagId置为recommend
                    this.currentTagId = 'recommend'
                }

                this.getMoYuList(this.currentTagId, 1, false)
            },

            /**
             * 判断用户id列表中是否包含我的id
             * @param userIdList
             */
            idIsContainMe(userIdList){
                if (userIdList.includes(this.$store.state.userInfo.id)){
                   return true
                }
                return false
            },

        }

    }
</script>

<style scoped>
    .totalScroll {
        height: calc(100vh - 59px);
    }

    /*---------------标签栏 ---------------*/
    .tagScroll {
        white-space: nowrap;
        height: 40px;
    }

    .tagItem {
        box-sizing: border-box;

        height: 40px;
        line-height: 40px;
        text-align: center;

        font-weight: bold;
        font-size: 15px;
        margin: 0 10px;
        color: #8a919f;
    }

    /*当前被选中的tag*/
    .tagCurrent {
        border-bottom: 2px solid #1e80ff;
        margin-bottom: 1px;
        color: #1e80ff;

    }


    /*---------------分隔符 ---------------*/
    .line {
        background-color: #f4f5f5;
        width: 100%;
        height: 8px;
    }

    /*---------------动态详情 ---------------*/

    .moment-item {
        padding: 20px 20px 0;
        margin-bottom: 8px;
    }

    .moment-item .header {
        display: flex;
        flex-direction: row;
    }

    .moment-item .header .avatar {
        width: 3rem;
        height: 3rem;
    }

    .moment-item .header .avatar img {
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
    }

    .moment-item .header .userinfo {
        margin-left: 12px;
        width: 158px;
        height: 50px;
    }

    .moment-item .header .userinfo .nickname {
        font-size: 16px;
        line-height: 28px;
        font-weight: 500;
        color: #252933;
    }

    .moment-item .header .userinfo .desc {
        display: flex;
        flex-direction: row;
        font-size: 12px;
        line-height: 20px;
        color: #8a919f;
    }

    .moment-item .header .userinfo .desc .dot {
        margin: 0 0.5em;
    }


    .moment-item .middle {
        margin: 8px 24px 0 18px;
    }

    .moment-item .middle .content {
        font-size: 14px;
        color: #17181a;
        overflow: hidden;
        line-height: 20px;
    }

    .moment-item .middle .img-list {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 10px;
    }

    .moment-item .middle .img-list img {
        margin-right: 4px;
        margin-top: 4px;
        width: calc(43.33333% - 2.66667px);
    }

    .moment-item .middle .topic {
        margin: 12px 0px 12px;
        width: fit-content;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 2px 6px;
        background-color: #eaf2ff;
        font-size: 12px!important;
        height: 25px;
        line-height: 20px;
        color: #1e80ff;
        border-radius: 50px;
    }

    .moment-item .action {
        display: flex;
        height: 36px;
        border-top: 1px solid #e4e6eb;
    }

    .moment-item .action .action-btn {
        flex: 1;
        text-align: center;
        color: #86909c;
        line-height: 40px;



    }
    .moment-item .action .action-btn ::before{
        margin-right: 2px;
    }

    .moment-item .action .active{
        color: #0084ff!important;
    }

</style>
