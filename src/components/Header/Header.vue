<template>
    <div class="container">


        <nut-row>
            <nut-col :span="3">
                <div class="flex-content logo" @click="toHome">
                    SOB
                </div>


            </nut-col>
            <nut-col :span="16">
                <div class="flex-content flex-content-light">
                    <nut-searchbar
                            v-model="searchStr"
                            placeText="有什么想搜索的？"
                    ></nut-searchbar>
                </div>
            </nut-col>
            <nut-col :span="3">
                <div v-if="!userInfo" class="flex-content loginText" @click="toLogin">登录</div>

                <div class="userinfo" v-else @click="toUserInfo">
                    <nut-badge

                            top="5px"
                            right="18px"
                            :isDot="true"
                            class="item"
                    >
                        <nut-avatar
                                class="user-avatar"

                                bg-icon
                                :bg-image="userInfo.avatar"
                        ></nut-avatar>

                    </nut-badge>

                    <ul class="message-box">
                        <nut-badge
                                :value="9"
                                top="9px"
                                right="-10px"

                        >
                            <li class="mitem">问题回答</li>
                        </nut-badge>

                        <nut-badge
                                :value="9"
                                top="9px"
                                right="-10px"

                        >
                            <li class="mitem">文章回复</li>
                        </nut-badge>

                        <nut-badge
                                :value="9"
                                top="9px"
                                right="-10px"

                        >
                            <li class="mitem">动态评论</li>
                        </nut-badge>

                        <nut-badge
                                :value="9"
                                top="9px"
                                right="-10px"

                        >
                            <li class="mitem">给朕点赞</li>
                        </nut-badge>

                        <nut-badge
                                :value="9"
                                top="9px"
                                right="-10px"

                        >
                            <li class="mitem">系统通知</li>
                        </nut-badge>

                        <nut-badge
                                :value="9"
                                top="9px"
                                right="-10px"
                        >
                            <li class="mitem">@朕消息</li>
                        </nut-badge>


                    </ul>

                </div>


            </nut-col>
            <nut-col :span="1">
                <span class="iconfont icon-more"></span>
            </nut-col>
        </nut-row>


    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: "Header.vue",
        data() {
            return {
                searchStr: ''
            }
        },
        computed: {
            ...mapState(['userInfo'])
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
             * 到个人详情页面
             */
            toUserInfo() {
                console.log("跳转个人详情")
            },
        }

    }
</script>

<style scoped>

    .container {
        padding: 10px 5px;
    }


    .logo {
        text-align: center;
        height: 26px;
        line-height: 36px;
        font-size: 19px;
        color: #37f;
        margin-left: -5px;
    }

    .loginText {
        height: 26px;
        line-height: 36px;
        margin-left: 9px;


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
        position: relative;
    }

    .message-box {
        border: 1px solid #ccc;
        margin-top: 8px;
        border-radius: 4%;
        padding: 15px 20px 0px 20px;
        z-index: 2;
        position: absolute;
        left: -90%;
        background-color: #fff;
        width: 90px;
    }

    .message-box .mitem{

        margin-bottom: 15px;
    }
</style>
