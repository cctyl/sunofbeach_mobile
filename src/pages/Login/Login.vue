<template>
    <div>

        <!--导航栏-->
        <nut-navbar
                @on-click-back="back"
                :leftShow="true"
                :right-show="false"
        >
            登录
        </nut-navbar>
        <!--标题-->
        <h1 class="title">SOB</h1>
        <!--表单-->
        <div class="loginform">

            <form @submit.prevent="login">

                <nut-textinput
                        v-model="loginFrom.phone"
                        placeholder="请输入手机号"
                        maxlength="11"
                        :clearBtn="true"
                        type="text"
                        name="username"
                        autocomplete="username"
                />

                <nut-textinput
                        placeholder="请输入密码"
                        v-model="loginFrom.password"
                        type="password" name="password" autocomplete="current-password"
                />

                <nut-row>
                    <nut-col :span="15">
                        <nut-textinput
                                class="captchaInput"
                                v-model="loginFrom.captcha"
                                placeholder="请输入验证码"
                                :clearBtn="true"
                                :disabled="false"
                        />
                    </nut-col>
                    <nut-col :span="9">
                        <img class="captchaImg" id="captcha" @click="loadCaptcha" alt="">
                    </nut-col>
                </nut-row>

                <div class="loginbtn">
                    <!--按钮-->

                    <button type="submit">登录</button>
                </div>


            </form>


        </div>
        <!--其他信息-->
        <div class="other">
            <span>忘记密码？</span>
            <span class="regText">注册</span>
        </div>


        <!--  版权相关  -->
        <div class="copyright">

            <span>Copyright © 2014-2021 阳光沙滩 code by TrillGates</span>
            <span class="about">关于我们 | 加入我们 | 友情链接</span>

        </div>


    </div>
</template>

<script>

    import api from '../../api'

    import {mapState} from 'vuex'

    export default {
        name: "Login",
        data() {
            return {
                captchaUrl: 'https://api.sunofbeaches.com/uc/ut/captcha?code=',
                randomCode: '',
                loginFrom: {
                    phone: '', //手机号
                    password: '',//密码
                    captcha: ''//验证码
                }
            }
        },
        computed: {
            ...mapState(['lastUrl'])
        },
        mounted() {
            this.loadCaptcha()
        },
        methods: {
            /**
             * 用户登录
             */
            async login() {
                let {phone, password, captcha} = this.loginFrom

                //校验手机号
                if (!(/^1[3456789]\d{9}$/.test(phone))) {
                    this.$notify.warn('手机号格式错误！');
                    return false;
                }
                //密码不能为空
                if (!password) {
                    this.$notify.warn('密码不能为空！');
                    return false;
                }

                //验证码不能为空
                if (!captcha) {
                    this.$notify.warn('验证码不能为空！');
                    return false;
                }

                //发送请求

                let result = await api.login(phone, password, captcha)
                if (!result.success) {

                    //出错了，弹出提示信息
                    this.$notify.danger(result.message);

                    //更新验证码
                    this.randomCode = parseInt(Math.random() * (10000 - 1 + 1) + 1, 10);
                    this.loginFrom.captcha = ''
                } else {
                    this.$notify.success(result.message)


                    //获取用户信息并存储到vuex
                    this.$store.dispatch('setUserInfo', this)

                    //跳转首页
                    this.$router.replace(this.lastUrl)

                }


            },

            /**
             * 返回上一页
             */
            back() {
                this.$router.back()
            },


            /**
             * 加载验证码
             */
            loadCaptcha() {
                this.randomCode = parseInt(Math.random() * (10000 - 1 + 1) + 1, 10);

                fetch(this.captchaUrl + this.randomCode).then((response) => {
                    //获取到key
                    let l_c_i = response.headers.get("l_c_i");
                    localStorage.setItem("l_c_i", l_c_i);

                    response.blob().then(function (myBlob) {
                        const urlCreator = window.URL || window.webkitURL;
                        document.getElementById("captcha").src = urlCreator.createObjectURL(myBlob);
                    });
                });
            }
        }
    }
</script>

<style scoped>
    .title {
        margin-top: 35px;
        text-align: center;
        font-size: 67px;
        color: #37f;
    }

    .loginform {
        padding: 20px 20px 0;
    }

    .nut-textinput {
        margin-top: 20px;
    }


    .captchaInput {

    }

    .captchaImg {

        margin: 17px 0 0 15px;


    }

    .loginbtn {
        text-align: center;
        margin-top: 20px;
    }

    .loginbtn button {
        width: 100%;
        height: 32px;
        background-color: #409eff;
        color: #fff;
        border: none;
        border-radius: 5px;
    }

    .other {
        display: flex;
        justify-content: space-between;

        font-size: 17px;
        padding: 20px 20px 0;
        color: #606bc2;
    }

    .copyright {
        margin-top: 252px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        text-align: center;
        font-size: 12px;
        color: #666;
    }

    .copyright .about {
        margin-top: 10px;
    }


</style>
