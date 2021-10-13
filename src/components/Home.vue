<template>
    <div>

        <!--标签栏-->
        <nut-scroller class="tagScroll">

            <div slot="list" class="tagItem nut-hor-list-item " :class="{tagCurrent: currentTag==-1}"
                @click="currentTag=-1"
            >
                <span class="tagTitle">推荐</span>
            </div>

            <div slot="list" class="tagItem nut-hor-list-item " :class="{tagCurrent: currentTag==index}"
                 v-for="(item,index) in categoryList" :key="item.id"
                 @click="currentTag=index"
            >
                <span class="tagTitle">{{item.categoryName}}</span>
            </div>

        </nut-scroller>


        <!--轮播图，仅为推荐页面时使用-->

        <!--文章列表-->
    </div>
</template>

<script>
    import api from '../api'

    export default {
        name: "Home.vue",
        data() {
            return {
                categoryList: [], //顶部标签数组
                currentTag: -1,//记录当前是哪个tag被选中了
            }
        },
        methods: {
            /**
             * 获取顶部标签数据
             */
            async getCategoryList() {
                let result = await api.getCategoryList()
                this.categoryList = result.data
            }
        },
        mounted() {

            this.getCategoryList()


        }
    }
</script>

<style scoped>

    /*---------------标签栏 start---------------*/
    .tagScroll {
        white-space: nowrap;
        background-color: #E5E9EC;
        height: 40px;
    }

    .tagItem {
        box-sizing:  border-box;

        height: 40px;
        line-height: 40px;
        text-align: center;

        font-weight: bold;
        font-size: 15px;
        margin: 0 10px;
    }

    /*当前被选中的tag*/
    .tagCurrent {
        border-bottom: 2px solid #66ccff;
        margin-bottom: 1px;
    }
    /*---------------标签栏 end---------------*/




</style>