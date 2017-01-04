<style scoped lang="less">
    .wrapper{
        height: 100%;
        .nav{
            width: 100%;
            height: 60px;
            position: fixed;
            background: #39f;
            color: #fff;
            line-height: 60px;
            padding: 0 20px;
            .nav-title{
                margin-left: 6px;
                font-size: 14px;
            }
        }
        .content{
            width: 100%;
            margin-top: 70px;
            .menu{
                position: fixed;
            }
            .main{
                position:relative;
                margin-left: 220px;
                padding: 0 20px;
            }
        }
    }
</style>
<template>
    <Row class="wrapper" type="flex">
        <Affix>
            <div class="nav">
                <Icon type="ios-paw" size="18"></Icon>
                <span class="nav-title">统一权限管理系统</span>
            </div>
        </Affix>
        <div class="content">
            <Menu class="menu" mode="vertical" :theme="theme2" :open-keys="['1']" width="220px" accordion>
                <Submenu key="1">
                    <template slot="title">
                        <Icon type="android-person"></Icon>
                        用户及权限管理
                    </template>
                    <Menu-item v-link="{path: '/users/'}" key="1-1">用户列表</Menu-item>
                    <Menu-item key="1-2">权限管理</Menu-item>
                </Submenu>
                <Submenu key="2">
                    <template slot="title">
                        <Icon type="briefcase"></Icon>
                        应用管理
                    </template>
                    <Menu-item key="2-1">应用列表</Menu-item>
                    <Menu-item key="2-2">权限组管理</Menu-item>
                </Submenu>
            </Menu>
            <div class="main">
                <router-view></router-view>
            </div>
        </div>
    </Row>
</template>
<script>
    export default {
        data () {
            return {
                theme1: 'primary',
                theme2: 'light'
            }
        },
        ready () {

        },
        beforeDestroy () {

        },
        methods: {

        }
    }
</script>
