<template>
    <div>
        <!--顶部栏-->
        <Header></Header>


        <router-view></router-view>

    </div>
</template>

<script>

    import Header from "./components/Header/Header";
    import api from './api'
    export default {
        name: "App",
        methods: {
            async getMoyuTopic() {
                let moyuTopicRes = await api.getMoyuTopic()
                console.log(moyuTopicRes)
            }
        },
        components:{
            Header
        }

    }
</script>

<style>

</style>