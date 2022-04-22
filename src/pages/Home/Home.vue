<template>
    <div>


        <nut-backtop
                :class="{show: isShowBacktop }"
                @click="backToTop"
                el-id="app"
                :bottom="20"
                :right="20"
                :z-index="10"
                :distance="200"
        >
        </nut-backtop>


        <div v-if="isSkeletonLoading">
            <row padding="0 10px 0">
                <skeleton-square
                        width="390px"
                        height="25px"
                ></skeleton-square>

            </row>

            <row slot="list" padding="15px 10px 0">


                <column>
                    <skeleton-square
                            width="390px"
                            height="168px"
                    ></skeleton-square>

                </column>


            </row>


            <row slot="list" padding="15px 10px 0">

                <skeleton-square
                        width="50px"
                        height="50px"
                >
                </skeleton-square>

                <column>
                    <skeleton-square
                            width="300px"
                            :count="2"
                            margin="10px 10px 5px"
                    ></skeleton-square>
                </column>


            </row>

            <row slot="list" padding="15px 10px 0">

                <skeleton-square
                        width="50px"
                        height="50px"
                >
                </skeleton-square>

                <column>
                    <skeleton-square
                            width="300px"
                            :count="2"
                            margin="10px 10px 5px"
                    ></skeleton-square>
                </column>


            </row>
            <row slot="list" padding="15px 10px 0">

                <skeleton-square
                        width="50px"
                        height="50px"
                >
                </skeleton-square>

                <column>
                    <skeleton-square
                            width="300px"
                            :count="2"
                            margin="10px 10px 5px"
                    ></skeleton-square>
                </column>


            </row>
            <row slot="list" padding="15px 10px 0">

                <skeleton-square
                        width="50px"
                        height="50px"
                >
                </skeleton-square>

                <column>
                    <skeleton-square
                            width="300px"
                            :count="2"
                            margin="10px 10px 5px"
                    ></skeleton-square>
                </column>


            </row>
            <row slot="list" padding="15px 10px 0">

                <skeleton-square
                        width="50px"
                        height="50px"
                >
                </skeleton-square>

                <column>
                    <skeleton-square
                            width="300px"
                            :count="2"
                            margin="10px 10px 5px"
                    ></skeleton-square>
                </column>


            </row>
            <row slot="list" padding="15px 10px 0">

                <skeleton-square
                        width="50px"
                        height="50px"
                >
                </skeleton-square>

                <column>
                    <skeleton-square
                            width="300px"
                            :count="2"
                            margin="10px 10px 5px"
                    ></skeleton-square>
                </column>


            </row>
            <row slot="list" padding="15px 10px 0">

                <skeleton-square
                        width="50px"
                        height="50px"
                >
                </skeleton-square>

                <column>
                    <skeleton-square
                            width="300px"
                            :count="2"
                            margin="10px 10px 5px"
                    ></skeleton-square>
                </column>


            </row>
            <row slot="list" padding="15px 10px 0">

                <skeleton-square
                        width="50px"
                        height="50px"
                >
                </skeleton-square>

                <column>
                    <skeleton-square
                            width="300px"
                            :count="2"
                            margin="10px 10px 5px"
                    ></skeleton-square>
                </column>


            </row>


        </div>

        <template  v-else>
            <!--标签栏-->
            <nut-scroller class="tagScroll">

                <div slot="list" class="tagItem nut-hor-list-item " :class="{tagCurrent: currentTag==-1}"
                     @click="changeTag(-1,null)"
                >
                    <span class="tagTitle">推荐</span>
                </div>

                <div slot="list" class="tagItem nut-hor-list-item " :class="{tagCurrent: currentTag==index}"
                     v-for="(item,index) in categoryList" :key="item.id"
                     @click="changeTag(index,item)"
                >
                    <span class="tagTitle">{{item.categoryName}}</span>
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
                    unloadMoreTxt="到底了"
            >
                <div slot="list" class="nut-hor-list-item">



                    <!--轮播图，仅为推荐页面时使用-->
                    <nut-swiper
                            class="img-swiper"
                            v-show="currentTag==-1"
                            :autoPlay="2000"
                            direction="horizontal"
                            :loop="true"
                            :canDragging="false"
                            :paginationVisible="true"
                            :swiperData="loopList"
                            ref="demo3"
                    >
                        <div class="nut-swiper-slide" v-for="item in loopList" :key="item.id">
                            <img :src="item.picUrl" class="swiperImg" alt="">
                        </div>
                    </nut-swiper>


                    <!--文章列表 -->
                    <div id="totalScroll">

                        <ul class="articleList">
                            <!--文章详情-->
                            <li class="articleItem" v-for="item in recommendArticleList" :key="item.id"
                                @click="toArticleDetail(item.id)">
                                <div class="left">
                                    <img style="object-fit: cover;" :src="item.covers[0]" alt="">
                                </div>
                                <div class="right">
                                    <h2 class="title">{{item.title}}</h2>
                                    <div class="articleInfo">
                                        <span class="author articleInfoItem">{{item.nickName}}</span>
                                        <span class="viewCount articleInfoItem">{{item.viewCount}}阅读</span>
                                        <span class="thumbUp articleInfoItem">{{item.thumbUp}}点赞</span>

                                    </div>
                                </div>


                            </li>


                        </ul>


                    </div>

                </div>


            </nut-scroller>
        </template>


    </div>
