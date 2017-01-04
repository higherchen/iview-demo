<template>
    <h3>现在进入的是 用户 - {{ id }} 详情页</h3>
</template>
<script>
    module.exports = {
        data: function() {
            return {
                id : this.$route.params.id
            }
        }
    }
</script>