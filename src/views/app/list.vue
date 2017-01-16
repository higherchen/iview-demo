<style scoped lang="less">
    .search-form{
        padding: 10px 0px;
    }
</style>
<template>
    <Modal
        :visible.sync="new_app"
        title="新增App"
        @on-ok="ok"
        @on-cancel="cancel">
        <i-form class="form" :model="user_handle" label-position="left" :label-width="100">
            <Form-item label="App name">
                <i-input :value.sync="to_create.name" placeholder="请输入App名称"></i-input>
            </Form-item>
            <Form-item label="App key">
                <i-input :value.sync="to_create.app_key" placeholder="请输入App key"></i-input>
            </Form-item>
        </i-form>
    </Modal>
    <div class="search-form">
        <i-button type="primary" @click="new_app = true">新增App</i-button>
    </div>
    <div v-if="dataReady">
        <i-table border :columns="columns" :data="apps"></i-table>
        <Modal :visible.sync="confirm_modal" @on-ok="remove"><p>确认删除这个app？（请慎重操作）</p></Modal>
    </div>
</template>
<script>
    module.exports = {
        route: {
            data: function (transition) {
                this.getApps();
            }
        },
        data: function() {
            return {
                new_app: false,
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
                to_delete: 0,
                to_create: {
                    name: '',
                    app_key: ''
                },
                dataReady: false
            };
        },
        methods: {
            getApps () {
                var path = this.$route.path;
                var queryIndex = path.indexOf('?');
                var queryString = (queryIndex !== -1) ? path.substring(queryIndex) : '';
                this.$http.get('/api/apps' + queryString).then(function(response) {
                    this.apps = response.data.data ? response.data.data : [];
                    this.dataReady = true;
                });
            },
            ok () {
                this.$http.post('/api/apps', this.to_create).then(function(response){
                    if (parseInt(response.data.code) == 0) {
                        this.$Message.success('新增成功', 2);
                        this.apps.push({
                            id: parseInt(response.data.data.id),
                            name: this.to_create.name,
                            app_key: this.to_create.app_key,
                            app_secret: response.data.data.app_secret
                        });
                        this.to_create.name = this.to_create.app_key = '';
                    } else {
                        this.$Message.error('新增失败', 2);
                    }
                });
            },
            cancel () {
                this.$Message.info('点击了取消');
            },
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
                    } else {
                        this.$Message.error('删除失败', 2);
                    }
                });
            }
        }
    }
</script>