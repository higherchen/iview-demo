<template>
    <i-table border :columns="columns" :data="users"></i-table>
</template>
<script>
    module.exports = {
        data () {
            this.$http.get('/api/users').then(function(response) {
                this.$set('users', response.data.users);
            });
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
                users: []
            }
        }
    }
</script>