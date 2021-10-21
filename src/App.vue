<template>
    <div>
        <!--顶部栏  -->
        <Header v-show="$route.meta.showHeader"></Header>


        <router-view></router-view>

    </div>
</template>

<script>

    import Header from "./components/Header/Header";
    // import api from './api'

    export default {
        name: "App",
        methods: {


        },
        mounted() {
            //检查token时效并获取用户信息
            this.$store.dispatch('setUserInfo',this)

        },
        components: {
            Header
        }

    }
</script>

<style>

</style>
