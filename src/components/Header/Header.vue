<template>
    <div class="container">

        <!--logo-->
        <div class="logo" @click="toHome">
            SOB
        </div>

        <!--搜索框-->
        <div class="search">
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

            <ul class="message-box" v-if="msgBoxShow">


                <nut-badge
                        :value="msgData.articleMsgCount"
                        top="9px"
                        right="-10px"


                >
                    <li class="mitem" @click.stop="toMessage(0)">文章回复</li>
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
                    <li class="mitem" @click.stop="toMessage(2)"> @朕消息</li>
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


                <li class="mitem" @click.stop="readAll">全部已读 <i class="iconfont icon-qingchu"></i></li>
                <li class="mitem" @click.stop="msgBoxShow=false">收起列表 <i
                        class="iconfont icon-anniu_jiantoushouqi_o"></i></li>

            </ul>

        </div>






    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import api from "../../api/index"

    export default {
        name: "Header.vue",
        data() {
            return {
                searchStr: '',
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
                msgBoxShow: false,//决定是否展示消息盒子
            }
        },
        computed: {
            ...mapState(['userInfo']),

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

            /**
             * 跳转到首页
             */
            toHome() {

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
             * 展示或关闭消息盒子
             */
            showMsgBox() {
                console.log("showMsgBox")
                this.msgBoxShow = !this.msgBoxShow
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
                let result = await api.readAllMsg()


                if (result.success === true) {
                    this.$notify.success('已读成功！');
                    //关闭消息盒子
                    this.msgBoxShow = false

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

                this.msgBoxShow = false
                this.$router.push({
                    path: '/message',
                    query: {type}
                })
                // console.log("tomessage："+type)
            },

        }

    }
</script>

<style scoped>

    .container {
        padding: 10px 5px;
        display: flex;
        flex-direction: row;
    }


    .logo {
        text-align: center;
        height: 26px;
        line-height: 36px;
        font-size: 19px;
        color: #37f;
    }

    .loginText {
        height: 26px;
        line-height: 36px;
        margin-left: 12px;
        width: 40px;

    }

    .icon-more {

        height: 26px;
        line-height: 36px;
        vertical-align: middle;
    }


    .user-avatar {
        width: 25px;
        height: 25px;
        margin-left: 12px;
        margin-top: 5px;

    }

    .userinfo {
        margin-left: 5px;
    }

    .message-box {
        border: 1px solid #ccc;
        margin-top: 8px;
        padding: 20px 20px 0px 10px;
        z-index: 2;
        background-color: #fff;
        width: 110px;

        position: absolute;
        right: 0;

        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;

    }

    .message-box .mitem {
        color: #515767;
        height: 40px;
        margin-bottom: 10px;
    }

    .search{
        width: 230px;
    }



</style>
