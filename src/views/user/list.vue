<style scoped lang="less">
    .pager{
        margin: 10px 0;
    }
</style>
<template>
    <i-table border :columns="columns" :data="users"></i-table>
    <Modal :visible.sync="confirm_modal" @on-ok="remove"><p>确认删除这个用户？</p></Modal>
    <div class="pager"><Page :total="total" :current="current" :page-size="20" show-total @on-change="setPager"></Page></div>
</template>
<script>
    module.exports = {
        route: {
            data: function (transition) {
                return getUsers.call(this);
            }
        },
        data: function() {
            return {
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
                to_delete: 0
            };
        },
        methods: {
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

    function getUsers() {
        var _this = this;
        var path = _this.$route.path;
        var queryIndex = path.indexOf('?');
        var queryString = (queryIndex !== -1) ? path.substring(queryIndex) : '';
        return _this.$http.get('/api/users' + queryString).then(function(response) {
            _this.users = response.data.data.users ? response.data.data.users : [];
            _this.total = parseInt(response.data.data.total);
            return {
                users: _this.users,
                total: _this.total
            };
        });
    }

</script>