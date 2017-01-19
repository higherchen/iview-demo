<style scoped lang="less">
    .form{
        padding: 20px 100px;
    }
</style>
<template>
    <i-form class="form" label-position="left" :label-width="100">
        <Form-item label="用户名">
            <i-input disabled :value.sync="username"></i-input>
        </Form-item>
        <Form-item label="昵称">
            <i-input :value.sync="nickname" placeholder="请输入昵称"></i-input>
        </Form-item>
        <Form-item label="邮箱">
            <i-input :value.sync="email" placeholder="请输入邮箱"></i-input>
        </Form-item>
        <Form-item label="手机">
            <i-input :value.sync="telephone" placeholder="请输入手机号码"></i-input>
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
                this.getUser();
            }
        },
        data: function() {
            return {
                id : this.$route.params.id,
                username: '',
                nickname: '',
                email: '',
                telephone: ''
            }
        },
        methods: {
            getUser () {
                var id = this.$route.params.id;
                this.$http.get('/api/users/' + id).then(function(response) {
                    this.username = response.data.data.username;
                    this.nickname = response.data.data.nickname;
                    this.email = response.data.data.email;
                    this.telephone = response.data.data.telephone;
                });
            },
            submit () {
                this.$http.post('/api/users/' + this.id, {
                    nickname: this.nickname,
                    email: this.email,
                    telephone: this.telephone
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