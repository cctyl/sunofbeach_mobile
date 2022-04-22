<template>
    <div class="container">


        <!--logo-->
        <div class="logo" @click="toHome">
            SOB
        </div>

        <!--侧边栏-->
        <div class="side">
            <div class="nav-show-btn" @click="setNavListShow(!navListShow)">
                <span class="nav-title">{{$route.meta.navText?$route.meta.navText:'首页'}}</span>
                <i class="iconfont"
                   :class="navListShow?'icon-shangzhankai':'icon-xiazhankai'"
                />
            </div>

            <ul class="nav-list" v-show="navListShow">
                <li class="nav-item" @click="toPage('/home','首页')">
                    <a :class="{'nav-active': $route.path==='/home'|| $route.path==='/'}"
                    >首页</a>
                </li>



                <li class="nav-item"  @click="toPage('/moment','摸鱼')">
                    <a
                            :class="{'nav-active': $route.path==='/moment' }"
                    >摸鱼</a>
                </li>
                <li class="nav-item">
                    <a
                            :class="{'nav-active': $route.path==='/wenda' }"
                    >问答</a>
                </li>


                <li class="nav-item">
                    <a
                            :class="{'nav-active': $route.path==='/xxx' }"
                    >分享</a>
                </li>

                <li class="nav-item">
                    <a
                            :class="{'nav-active': $route.path==='/xxx' }"
                    >学院</a>
                </li>

                <li class="nav-item">
                    <a
                            :class="{'nav-active': $route.path==='/xxx' }"
                    >VIP</a>
                </li>

                <li class="nav-item">
                    <a
                            :class="{'nav-active': $route.path==='/xxx' }"
                    >仓库</a>
                </li>

                <li class="nav-item">
                    <a
                            :class="{'nav-active': $route.path==='/xxx' }"
                    >APIs</a>
                </li>

                <li class="nav-item">
                    <a
                            :class="{'nav-active': $route.path==='/xxx' }"
                    >商场</a>
                </li>

                <li class="nav-item">
                    <a
                            :class="{'nav-active': $route.path==='/xxx' }"
                    >笔记</a>
                </li>

                <li class="nav-item">
                    <a
                            :class="{'nav-active': $route.path==='/xxx' }"
                    >交互</a>
                </li>

                <li class="nav-item">
                    <a
                            :class="{'nav-active': $route.path==='/ucenter' }"
                    >
                        个人中心
                    </a>
                </li>
            </ul>

        </div>

        <!--搜索框-->
        <div class="search" @click="closeNavMsg()">
            <nut-searchbar
                    v-model="searchStr"
                    :hasSearchButton="true"
                    placeText="有什么想搜索的？"
            ></nut-searchbar>
        </div>

        <!--未登录时的文字-->
        <div v-if="!userInfo" class="loginText" @click="toLogin">
            <span>登录</span>
        </div>

        <!--登录后显示的头像-->
        <div v-else class="userinfo" @click="showMsgBox">
            <nut-badge
                    top="5px"
                    right="18px"
                    :isDot="hasNewMessage"
            >
                <nut-avatar

                        class="user-avatar"

                        bg-icon
                        :bg-image="userInfo.avatar"
                ></nut-avatar>

            </nut-badge>

            <ul class="message-box" v-if="msgBoxShow" >


                <nut-badge
                        :value="msgData.articleMsgCount"
                        top="9px"
                        right="-10px"


                >
                    <li class="mitem" @click.stop="toMessage(2)">文章回复</li>
                </nut-badge>

                <nut-badge
                        :value="msgData.thumbUpMsgCount"
                        top="9px"
                        right="-10px"


                >
                    <li class="mitem" @click.stop="toMessage(1)">给朕点赞</li>
                </nut-badge>

                <nut-badge
                        :value="msgData.atMsgCount"
                        top="9px"
                        right="-10px"
                >
                    <li class="mitem" @click.stop="toMessage(0)"> @朕消息</li>
                </nut-badge>
                <nut-badge
                        :value="msgData.momentCommentCount"
                        top="9px"
                        right="-10px"


                >
                    <li class="mitem" @click.stop="toMessage(3)">动态评论</li>
                </nut-badge>

                <nut-badge
                        :value="msgData.wendaMsgCount"
                        top="9px"
                        right="-10px"

                >
                    <li class="mitem" @click.stop="toMessage(4)">问题回答</li>
                </nut-badge>

                <nut-badge
                        :value="msgData.systemMsgCount"
                        top="9px"
                        right="-10px"


                >
                    <li class="mitem" @click.stop="toMessage(5)">系统通知</li>
                </nut-badge>


                <li class="mitem" @click.stop="readAll">全部已读
                    <!--<i class="iconfont icon-qingchu"></i>-->
                </li>

            </ul>

        </div>


    </div>
</template>

