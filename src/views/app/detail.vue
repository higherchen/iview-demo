<style scoped lang="less">
    .form{
        padding: 20px 100px;
    }
</style>
<template>
    <i-form class="form" label-position="left" :label-width="100">
        <Form-item label="App name">
            <i-input :value.sync="name" placeholder="请输入App名称"></i-input>
        </Form-item>
        <Form-item label="App key">
            <i-input :value.sync="app_key" placeholder="请输入App key"></i-input>
        </Form-item>
        <Form-item label="App secret">
            <i-input :value.sync="app_secret" placeholder="请输入App secret"></i-input>
        </Form-item>
        <Form-item>
            <i-button type="primary" @click="submit">提交</i-button>
            <i-button type="ghost" @click="back" style="margin-left: 8px">取消</i-button>
        </Form-item>
    </i-form>
</template>
<script>
    module.exports = {
        route: {
            'data': function (transition) {
                this.getApp();
            }
        },
        data: function() {
            return {
                id : this.$route.params.id,
                name: '',
                app_key: '',
                app_secret: ''
            }
        },
        methods: {
            getApp () { 
                var id = this.$route.params.id;
                this.$http.get('/api/apps/' + id).then(function(response) {
                    this.name = response.data.data.name;
                    this.app_key = response.data.data.app_key;
                    this.app_secret = response.data.data.app_secret;
                });
            },
            submit () {
                this.$http.post('/api/apps/' + this.id, {
                    name: this.name,
                    app_key: this.app_key,
                    app_secret: this.app_secret
                }).then(function(response) {
                    if (parseInt(response.data.code) == 0) {
                        this.$Message.success('更新成功', 1, function () {
                            window.history.go(-1);
                        });
                    } else {
                        this.$Message.error('更新失败', 2);
                    }
                });
            },
            back () {
                window.history.go(-1);
            }
        }
    }
</script>