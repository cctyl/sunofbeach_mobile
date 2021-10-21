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

                <div  v-else @click="toUserInfo">
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
            toUserInfo(){
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
</style>
