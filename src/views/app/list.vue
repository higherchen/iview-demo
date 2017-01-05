<template>
    <i-table border :columns="columns" :data="apps"></i-table>
    <Modal :visible.sync="confirm_modal" @on-ok="remove"><p>确认删除这个app？（请慎重操作）</p></Modal>
</template>
<script>
    module.exports = {
        route: {
            data: function (transition) {
                return getApps.call(this);
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
                        title: 'App Name',
                        key: 'name'
                    },
                    {
                        title: 'App Key',
                        key: 'app_key'
                    },
                    {
                        title: 'App Secret',
                        key: 'app_secret'
                    },
                    {
                        title: '操作',
                        width: 180,
                        key: 'action',
                        render (row, column, index) {
                            return `<i-button type="primary" size="small" v-link="{path: '/apps/${row.id}'}">更新</i-button> <i-button type="error" size="small" @click="confirm_remove(${index})">删除</i-button>`;
                        }
                    }
                ],
                confirm_modal: false,
                apps: [],
                to_delete: 0
            };
        },
        methods: {
            confirm_remove (index) {
                this.confirm_modal = true;
                this.to_delete = index;
            },
            remove () {
                this.$http.delete('/api/apps/' + this.apps[this.to_delete].id).then(function(response) {
                    if (parseInt(response.data.code) == 0) {
                        this.$Message.success('删除成功', 2);
                        this.apps.splice(this.to_delete, 1);
                        this.to_delete = 0;
                        this.total--;
                    } else {
                        this.$Message.error('删除失败', 2);
                    }
                });
            }
        }
    }

    function getApps() {
        var _this = this;
        var path = _this.$route.path;
        var queryIndex = path.indexOf('?');
        var queryString = (queryIndex !== -1) ? path.substring(queryIndex) : '';
        return _this.$http.get('/api/apps' + queryString).then(function(response) {
            _this.apps = response.data.data;
            return {
                apps: _this.apps
            };
        });
    }

</script>