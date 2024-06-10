<!-- home.vue -->
<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="300px" class="aside">
                <Aside />
            </el-aside>
            <el-container>
                <el-header class="header">
                    <Header />
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>


<script setup>
import Header from '@/components/Header/Header.vue';
import Aside from '@/components/Aside/Aside.vue'

</script>

<style lang="scss" scoped>
.aside{
    height: 100vh;
    background-color: #fff;
}
.header{
    height: 80px;
    background-color: #fff;
}
</style>