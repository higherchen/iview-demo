<template>
    <i-form v-ref:form-inline inline>
        <Form-item>
            <i-select :model.sync="current_app.id" placeholder="请选择一个app" style="width:200px" @on-change="appSelect" label-in-value>
                <i-option v-for="app in apps" :value="app.id">{{ app.name }}</i-option>
            </i-select>
        </Form-item>
        <Form-item>
            <i-button type="success" @click="add('point')">新增权限点</i-button>
        </Form-item>
        <Form-item>
            <i-button type="info" @click="add('category')">新增权限分类</i-button>
        </Form-item>
    </i-form>
    <Modal :visible.sync="new_point" title="新增权限点" @on-ok="add('point')">
        <i-form label-position="left" :label-width="100">
            <p>当前所在app：{{ current_app.name }}</p><br />
            <Form-item label="权限点名称">
                <i-input :value.sync="name" placeholder="请输入名称"></i-input>
            </Form-item>
            <Form-item label="描述">
                <i-input :value.sync="description" placeholder="请输入描述"></i-input>
            </Form-item>
            <Form-item label="唯一标识">
                <i-input :value.sync="mark" placeholder="请输入唯一标识"></i-input>
            </Form-item>
        </i-form>
    </Modal>
    <Modal :visible.sync="new_category" title="新增权限分类" @on-ok="add('category')">
        <i-form label-position="left" :label-width="100">
            <p>当前所在app：{{ current_app.name }}</p><br />
            <Form-item label="权限分类名称">
                <i-input :value.sync="name" placeholder="请输入名称"></i-input>
            </Form-item>
            <Form-item label="描述">
                <i-input :value.sync="description" placeholder="请输入描述"></i-input>
            </Form-item>
        </i-form>
    </Modal>
    <div v-if="current_app.id">
        <Tabs type="card" active-key="point">
            <Tab-pane label="权限点" key="point">
                <i-table border :columns="point_columns" :data="points"></i-table>
            </Tab-pane>
            <Tab-pane label="权限分类" key="category">
                <i-table border :columns="category_columns" :data="categories"></i-table>
            </Tab-pane>
        </Tabs>
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
                apps: [],
                new_point: false,
                new_category: false,
                current_app: {
                    id: 0,
                    name: ''
                },
                point_columns: [
                    {
                        title: 'ID',
                        width: 60,
                        key: 'id'
                    },
                    {
                        title: '权限点名称',
                        key: 'name'
                    },
                    {
                        title: '描述',
                        key: 'description'
                    },
                    {
                        title: '唯一标识',
                        key: 'data'
                    }
                ],
                category_columns: [
                    {
                        title: 'ID',
                        width: 60,
                        key: 'id'
                    },
                    {
                        title: '权限点名称',
                        key: 'name'
                    },
                    {
                        title: '描述',
                        key: 'description'
                    }
                ],
                points: [],
                categories: []
            };
        },
        methods: {
            getApps () {
                this.$http.get('/api/apps').then(function(response) {
                    this.apps = response.data.data ? response.data.data : [];
                });
            },
            appSelect (app) {
                this.current_app.id = app.value;
                this.current_app.name = app.label;
                // 加载权限点、权限分类列表
            },
            add (type) {
                if (!this.current_app.id) {
                    this.$Message.error('请选择一个app');
                    return false;
                }

                switch (type) {
                    case 'point':
                        this.new_point = true;
                        break;
                    
                    case 'category':
                        this.new_category = true;
                        break;

                    default:
                        this.$Message.error('参数错误');
                }
            }
        }
    }
</script>