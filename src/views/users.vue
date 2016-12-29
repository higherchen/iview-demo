<style scoped lang="less">
    .pager{
        margin: 10px 0;
    }
</style>
<template>
    <i-table border :columns="columns" :data="users"></i-table>
    <div class="pager"><Page :total="total" :current="current" :page-size="20" show-total @on-change="setPager"></Page></div>
</template>
<script>
    module.exports = {
        route: {
            'data': function (transition) {
                return getUsers.call(this);
            }
        },
        data: function() {
            return {
                columns: [
                    {
                        title: 'ID',
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
                    }
                ],
                users: [],
                total: 0,
                current: 1
            };
        },
        methods: {
            setPager(page) {
                var $route = this.$route;
                $route.query.page = page;
                var newQuery = $route.query;

                $route.router.go({
                    path: "/users",
                    query: newQuery
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
            _this.users = response.data.data.users;
            _this.total = parseInt(response.data.data.total);
            return {
                users: _this.users,
                total: _this.total
            };
        });
    }

</script>