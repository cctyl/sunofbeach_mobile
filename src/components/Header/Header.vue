<template>
    <div   class="container">


        <nut-row>
            <nut-col :span="3">
                <div class="flex-content logo">
                   SOB
                </div>


            </nut-col>
            <nut-col :span="16">
                <div class="flex-content flex-content-light">
                    <nut-searchbar
                        v-model="val"
                        placeText="有什么想搜索的？"
                    ></nut-searchbar>
                </div>
            </nut-col>
            <nut-col :span="3">
                <div class="flex-content loginText">登录</div>
            </nut-col>
            <nut-col :span="1">
                <span class="iconfont icon-more"></span>
            </nut-col>
        </nut-row>




    </div>
</template>

<script>
    export default {
        name: "Header.vue",
        data(){
            return{
                val:''
            }
        }

    }
</script>

<style scoped>

    .container{
        padding: 10px 5px;
    }


    .logo{
        text-align: center;
        height: 26px;
        line-height: 36px;
        font-size: 19px;
        color: #37f;
        margin-left: -5px;
    }

    .loginText{
        height: 26px;
        line-height: 36px;
        margin-left: 9px;


    }

    .icon-more{

        height: 26px;
        line-height: 36px;
        vertical-align: middle;
    }
</style>