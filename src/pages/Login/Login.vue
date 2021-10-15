<template>
    <div>

        <!--导航栏-->
        <nut-navbar
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
                        maxlength="5"
                        :clearBtn="true"
                        :disabled="false"
                />

                <nut-textinput
                        placeholder="请输入密码"
                        v-model="loginFrom.password"
                        type="password"
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
                        <img class="captchaImg" :src="captchaUrl+randomCode" @click="randomCode = +new Date()" alt="">
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
    </div>
</template>

<script>

    export default {
        name: "Login",
        data() {
            return {
                captchaUrl: 'https://api.sunofbeach.net/uc/ut/captcha?code=',
                randomCode:'',
                loginFrom: {
                    phone: '', //手机号
                    password: '',//密码
                    captcha: ''//验证码
                }
            }
        },
        mounted() {


        },
        methods: {
            /**
             * 用户登录
             */
            login() {
                console.log('点击了登录')
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

    .captchaImg{

        margin: 17px 0  0 15px;


    }

    .loginbtn{
        text-align: center;
        margin-top: 20px;
    }
    .loginbtn button{
        width: 100%;
        height: 32px;
        background-color: #409eff;
        color: #fff;
        border: none;
        border-radius: 5px;
    }

    .other{
        display: flex;
        justify-content: space-between;

        font-size: 17px;
        padding: 20px 20px 0;
        color: #2d5593;
    }



</style>