<script>
    import {mapState,mapActions} from 'vuex'
    import api from "../../api/index"

    export default {
        name: "Header.vue",
        data() {
            return {
                searchStr: '',//搜索框内容
                //存储消息数
                msgData: {
                    articleMsgCount: 0,
                    atMsgCount: 0,
                    momentCommentCount: 0,
                    shareMsgCount: 0,
                    systemMsgCount: 0,
                    thumbUpMsgCount: 0,
                    wendaMsgCount: 0
                },



            }
        },
        computed: {
            ...mapState(['userInfo','msgBoxShow','navListShow']),

            /**
             *计算是否有新消息
             */
            hasNewMessage() {

                for (let key in this.msgData) {
                    if (this.msgData[key] > 0) {
                        return true
                    }
                }
                return false
            },
        },

        mounted() {
            this.getMsgCount()


        },

        methods: {

            ...mapActions(['setMsgBoxShow','setNavListShow']),

            /**
             * 跳转到首页
             */
            toHome() {
                //收起导航栏和消息栏
                this.closeNavMsg()

                if (this.$route.path == '/home' || this.$route.path == '/') {
                    console.log('在首页，不跳转')
                } else {

                    this.$router.push({
                        path: '/home'
                    })
                }
            },

            /**
             * 跳转到登录页面
             */
            toLogin() {
                this.$router.push("/login")
            },

            /**
             * 点击导航栏跳转到指定页面
             * @param url 页面路径
             * @param navText 导航按钮文字
             */
            toPage(url){
                //已在此页面，不跳转
                this.setNavListShow(false)
                if (this.$route.path === url){
                    return
                }
                this.$router.push(url)


            },

            /**
             * 展示或关闭消息盒子
             */
            showMsgBox() {
               this.setMsgBoxShow(true)
            },


            /**
             * 获取未读消息数量
             */
            async getMsgCount() {
                //直接发送请求获取未读消息数量
                let result = await api.getMsgCount();
                console.log(result)
                this.msgData = result.data;

            },


            /**
             * 将消息全部已读
             */
            async readAll() {
                this.setMsgBoxShow(false)
                let result = await api.readAllMsg()

                if (result.success === true) {
                    this.$notify.success('已读成功！');

                    //既然全部已读，那么这个消息盒子中的数据必定是0
                    this.msgData = {
                        articleMsgCount: 0,
                        atMsgCount: 0,
                        momentCommentCount: 0,
                        shareMsgCount: 0,
                        systemMsgCount: 0,
                        thumbUpMsgCount: 0,
                        wendaMsgCount: 0
                    }
                }
            },

            /**
             * 跳转到消息页面
             * @param type
             */
            toMessage(type) {

                //关闭消息下拉列表
                this.closeNavMsg()

                this.$router.push({
                    path: '/message',
                    query: {type}
                })
            },

        }

    }
</script>

<style scoped>

    .container {
        padding: 10px 5px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }


    .logo {
        text-align: center;
        height: 26px;
        line-height: 36px;
        font-size: 1.2rem;
        color: #37f;
        margin: 0px 7px;
    }

    .loginText {
        height: 26px;
        line-height: 36px;
        width: 2rem;
    }

    .loginText span{
        width: 2rem;
    }

    .loginText, .userinfo {
        padding: 0 10px;
    }

    .icon-more {

        height: 26px;
        line-height: 36px;
        vertical-align: middle;
    }


    .user-avatar {
        width: 25px;
        height: 25px;
        margin-top: 5px;

    }

    .userinfo {
        margin-left: 7px;
    }

    .message-box {
        margin-top: 8px;
        padding: 5px 20px 0px 10px;
        z-index: 2;
        background-color: #fff;
        width: 6rem;

        position: absolute;
        right: 0;

        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;


        box-shadow: 0 8px 24px rgb(81 87 103 / 16%);
        border: 1px solid #ebebeb;
        border-radius: 4px;
        font-size: 14px;
    }

    .message-box .mitem {
        color: #515767;
        height: 3rem;
        line-height: 3rem;
    }

    .search {
        width: 12.5rem;
    }

    .side {
        padding: 0 4px;
        align-self: center;
        white-space: nowrap;
    }

    .side .nav-title {
        color: #37f;
        font-size: 1rem;
    }

    .side .nav-list {
        z-index: 2;

        position: absolute;
        left: 0;

        background-color: #fff;
        box-shadow: 0 8px 24px rgb(81 87 103 / 16%);
        border: 1px solid #ebebeb;
        border-radius: 4px;
        width: 9.2rem;
        top: 52px;


    }
    .side .nav-list,.show{
        display: block;
    }
    .side .nav-list .nav-item {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        height: 3rem;

    }

    .side .nav-list .nav-item a {
        color: #86909c;
        font-size: 14px;
    }

    .side .nav-list .nav-item .nav-active {
        color: #37f;
    }
</style>
