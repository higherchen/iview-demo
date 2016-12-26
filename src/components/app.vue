<style scoped lang="less">
    .body{
        width: 100%;
        position: fixed;
        top: 70px;
        left: 0px;
        .nav{
            position: fixed;
        }
        .content{
            width: 100%;
            position: relative;
            margin-left: 220px;
            padding: 0 20px;
        }
    }
</style>
<template>
    <Menu @on-select="home" mode="horizontal" :theme="theme1">
        <Menu-item key="1">
            <Icon type="ios-paw" size="18"></Icon>
            统一权限管理系统
        </Menu-item>
    </Menu>
    <Row class="body" type="flex">
        <Menu @on-select="redirect" class="nav" mode="vertical" :theme="theme2" :open-keys="['1']" width="220px" accordion>
            <Submenu key="1">
                <template slot="title">
                    <Icon type="android-person"></Icon>
                    用户及权限管理
                </template>
                <Menu-item @on-select="users" key="1-1">用户列表</Menu-item>
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
        <div class="content">
            <router-view></router-view>
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
            home (key) {
                window.location.href = '/home';
            },
            redirect (key) {
                if (key == '1-1') {
                    window.location.href = '/users';
                }
            }
        }
    }
</script>
