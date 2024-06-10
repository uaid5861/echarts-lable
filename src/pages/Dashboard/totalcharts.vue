<template>

    <div class="left">
        <p class="title">Total Revenue</p>
        <div id="customermain">

        </div>
    </div>

</template>

<script setup>
import * as echarts from "echarts";
import { onMounted } from "vue";

onMounted(() => {
    init();
});
//初始化函数
function init() {
    // 基于准备好的dom，初始化echarts实例
    let Chart = echarts.init(document.getElementById("customermain"));
    // 绘制图表
    let options = {
        grid: {
            top:'40px',
            left:'25px',
            right:'20px'
        },
        color: ['#0095FF', '#00E096'],
        legend: {
            data: ['Online Sales', 'Offline Sales'],
            bottom: '10',
            // y: 'top',
            icon: 'circle',
            orient: 'horizontal',
            color: '#7b91b0'
        },
        xAxis: {
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: { show: false },
            axisLine: {
                lineStyle: {
                    color: '#7B91B0',
                    // width: '3'
                }
            }
        },
        yAxis: {
            axisTick: false,
            axisLine: {
                lineStyle: {
                    color: '#7B91B0',
                    // width: '3'
                }
            }
        },
        series: [
            {
                name: 'Online Sales',
                type: 'bar',
                data: [19, 15, 14, 20, 24, 28, 17],
                barWidth: '15%',
                // showSymbol: false,
                itemStyle: {
                    normal: {
                        //这里设置柱形图圆角 [左上角，右上角，右下角，左下角]
                        barBorderRadius: 2,
                    }
                }
            },
            {
                name: 'Offline Sales',
                type: 'bar',
                data: [26, 24, 18, 22, 23, 20, 27],
                barWidth: '15%',
                itemStyle: {
                    normal: {
                        //这里设置柱形图圆角 [左上角，右上角，右下角，左下角]
                        barBorderRadius: 2,
                    }
                }
            }
        ],

    };
    // 渲染图表
    Chart.setOption(options);
}
</script>

<style lang="scss" scoped>
.left {
    width: 600px;
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

    #customermain {
        width: 580px;
        height: 250px;
        margin: auto;
        // margin-left: -40px;
        // margin-top: -20px;
    }
}
</style>
