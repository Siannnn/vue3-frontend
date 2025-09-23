<template>
<el-card>
    <div class="box">
<img :src="userStore.avatar" alt="" class="avatar"></img>
<div class="bottom">
    <h3 class="title">{{ getTime() }}好呀{{ userStore.username }}</h3>
    <p>路桥卫士运营平台</p>
</div>
    </div>
    
</el-card>
<el-icon><Monitor /></el-icon>
<svg-icon name="welcome" width="500px" height="500px"></svg-icon>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user';
let userStore = useUserStore();
import { getTime } from '@/utils/time';
import SvgIcon from '@/components/SvgIcon/index.vue'; // 导入组件
</script>
<style scoped lang="scss">
.box{
    display:flex;

    .avatar{
        width:60px;
        height:60px;
        border-radius:50%;
        margin-right:10px;
        margin-left:100px;
    }
    .title{
        margin:0;
        font-weight:500;
        font-size:30px;
        margin-bottom:20px;
    }

    .bottom{
        margin-top:10px;
        p{
            margin:0;
            color:#999;
        }
    }
}
</style>
