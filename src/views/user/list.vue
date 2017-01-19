<style scoped lang="less">
    .pager{
        margin: 10px 0;
    }
</style>
<template>
    <Modal :visible.sync="new_user" title="新增用户" @on-ok="add">
        <i-form label-position="left" :label-width="100">
            <Form-item label="账号">
                <i-input :value.sync="to_create.username" placeholder="请输入账号（用户名）"></i-input>
            </Form-item>
            <Form-item label="昵称">
                <i-input :value.sync="to_create.nickname" placeholder="请输入昵称"></i-input>
            </Form-item>
            <Form-item label="邮箱">
                <i-input :value.sync="to_create.email" placeholder="请输入邮箱"></i-input>
            </Form-item>
            <Form-item label="手机">
                <i-input :value.sync="to_create.telephone" placeholder="请输入手机号"></i-input>
            </Form-item>
        </i-form>
    </Modal>
    <i-form v-ref:form-inline inline>
        <Form-item>
            <i-input type="text" :value.sync="keyword" placeholder="输入账号/昵称"></i-input>
        </Form-item>
        <Form-item>
            <i-button type="primary" @click="search()">搜索</i-button>
            <i-button type="primary" @click="new_user = true">新增用户</i-button>
        </Form-item>
    </i-form>
    <div v-if="dataReady">
        <i-table :columns="columns" :data="users" border></i-table>
        <Modal :visible.sync="confirm_modal" @on-ok="remove"><p>确认删除这个用户？</p></Modal>
        <div class="pager">
            <Page :total="total" :current="current" :page-size="20" show-total @on-change="setPager"></Page>
        </div>
    </div>
</template>
<script>
    module.exports = {
        route: {
            data: function (transition) {
                this.getUsers();
                if (this.$route.query.name) {
                    this.keyword = this.$route.query.name;
                }
            }
        },
        data: function() {
            return {
                keyword: '',
                new_user: false,
                columns: [
                    {
                        title: 'ID',
                        width: 60,
                        key: 'id'
                    },
                    {
                        title: '账号',
                        key: 'username'
                    },
                    {
                        title: '昵称',
                        key: 'nickname'
                    },
                    {
                        title: '邮箱',
                        key: 'email'
                    },
                    {
                        title: '手机',
                        key: 'telephone'
                    },
                    {
                        title: '操作',
                        width: 180,
                        key: 'action',
                        render (row, column, index) {
                            return `<i-button type="primary" size="small" v-link="{path: '/users/${row.id}'}">更新</i-button> <i-button type="error" size="small" @click="confirm_remove(${index})">删除</i-button>`;
                        }
                    }
                ],
                confirm_modal: false,
                users: [],
                total: 0,
                current: 1,
                to_delete: 0,
                to_create: {
                    username: '',
                    nickname: '',
                    email: '',
                    telephone: ''
                },
                dataReady: false
            };
        },
        methods: {
            search () {
                var path = this.$route.path;
                var $route = this.$route;
                var keyword = this.keyword;
                if (keyword) {
                    $route.query.name = keyword;
                } else {
                    delete($route.query.name);
                }
                var newQuery = $route.query;
                $route.router.go({
                    path: "/users/",
                    query: newQuery
                });
            },
            add () {
                this.$http.post('/api/users', this.to_create).then(function(response){
                    if (parseInt(response.data.code) == 0) {
                        this.$Message.success('新增成功', 2);
                        this.users.splice(0, 0, {
                            id: parseInt(response.data.data.id),
                            username: this.to_create.username,
                            nickname: this.to_create.nickname,
                            email: this.to_create.email,
                            telephone: this.to_create.telephone
                        });
                        this.to_create.username = this.to_create.nickname = this.to_create.email = this.to_create.telephone = '';
                    } else {
                        this.$Message.error('新增失败', 2);
                    }
                });
            },
            getUsers () {
                var path = this.$route.path;
                var queryIndex = path.indexOf('?');
                var queryString = (queryIndex !== -1) ? path.substring(queryIndex) : '';
                this.$http.get('/api/users' + queryString).then(function(response) {
                    if (response.data.data.users) {
                        this.users = response.data.data.users;
                    }
                    this.total = parseInt(response.data.data.total);
                    this.dataReady = true;
                });
            },
            setPager (page) {
                var $route = this.$route;
                $route.query.page = page;
                var newQuery = $route.query;
                $route.router.go({
                    path: "/users/",
                    query: newQuery
                });
            },
            confirm_remove (index) {
                this.confirm_modal = true;
                this.to_delete = index;
            },
            remove () {
                this.$http.delete('/api/users/' + this.users[this.to_delete].id).then(function(response) {
                    if (parseInt(response.data.code) == 0) {
                        this.$Message.success('删除成功', 2);
                        this.users.splice(this.to_delete, 1);
                        this.to_delete = 0;
                        this.total--;
                    } else {
                        this.$Message.error('删除失败', 2);
                    }
                });
            }
        }
    }
</script>