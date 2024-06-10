<template>
  <card />
  <div class="container1">
    <totalcharts />
    <customer />
    <target />
    
  </div>
</template>

<script setup>
import card from '@/pages/Dashboard/card.vue'
import totalcharts from './Dashboard/totalcharts.vue';
import customer from './Dashboard/Customercharts.vue';
import target from './Dashboard/Targetcharts.vue';
</script>

<style lang="scss" scoped>
.container1{
  width: 82vw;
  height: 300px;
  // background-color: pink;
  margin-top: 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  // padding: 10px 0;
}
</style>