</template>

<script>
    import api from '../../api'
    import {nanoid} from 'nanoid'

    export default {
        name: "Home.vue",
        data() {
            return {
                isSkeletonLoading: true,//标识骨架屏是否展示
                categoryList: [], //顶部标签数组
                currentTag: -1,//记录当前是哪个tag被选中了
                currentTagId: '',//记录当前被选中的tagid
                loopList: [],//轮播图数据
                recommendArticleList: [], //获得推荐文章列表
                currentPage: 0, //当前所在页码
                isUnMore: false,//对于滑动组件，是否没有更多数据
                isLoading: false,//是否正在下拉刷新数据
                isShowBacktop: false, //是否显示返回顶部按钮
                scrollY: 0, //页面要滚动到哪个位置，是负数
                currentScroll: 0,//现在滚动到哪了
                scrollElem: {},//正在滚动的容器
            }
        },
        methods: {
            /**
             * 获取顶部标签数据
             */
            async getCategoryList() {
                let result = await api.getCategoryList()
                this.categoryList = result.data
            },

            /**
             * 获得轮播图数据
             * @returns {Promise<void>}
             */
            async getLoopList() {
                let result = await api.getLoopList()

                for (let i = 0; i < result.data.length; i++) {
                    result.data[i].id = nanoid()
                }

                this.loopList = result.data

            },
            /**
             * 获得文章数据
             * @returns {Promise<void>}
             */
            async getArticleList(page = 1, isMerge = false) {
                let result = null
                //如果有categoryId，说明获取的是标签数据，如果没有，那获取的就是推荐页面的数据
                if (this.currentTagId) {
                    console.log('获取文章数据，不是推荐页，id为：' + this.currentTagId)
                    result = await api.getArticleListByCategoryId(this.currentTagId, page)
                } else {
                    console.log('获取文章数据，是推荐页，id为：' + this.currentTagId)

                    result = await api.getRecommendArticleList(page)

                }
                if (isMerge) {
                    //合并之前和现在的数据
                    //合并之前，涉及到一个去重问题
                    // let obj = {}
                    // for (let i = 0; i < this.recommendArticleList.length; i++) {
                    //     obj[this.recommendArticleList[i].id] = this.recommendArticleList[i]
                    // }
                    // for (let i = 0; i < result.data.list.length; i++) {
                    //     //如果拿着你的id去 obj 里找，找不到，说明原本的 this.recommendArticleList没有这个对象
                    //
                    //     if (!obj[result.data.list[i].id]) {
                    //         this.recommendArticleList.push(result.data.list[i])
                    //     } else {
                    //         // console.log(result.data.list[i].name + '不会被添加')
                    //     }
                    // }
                    this.recommendArticleList = this.mergeTargetFromSource(this.recommendArticleList,result.data.list,'id')
                } else {
                    //更新数据
                    this.recommendArticleList = result.data.list
                }

                //加载完毕数据，取消提示
                this.isLoading = false
                this.isUnMore = false
                this.$nextTick(() => {
                    this.isSkeletonLoading = false

                })

            },

            /**
             * 上拉加载更多
             */
            loadMoreVert() {
                this.isUnMore = true
                this.getArticleList(++this.currentPage, true)



            },

            /**
             * 下拉刷新
             */
            pulldown() {
                this.isLoading = true
                this.getArticleList(0, false)


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
             * 返回页面顶部
             */
            backToTop() {

                //这些是旧代码，不好用，换一种方式
               /* clearInterval(this.scrollTimer)
                //这里通过一个定时器的方式，逐步往上滑动，实现滑动效果
                this.scrollTimer = setInterval(() => {
                    //只有当距离为负数，也就是页面还有一段距离才到顶部，这时候才滚动
                    if (!(this.currentScroll >= 0)) {

                        //计算本次滚动的距离
                        //如果计算得到的距离太少，小于10，那就取10
                        let moveDistance = Math.ceil((-this.currentScroll * 0.3))

                        //如果剩余距离太小了，那就直接滚动到顶部，不再一点点判断了
                        if (moveDistance < 30) {
                            this.scrollY = -1
                            clearInterval(this.scrollTimer) //记得清除
                            return
                        }

                        //这里为什么是 +，因为默认的滚动高度是负数
                        this.currentScroll += moveDistance
                        this.scrollY = this.currentScroll
                    } else {
                        //滑到顶部了，就清楚定时器
                        clearInterval(this.scrollTimer)
                    }
                }, 50)*/


                this.scrollElem.style.transform = 'translate3d(0px, -1px, 0px)'


                //因nutui本身会记忆 位置，滑动屏幕后又会回到之前的位置,所以动画播放完毕后，需要触发滚动事件，使的nutui记忆的位置与当前位置同步
                setTimeout(()=>{
                    //scrollY 必须变化，才会触发nutui的滚动事件
                    if (this.scrollY<-2){
                        this.scrollY = -.02
                    }else {
                        this.scrollY -= 0.2
                    }

                },500)
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
                console.log('切换了页面')
                this.currentTag = tagIndex


                //如果不是推荐页，那么这个tagItem是有值的
                if (tagItem) {
                    console.log('不是推荐页，是' + tagItem.categoryName)
                    this.currentTagId = tagItem.id


                } else {
                    console.log('是推荐页')

                    //如果是推荐页，那么将currentTagId置为null
                    this.currentTagId = null


                }

                this.getArticleList(1, false)
            },

            /**
             * 跳转到文章详情页面
             * @param id
             */
            toArticleDetail(id) {
                this.$router.push({
                    path: '/detail',
                    query: {id: id}
                })
            },


        },
        mounted() {
            this.isSkeletonLoading = true
            //获得顶部标签页
            this.getCategoryList()

            //获得轮播图数据
            this.getLoopList()

            //获得推荐文章数据
            this.getArticleList(1)


            let _this = this
            //找到这个滚动的容器
            setTimeout(()=>{
                _this.scrollElem = document.getElementsByClassName('nut-vert-list')[0]



            },500)



        }
    }
</script>

<style scoped>

    .totalScroll {
        height: calc(100vh - 59px);
    }

    /*---------------标签栏 start---------------*/
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

    /*---------------标签栏 end---------------*/


    /*---------------轮播图 start---------------*/
    .myswiper {
        height: 168px;
        width: 100%;
    }

    .line {
        background-color: #f4f5f5;
        width: 100%;
        height: 10px;
    }
    .swiperImg {
        width: 100%;
        height: 168px;
    }

    .nut-swiper {
        height: 168px;
    }

    /*---------------轮播图 end---------------*/

    /*---------------文章列表 start---------------*/
    .articleItem {
        box-sizing: border-box;
        padding: 13px 17px 8px;
        min-height: 83px;

        width: 100%;
        border-bottom: 1px solid #e4e4e4;
        display: flex;
    }

    .articleItem .title {
        line-height: 130%;
        font-size: 20px;
        font-weight: 500;


    }

    .articleInfo {
        display: flex;
        margin-top: 10px;
        font-size: 13px;
    }

    .articleInfoItem {
        margin-right: 10px;
    }


    .articleItem .left img {
        overflow: hidden;
        border-radius: 5px;
        height: 60px;
        width: 60px;
        margin-right: 20px;
    }


    /*---------------文章列表 end---------------*/


</style>
