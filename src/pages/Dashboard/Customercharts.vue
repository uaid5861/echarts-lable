<template>
    <div class="zhong">
        <p class="title">Customer Satisfaction</p>
        <div id="totalmain"></div>
        <div class="bottomspan">
            <span>${{ totalLastMonth }}</span>
            <span>${{ totalThisMonth }}</span>
        </div>
    </div>
</template>

<script setup>
import * as echarts from "echarts";
import { onMounted, ref, computed } from "vue";

const thisdata = ref([25, 36, 31, 35, 30, 33, 37]);
const lastdata = ref([10, 22, 28, 23, 19, 23, 19]);
const totalThisMonth = computed(() => {
    return thisdata.value.reduce((acc, val) => acc + val, 0);
});

const totalLastMonth = computed(() => {
    return lastdata.value.reduce((acc, val) => acc + val, 0);
});

onMounted(() => {
    init();
});

// 初始化函数
function init() {
    const domElement = document.getElementById("totalmain");
    if (domElement) {
        // 基于准备好的dom，初始化echarts实例
        let Chart = echarts.init(domElement);
        // 绘制图表
        let options = {
            tooltip:{
                trigger:'axis',
                axisPointer:{
                    type:'line'
                }
            },
            grid: {
                top: '20px',
                // left: '20px',
                // right: '20px',
                // bottom: '50px'
            },
            legend: {
                data: ['Last Month', 'This Month'],
                icon: 'roundRect',
                bottom: 40,
            },
            xAxis: {
                data: ['', '', '', '', '', '', ''],
                axisTick: { show: false },
                axisLine: { show: false }
            },
            yAxis: {
                splitLine: { show: false },
                show: false
            },
            series: [
                {
                    name: 'Last Month',
                    data: lastdata.value,
                    type: 'line',
                    areaStyle: {},
                    smooth: true,
                    areaStyle: {
                        opacity: 0.4,
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 1, color: "#fff" },
                            { offset: 0, color: "#0080DA" },
                        ])
                    },
                },
                {
                    name: 'This Month',
                    data: thisdata.value,
                    type: 'line',
                    areaStyle: {
                        opacity: 0.4,
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 1, color: "#fff" },
                            { offset: 0, color: "#00E096" },
                        ])
                    },
                    smooth: true,
                }
            ]
        };
        // 渲染图表
        Chart.setOption(options);
    } else {
        console.error("DOM element with id 'totalmain' not found.");
    }
}
</script>

<style lang="scss" scoped>
.zhong {
    width: 460px;
    height: 300px;
    padding: 20px 20px;
    border-radius: 20px;
    background-color: #fff;
    box-sizing: border-box;

    .title {
        font-size: 20px;
        font-weight: 600;
        color: #05004E;
    }

    #totalmain {
        width: 620px;
        height: 250px;
        margin-left: -100px;
    }
    .bottomspan{
        width: 160px;
        margin: 0px auto;
        // background-color: pink;
        display: flex;
        justify-content: space-between;
        margin-top: -30px;
        span{
            font-weight: 600;
            font-size: 14px;
            color: #05004E;
        }
    }
}
</style>
