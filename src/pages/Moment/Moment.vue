<template>
    <div class="container">
        <!--骨架屏-->
        <div v-if="isSkeletonLoading" class="vue-skeleton-loading">
            <div class="skeleton-bac-animation"></div>
            <div>
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


        </div>

        <template v-else>
            <!--标签栏-->
            <nut-scroller class="tagScroll"
                          :scrollTo="tagScrollY"
                          @scrollToCbk="tagScrollToCbk"
            >

                <div slot="list" class="tagItem nut-hor-list-item " :class="{tagCurrent: currentTag==-1}"
                     @click="changeTag(-1,'recommend')"
                >
                    <span class="tagTitle">推荐</span>
                </div>

                <div slot="list" class="tagItem nut-hor-list-item "
                     v-if="$store.state.userInfo"
                     :class="{tagCurrent: currentTag==-2}"
                     @click="changeTag(-2,'follow')"
                >
                    <span class="tagTitle">关注</span>
                </div>

                <div slot="list" class="tagItem nut-hor-list-item "
                     :ref="'tagScroll'+index"
                     :class="{tagCurrent: currentTag==index}"
                     v-for="(item,index) in categoryList" :key="item.id"
                     @click="changeTag(index,item.id)"
                >
                    <span class="tagTitle">{{item.topicName}}</span>
                </div>

            </nut-scroller>

            <div class="line"></div>
            <nut-scroller

                    ref="mynutscroller"

                    :scrollTo="momentListScrollY"
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

                                    <img :src="item.avatar" alt="">
                                </div>
                                <div class="userinfo">
                                    <div class="nickname">{{item.nickname}}</div>
                                    <div class="desc">
                                        <div class="post">{{item.company?item.company:'无业'}}
                                            @{{item.position?item.position:'正在定位中'}}
                                        </div>
                                        <div class="dot">·</div>
                                        <div class="publish-time">{{item.createTime}}</div>
                                    </div>
                                </div>

                            </div>
                            <div class="middle">

                                <!--动态内容-->
                                <div class="content" v-html="item.content">

                                </div>

                                <!--图片列表-->
                                <div class="img-list" v-if="item.images.length>0">


                                    <div
                                            @click="showBigImg(item.images,index)"
                                            v-for="(img,index) in item.images" :key="img"
                                            class="bg-img"
                                            v-bind:style="{backgroundImage:`url('${img}')`}">
                                    </div>

                                </div>

                                <!--分享的链接-->
                                <div class="link-box" v-if="item.linkUrl">
                                    <a @click="toArticlePage(item.linkUrl)">

                                        <!--如果这个链接有封面-->
                                        <div class="link-cover"
                                             v-if="item.linkCover"
                                             v-bind:style="{backgroundImage:`url('${item.linkCover})`}"
                                        >
                                        </div>

                                        <!--没有封面的情况下-->
                                        <div class="link-cover-default"
                                             v-else
                                        >
                                            <i class="iconfont icon-link"></i>
                                        </div>

                                        <div class="link-info">
                                            <div class="link-title">{{item.linkTitle?item.linkTitle:'-'}}</div>
                                            <div class="link-domain">{{item.linkHost}}</div>
                                        </div>
                                    </a>
                                </div>


                                <div class="topic" v-if="item.topicName" @click="clickToTopic(item.topicId)">
                                    <i class="iconfont icon-topic">{{item.topicName}}</i>
                                </div>

                            </div>
                            <div class="action">

                                <i class="action-btn iconfont icon-dianzan"
                                   :class="{active:item.thumbUpActive}"
                                   @click="thumbUpMoment(item)"
                                >
                                    <span style="padding: 0px 5px">{{item.thumbUpCount}}</span></i>

                                <i class="action-btn iconfont icon-pinglunxiao" @click="openCommontList(item)">
                                    <span style="padding: 0px 5px">{{item.commentCount}}</span>
                                </i>
                                <i class="action-btn iconfont icon-fenxiang1"></i>

                            </div>
                            <!--评论列表-->
                            <div v-if="item.showCommont" class="reviewList" >
                                <div class="commentInput">
                                    <!--评论填写框-->
                                    <nut-textbox
                                            class="inputBox"
                                            v-model="item.commentStr"
                                            :max-num="300"
                                            :txt-area-h="80"
                                    ></nut-textbox>
                                    <button  disabled="disabled" class="submit-btn">发表评论</button>
                                </div>
                                <div class="reviewItem" v-for="currentComment in item.commentList" :key="currentComment.id">
                                    <!--评论人头像-->
                                    <div class="left">
                                        <img :src="currentComment.avatar">
                                    </div>

                                    <div class="reviewRight">
                                        <!--评论人信息，点赞-->
                                        <div class="top">
                                            <span class="reviewNikename">{{currentComment.nickname}}</span>
                                            <span >{{currentComment.createTime}}</span>
                                        </div>
                                        <!--评论内容-->
                                        <div class="reviewBottom">{{currentComment.content}}</div>

                                        <!--回复评论的按钮-->
                                        <div class="comment-btn">
                                           <!--
                                           todo
                                           <span
                                                @click="openCommentPanel(true,item)"
                                             >回复</span>-->
                                            <span>回复</span>
                                        </div>

                                        <!--下面的子评论-->
                                        <!--只有一条回复就直接展示-->
                                        <div class="subcommentBox" v-if="currentComment.subComments.length===1">
                                            <div class="subcomment">
                                                <!--评论人头像-->
                                                <div class="subleft">
                                                    <img :src="currentComment.subComments[0].avatar">
                                                </div>

                                                <div class="subreviewRight">
                                                    <!--评论人信息，点赞-->
                                                    <div class="subtop">
                                                        <span class="subreviewNikename">{{currentComment.subComments[0].nickname}}</span>
                                                        <span >{{currentComment.subComments[0].createTime}}</span>
                                                    </div>
                                                    <!--评论内容-->
                                                    <p class="subreviewBottom">
                                                        {{currentComment.subComments[0].nickname? '回复 '+currentComment.nickname+':':'' }}
                                                        {{currentComment.subComments[0].content}}
                                                    </p>
                                                    <!--回复评论的按钮-->
                                                    <div class="comment-btn">
                                                        <!--todo-->
                                                        <!--<span @click="openCommentPanel(true,item.subComments[0])">回复</span>-->
                                                        <span>回复</span>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                        <!--有一条以上，但是没有做展开，就只显示一条，并添加展开按钮-->
                                        <div class="subcommentBox" v-if="currentComment.subComments.length>1 && !currentComment.showMore">
                                            <div class="subcomment">
                                                <!--评论人头像-->
                                                <div class="subleft">
                                                    <img :src="currentComment.subComments[0].avatar">
                                                </div>

                                                <div class="subreviewRight">
                                                    <!--评论人信息，点赞-->
                                                    <div class="subtop">
                                                        <span class="subreviewNikename">{{currentComment.subComments[0].nickname}}</span>
                                                        <span >{{currentComment.subComments[0].createTime}}</span>
                                                    </div>
                                                    <!--评论内容-->
                                                    <p class="subreviewBottom">
                                                        {{currentComment.subComments[0].nickname? '回复 '+currentComment.subComments[0].nickname+':':'' }}
                                                        {{currentComment.subComments[0].content}}
                                                    </p>
                                                    <!--回复评论的按钮-->
                                                    <div class="comment-btn">
                                                        <!--todo-->
                                                        <!--<span @click="openCommentPanel(true,item.subComments[0])">回复</span>-->
                                                        <span>回复</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <!--这里直接就给当前评论加上一个showMore属性，用来标记是否展示更多评论-->
                                            <span class="sub-see-more" @click="currentComment.showMore=true">点击查看更多({{currentComment.subComments.length-1}})</span>
                                        </div>

                                        <!--有一条以上，并点击了展开按钮，就显示全部-->
                                        <div class="subcommentBox" v-if="currentComment.subComments.length>1 && currentComment.showMore">
                                            <div class="subcomment" v-for="subitem in currentComment.subComments" :key="subitem.id">
                                                <!--评论人头像-->
                                                <div class="subleft">
                                                    <img :src="subitem.avatar">
                                                </div>

                                                <div class="subreviewRight">
                                                    <!--评论人信息，点赞-->
                                                    <div class="subtop">
                                                        <span class="subreviewNikename">{{subitem.nickname}}</span>
                                                        <span >{{subitem.createTime}}</span>
                                                    </div>
                                                    <!--评论内容-->
                                                    <p class="subreviewBottom">
                                                        {{subitem.nickname? '回复 '+subitem.nickname+':':'' }}
                                                        {{subitem.content}}
                                                    </p>
                                                    <!--回复评论的按钮-->
                                                    <div class="comment-btn">
                                                        <span  >回复</span>
                                                    </div>
                                                </div>


                                            </div>
                                            <!--这里直接就给当前评论加上一个showMore属性，用来标记是否展示更多评论-->
                                            <span class="sub-see-more" @click="currentComment.showMore=false">收起</span>

                                        </div>
                                    </div>
                                </div>

                                <div class="reviewItem" v-show="item.commentList&&item.commentList.length==0">
                                    <div class="noComment ">
                                        <i class="iconfont icon-meiyoushuju"></i>  暂无评论~~
                                    </div>
                                </div>
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
    import {parseDomain, fromUrl} from "parse-domain";
    import Vue from 'vue'
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
                momentListScrollY: 0, //摸鱼列表部分要滚动到哪个位置，是负数
                tagScrollY: 0, //话题部分要滚动到哪个位置，是负数
                currentScroll: 0,//现在滚动到哪了
                scrollElem: {},//正在滚动的容器
                imgList: [],//emoji图片列表
                momentList: [],//动态列表
                toast: {},//提示框对象
                scrollTo: 0,//标签跳转值
            }
        },
        // created() {
        //     const files = require.context("@/assets/img/emoji", true, /\.*\.jpg|png$/).keys()
        //     this.imgList = []
        //     for (let i = 0; i < files.length; i++) {
        //
        //         //去掉路径前面的 .  ./img13.png ---> /img13.png
        //         let currentImgPath = files[i].slice(1)
        //
        //         //只传递路劲字符串是无法引用的，必须用require
        //         this.imgList.push(require("../../assets/img/emoji" + currentImgPath))
        //
        //     }
        // },
        mounted() {
            //展示骨架屏
            this.isSkeletonLoading = true
            this.getMoYuList();

            this.getMomentTopicList()
        },
        methods: {


            /**
             * 话题部分的滚动回调
             * 滚动到指定位置后的回调
             * 可以不写内容，但似乎不能没有
             */
            tagScrollToCbk() {
                console.log("tagScrollToCbk")
            },

            /**
             * 摸鱼动态部分的滚动回调
             */
            scrollToCbk() {
                console.log("scrollToCbk")
            },

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
                let sourceList = result.data.list

                //对集合进行处理，比如时间，是否点赞，域名等
                for (let i = 0; i < sourceList.length; i++) {


                    let item = sourceList[i]

                    //为什么不用原本的thumbUpCount而要覆盖呢？
                    //因为自带的thumbUpCount字段不准确
                    item.thumbUpCount = item.thumbUpList.length

                    //屏蔽部分用户
                    if (item.userId === '1256120724666454016') {
                        sourceList.splice(i, 1)
                        continue
                    }

                    //添加本人是否点赞字段
                    item.thumbUpActive = this.idIsContainMe(item.thumbUpList)

                    //修改时间
                    item.createTime = this.calcTime(item.createTime)

                    //对分享的链接解析出域名
                    if (item.linkUrl) {
                        item.linkHost = this.getDomain(item.linkUrl)
                    }
                }

                if (isMerge) {
                    this.momentList = this.mergeTargetFromSource(this.momentList, sourceList, 'id')
                } else {
                    this.momentList = sourceList
                }

                //关闭骨架屏
                this.isSkeletonLoading = false

                this.isUnMore = false
                this.isLoading = false
                if (this.toast.hide) {

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
                this.getMoYuList(this.currentTagId, ++this.currentPage, true)

                this.toast = this.$toast.loading('加载中...', {
                    duration: 0,
                    id: 'momentLoading'
                });

            },

            /**
             * 下拉刷新
             */
            pulldown() {
                this.isLoading = true
                this.getMoYuList(this.currentTagId, 1, false)

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
             * 切换标签页的回调
             * @param tagIndex
             */
            changeTag(tagIndex, tagId) {
                this.currentTag = tagIndex
                this.currentTagId = tagId
                this.getMoYuList(this.currentTagId, 1, false)
            },

            /**
             * 判断用户id列表中是否包含我的id
             * @param userIdList
             */
            idIsContainMe(userIdList) {

                if (!this.$store.state.userInfo) {
                    return false
                }

                if (userIdList.includes(this.$store.state.userInfo.id)) {
                    return true
                }
                return false
            },

            /**
             * 解析url，获取域名
             * @param url
             */
            getDomain(url) {
                let parseResult = parseDomain(fromUrl(url));
                return parseResult.hostname
            },

            /**
             * 查看大图
             * @param images 图片url数组
             * @param index  点击的图片在数组中的下标
             *
             */
            showBigImg(images, index) {
                this.$imageTouch(
                    {
                        imageList: images, // 图片数据源
                        activedIndex: index, // 进度下标
                        isShowBar: true,   // 是否显示进度
                    }
                );
            },


            /**
             * 点击话题，跳转到该话题的标签下
             * @param topicId
             */
            clickToTopic(topicId) {

                //找到话题

                let topicIndex = 0
                let topicItem = this.categoryList.filter((value, index) => {
                    if (value.id === topicId) {

                        topicIndex = index
                        return true
                    } else {
                        return false
                    }
                })

                if (topicItem.length > 0) {

                    //拿到这个话题对应的tag元素
                    let clickTagItem = this.$refs['tagScroll' + topicIndex][0]

                    //触发他的点击事件
                    clickTagItem.click()

                    //拿到该tag距离页面左边的位置，滚动到该标签所在的位置
                    // +40是为了让标签稍微偏中间
                    this.tagScrollY = -clickTagItem.getBoundingClientRect().left + 40

                    //同时，让竖直方向的页面也滚动回顶部
                    if (this.momentListScrollY === -1) {
                        this.momentListScrollY = this.momentListScrollY + 0.1
                    } else {
                        this.momentListScrollY = -1
                    }

                }

            },


            /**
             * 动态点赞
             * @param momentId
             */
            async thumbUpMoment(moment) {
                //这里为什么要调用两次呢？因为sob的bug，只点赞一次接口数据不会更新，必须重复点赞
                api.momentThumbUp(moment.id)
                api.momentThumbUp(moment.id)

                //更新点赞数
                moment.thumbUpCount++

                //更新flag
                moment.thumbUpActive=true
            },

            /**
             * 获取动态的评论信息
             * @param momentItem
             * @returns {Promise<void>}
             */
            async getMomentCommontList(momentItem){
                let result = await api.getMoyuCommontList(momentItem.id)
                //添加一些属性
                for (let i = 0; i < result.data.list.length; i++) {
                    //showMore
                    result.data.list[i].showMore = false;
                }
                Vue.set(momentItem,'commentList', result.data.list)
            },

            /**
             * 打开评论列表
             * @param momentItem
             */
            openCommontList(momentItem){
                if (momentItem.showCommont == true){
                    //注意，必须这么设置才能被vue监听到
                    Vue.set(momentItem,'showCommont',false)
                }else {
                    Vue.set(momentItem,'showCommont',true)
                    this.getMomentCommontList(momentItem);
                }
            },

            /**
             * 打开分享的链接
             * @param url
             */
            toArticlePage(url){
                //如果是主站的文章链接，则跳转到手机端页面查看
                //https://www.sunofbeach.net/a/1580461941464240130
                if (url.includes("www.sunofbeach.net/a")){
                    let articleId = url.substr(url.indexOf("/a/")+3,url.length-1)
                    this.$router.push({
                        path: '/detail',
                        query: {id: articleId}
                    })
                }else {
                    console.log("其他链接")
                    window.location.href=url
                }
            }
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

    /*---------------骨架屏 ---------------*/
    .vue-skeleton-loading {
        position: fixed;
        top: 5px;
        right: 0;
        bottom: 0;
        left: -10px;
        z-index: 9998;
        font-size: 12px;
        background: #fff;
    }

    .vue-skeleton-loading .skeleton-bac-animation {
        position: absolute;
        z-index: auto;
        width: 100%;
        height: 100%;
        background: -webkit-gradient(linear, left top, right top, from(hsla(0, 0%, 100%, 0)), color-stop(50%, hsla(0, 0%, 100%, .5)), color-stop(80%, hsla(0, 0%, 100%, 0)));
        background: -o-linear-gradient(left, hsla(0, 0%, 100%, 0), hsla(0, 0%, 100%, .5) 50%, hsla(0, 0%, 100%, 0) 80%);
        background: linear-gradient(90deg, hsla(0, 0%, 100%, 0), hsla(0, 0%, 100%, .5) 50%, hsla(0, 0%, 100%, 0) 80%);
        background-size: 30% 100%;
        background-repeat: no-repeat;
        -webkit-animation: backpos .9s ease-in-out 0s infinite;
        animation: backpos .9s ease-in-out 0s infinite;
    }

    /*---------------分隔符 ---------------*/
    .line {
        background-color: #f4f5f5;
        width: 100%;
        height: 10px;
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

    .moment-item .header .userinfo .desc .post {
        width: 100px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap
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

    .moment-item .middle .img-list .bg-img {
        margin-right: 4px;
        margin-top: 4px;
        background-size: cover;
        background-position: center;
        max-width: 100%;
        min-width: 110px;
        cursor: zoom-in;
        min-height: 110px;
        max-height: 230px;
    }

    .moment-item .middle .link-box {
        background-color: #f7f8fa;
        border-radius: 2px;
        box-sizing: border-box;
        margin-top: 10px;
    }

    .moment-item .middle .link-box a {
        display: flex;
        flex-direction: row;
        padding: 15px 0px 15px 15px;
        margin-bottom: 10px;
    }

    .moment-item .middle .link-box a .link-cover {
        width: 40px;
        height: 40px;
        background-position: 50%;
        background-repeat: no-repeat;
        background-size: cover;
        border-radius: 2px;
        margin-right: 10px;
    }

    .moment-item .middle .link-box a .link-cover-default {
        width: 40px;
        height: 40px;

        border-radius: 2px;
        margin-right: 10px;
        background: #0084ff;
        color: white;
        text-align: center;
        line-height: 40px;
    }

    .moment-item .middle .link-box a .link-info {
        width: 205px;

    }

    .moment-item .middle .link-box a .link-info .link-title {
        width: 100%;
        font-size: 16px;
        font-weight: 500;
        line-height: 22px;
        color: #515767;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 1;
        white-space: nowrap;
    }

    .moment-item .middle .link-box a .link-info .link-domain {
        margin-top: auto;
        font-size: 12px;
        line-height: 20px;
        color: #8a919f;
    }

    .moment-item .middle .topic {
        margin: 12px 0px 12px;
        width: fit-content;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 2px 6px;
        background-color: #eaf2ff;
        font-size: 12px !important;
        height: 25px;
        line-height: 20px;
        color: #1e80ff;
        border-radius: 50px;
    }

    .moment-item .action {
        display: flex;
        height: 36px;
        border-top: 1px solid #e4e6eb;
        margin-top: 10px;

    }

    .moment-item .action .action-btn {
        flex: 1;
        text-align: center;
        color: #86909c;
        line-height: 40px;


    }

    .moment-item .action .action-btn ::before {
        margin-right: 2px;
    }

    .moment-item .action .active {
        color: #0084ff !important;
    }

    .reviewList{

    }

    .reviewList .commentInput{
        display: flex;
        flex-direction: column;
        align-items: end;
    }
    .reviewList .commentInput .inputBox{
        margin-top: 5px;
        width: 100%;
    }
    .reviewList .commentInput .submit-btn{
        margin-top: 5px;
        flex: 0 0 auto;
        margin-left: auto;
        width: 92px;
        text-align: center;
        font-size: 12px;
        line-height: 25px;
        background: #1e80ff;
        border-radius: 4px;
        color: #fff;
        padding: 0;
        cursor: pointer;
    }

    .reviewItem {

        display: flex;
        flex-direction: row;
        font-size: 12px;
        margin-top: 14px;

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
    .reviewItem .reviewRight .subcommentBox{
        border-radius: 5%;
        background: rgba(247,248,250,.7);
        padding-bottom: 10px;
        margin-top: 5px;
    }
    /*子评论*/
    .reviewItem .reviewRight .subcomment{

        margin: 15px 0 5px 20px;
        display: flex;
        font-size: 11px;
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
    .comment-btn{
        margin-top: 2px;
    }
    .reviewRight .comment-btn span{

        float: right;
        color: #007fff;
        font-size: 13px;
    }


    /*---------------弹出层-大图 ---------------*/
    .big-img {
        max-width: 100vw;
        max-height: 100vh;
    }
</style>

