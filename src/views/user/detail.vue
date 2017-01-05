<style scoped lang="less">
    .form{
        padding: 20px 100px;
        .form-group{
            font-weight: 700;
            font-size: 14px;
            margin-bottom: 1em;
        }
    }
</style>
<template>
    <div class="form">
        <div class="form-group">
            <Row>
                <i-col span="4">用户名：</i-col>
                <i-col span="20"><i-input disabled :value.sync="username" placeholder="请输入用户名"></i-input></i-col>
            </Row>
        </div>
        <div class="form-group">
            <Row>
                <i-col span="4">昵称：</label></i-col>
                <i-col span="20"><i-input :value.sync="nickname" placeholder="请输入昵称"></i-input></i-col>
            </Row>
        </div>
        <div class="form-group">
            <Row>
                <i-col span="4">邮箱：</label></i-col>
                <i-col span="20"><i-input :value.sync="email" placeholder="请输入邮箱"></i-input></i-col>
            </Row>
        </div>
        <div class="form-group">
            <Row>
                <i-col span="4">手机：</label></i-col>
                <i-col span="20"><i-input :value.sync="telephone" placeholder="请输入手机"></i-input></i-col>
            </Row>
        </div>
        <div class="form-group">
            <center>
                <i-button type="success" @click="submit">提交</i-button> 
                <i-button @click="back">返回</i-button>
            </center>
        </div>
    </div>
</template>
<script>
    module.exports = {
        route: {
            'data': function (transition) {
                return getUser.call(this);
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

    function getUser() {
        var _this = this;
        var id = _this.$route.params.id;
        return _this.$http.get('/api/users/' + id).then(function(response) {
            _this.username = response.data.data.username;
            _this.nickname = response.data.data.nickname;
            _this.email = response.data.data.email;
            _this.telephone = response.data.data.telephone;
            return {
                username: _this.username,
                nickname: _this.nickname,
                email: _this.email,
                telephone: _this.telephone
            };
        });
    }
</script>