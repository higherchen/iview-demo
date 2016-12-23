<style scoped lang="less">
    .index{
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        text-align: center;
        h1{
            height: 150px;
            img{
                height: 100%;
            }
        }
        h2{
            color: #666;
        }
        .ivu-row{
            height: 100%;
        }
    }
    .body{
        float: left;
        width: 100%;
        margin-top: 15px;
        .content{
            padding-left: 10px;
            padding-right: 20px;
            .main{
                margin-top: 10px;
            }
        }
    }
    
</style>
<template>
    <Menu mode="horizontal" :theme="theme1">
        <Menu-item key="1">
            <Icon type="ios-paw" size="18"></Icon>
            统一权限管理系统
        </Menu-item>
    </Menu>
    <Row class="body" type="flex">
        <i-col span="3">
        <Menu mode="vertical" :theme="theme2" :open-keys="['1']" width="220px" accordion>
            <Submenu key="1">
                <template slot="title">
                    <Icon type="android-person"></Icon>
                    用户及权限管理
                </template>
                <Menu-item key="1-1">用户列表</Menu-item>
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
        </i-col>
        <i-col span="21">
	<div class="content">
            <Breadcrumb>
                <Breadcrumb-item href="/">Home</Breadcrumb-item>
                <Breadcrumb-item>用户列表</Breadcrumb-item>
            </Breadcrumb>
            <div class="main">
                <i-table border :columns="columns1" :data="data1"></i-table>
            <div>
        </div>
        </i-col>
    </Row>
</template>
<script>
    export default {
        data () {
            return {
                theme1: 'primary',
                theme2: 'light',
                columns1: [
                    {
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '年龄',
                        key: 'age'
                    },
                    {
                        title: '地址',
                        key: 'address'
                    }
                ],
                data1: [
                    {
                        name: '王小明',
                        age: 18,
                        address: '北京市朝阳区芍药居'
                    },
                    {
                        name: '张小刚',
                        age: 25,
                        address: '北京市海淀区西二旗'
                    },
                    {
                        name: '李小红',
                        age: 30,
                        address: '上海市浦东新区世纪大道'
                    },
                    {
                        name: '周小伟',
                        age: 26,
                        address: '深圳市南山区深南大道'
                    }
                ]
            }
        }
    }
</script>

