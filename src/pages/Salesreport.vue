<template>
  <!-- <div class="mask">
      <div class="left">
          <img :src="url" alt="">
      </div>
      
      <div class="right">

      </div>
  </div> -->
  <img id="domImg" :src="url" height="100" width="100" crossorigin="anonymous" /><!--后面的属性允许获取网络上的图片-->
  <!-- <img src="https://th.bing.com/th/id/OIP.J6U_ajwvDqAD3jUu738ngQHaEo?w=282&h=180&c=7&r=0&o=5&pid=1.7" alt=""> -->
  <button @click="getColor">获取颜色</button>
  <input type="file" @change="handleFileChange">

  <div class="container">
      <p>当前颜色: </p>
      <span v-for="(color, index) in colors" :key="index"
          :style="{ backgroundColor: `rgb(${color.join(',')})` }"></span>
  </div>
  <div class="container">
      <p>低饱和度: </p>
      <span v-for="(color, index) in fadedColors" :key="index"
          :style="{ backgroundColor: `rgb(${color.join(',')})` }"></span>
  </div>
  <div class="container">
      <p>莫兰迪色: </p>
      <span v-for="(color, index) in morandi" :key="index"
          :style="{ backgroundColor: `rgb(${color.join(',')})` }"></span>
  </div>
  <div class="container">
      <p>深色 </p>
      <span v-for="(color, index) in classColors.dark" :key="index"
          :style="{ backgroundColor: color }"></span>
  </div>
  <div class="container">
      <p>浅色 </p>
      <span v-for="(color, index) in  classColors.light" :key="index"
          :style="{ backgroundColor: color }"></span>
  </div>
  <!-- <div class="container">
      <p>莫兰迪配色: </p>
      <span v-for="(color, index) in morandi" :key="index"
      :style="{ backgroundColor: color }"></span>
  </div> -->
  <!-- <Card/> -->
</template>

<script setup lang="ts">
import { onMounted, reactive, ref} from 'vue'
import ColorThief from "colorthief";
// import Card from './Card.vue'

const morandiColors = [
  '#ebd9cb', '#f9f6f1', '#dbe2ec', '#8d91aa', '#e2e2e2',
  '#decece', '#f7f0ea', '#e7adac', '#78677a', '#d8b0b0',
  '#f0f0f2', '#e7e7e5', '#acd4d6', '#797979', '#dfdfdf',
  '#ebc1a8', '#ebdac8', '#f6f2f1', '#cac0b7', '#d2d3d5',
  '#a2886d', '#c3bab1', '#f1e2db', '#daccc1', '#bfcac2',
  '#013e41', '#c6dee0', '#f7edeb', '#a6baaf', '#4a475c',
  '#ceaeb9', '#e9cec3', '#eed9d4', '#8d7477', '#6e4740',
  '#5e5d65', '#cb9b8f', '#f6e1dc', '#b5bac0', '#5b7493',
  '#e3bcb5', '#a7bec6', '#f4f4f4', '#b98a82', '#f5f4f0',
  '#bfbfc1', '#b4a29e', '#e0d3c3', '#ebe8e3', '#e4dbd2',
  '#bea8aa', '#9aa2ad', '#9b8d8c', '#decfcc'
];

const colors: any = reactive({
  color: [],
  color1: [],
  color2: [],
  color3: [],
  color4: [],
})

const fadedColors: any = reactive({
  color: [],
  color1: [],
  color2: [],
  color3: [],
  color4: [],
})

const morandi: any = reactive({
  color: [],
  color1: [],
  color2: [],
  color3: [],
  color4: [],
})

const classColors: any = reactive({
  dark:[],
  light:[]
})
const url = ref('')

onMounted(() => {

})
const getColor = () => {
  let domImg = document.querySelector('#domImg');
  let colorthief = new ColorThief();
  colors.color = colorthief.getPalette(domImg)[0];
  colors.color1 = colorthief.getPalette(domImg)[2];
  colors.color2 = colorthief.getPalette(domImg)[4];
  colors.color3 = colorthief.getPalette(domImg)[6];
  colors.color4 = colorthief.getPalette(domImg)[8];
  console.log(colors.color)
  fadeColors();
  colorToMorandi();
}

const fadeColors = () => {
  fadedColors.color = fadeColor(colors.color);
  fadedColors.color1 = fadeColor(colors.color1);
  fadedColors.color2 = fadeColor(colors.color2);
  fadedColors.color3 = fadeColor(colors.color3);
  fadedColors.color4 = fadeColor(colors.color4);
  console.log(fadedColors);
};

const colorToMorandi = () => {
  morandi.color = hexToRgb(findNearestColor(colors.color, morandiColors))
  morandi.color1 = hexToRgb(findNearestColor(colors.color1, morandiColors))
  morandi.color2 = hexToRgb(findNearestColor(colors.color2, morandiColors))
  morandi.color3 = hexToRgb(findNearestColor(colors.color3, morandiColors))
  morandi.color4 = hexToRgb(findNearestColor(colors.color4, morandiColors))

    
  const res = classifyColors([findNearestColor(colors.color, morandiColors),
  findNearestColor(colors.color1, morandiColors),
  findNearestColor(colors.color2, morandiColors),
  findNearestColor(colors.color3, morandiColors),
  findNearestColor(colors.color4, morandiColors)])
  classColors.dark = res.dark
  classColors.light = res.light
  // classColors.value = classifyColors(res)
  // console.log(classColors.value)
}

const fadeColor = (color: number[]) => {
  // 降低RGB值来降低饱和度
  const fadedColor = color.map((value: any) => value * 0.7); // 这里可以根据需求调整淡化的程度
  return fadedColor;
};

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
      const reader = new FileReader();
      reader.onload = () => {
          setTimeout(getColor, 100);
          url.value = reader.result as string;

      };
      reader.readAsDataURL(file);
  }
}

const findNearestColor = (color: number[], morandiColors: string[]) => {
  let minDistance = Infinity;
  let nearestColor = '';

  for (const morandiColor of morandiColors) {
      const distance = Math.sqrt(
          Math.pow(color[0] - parseInt(morandiColor.slice(1, 3), 16), 2) +
          Math.pow(color[1] - parseInt(morandiColor.slice(3, 5), 16), 2) +
          Math.pow(color[2] - parseInt(morandiColor.slice(5, 7), 16), 2)
      );

      if (distance < minDistance) {
          minDistance = distance;
          nearestColor = morandiColor;
      }
  }

  return nearestColor;
};
// 将 RGB 颜色转换为十六进制颜色
function rgbToHex(r: number, g: number, b: number) {
  // 将每个 RGB 分量的值转换为十六进制，并补齐为两位
  const componentToHex = (c: number) => {
      const hex = c.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
  };

  // 将 RGB 分量转换为十六进制
  const redHex = componentToHex(r);
  const greenHex = componentToHex(g);
  const blueHex = componentToHex(b);

  // 合并十六进制值并返回
  return '#' + redHex + greenHex + blueHex;
}

// 将十六进制颜色转换为 RGB 颜色
function hexToRgb(hex: string) {
  // 去除可能存在的 '#' 符号
  hex = hex.replace(/^#/, '');

  // 将十六进制颜色值拆分成三个部分：红色、绿色和蓝色
  const red = parseInt(hex.substring(0, 2), 16);
  const green = parseInt(hex.substring(2, 4), 16);
  const blue = parseInt(hex.substring(4, 6), 16);

  // 返回 RGB 颜色值的对象
  // return { r: red, g: green, b: blue };
  // 返回字符串
  const rgb = [red, green, blue]
  return rgb
}

// 示例用法：RGB 到十六进制
const hexColor = rgbToHex(255, 128, 0);
console.log(hexColor); // 输出 '#ff8000'

// 示例用法：十六进制到 RGB
const rgbColor = hexToRgb('#ff8000');
console.log(rgbColor); // 输出 [255,128,0]

// 定义颜色分类的接口
interface ColorGroup {
  dark: string[];
  light: string[];
}

// 函数：根据颜色深浅进行分类
function classifyColors(colors: string[]): ColorGroup {
  const darkThreshold = 128; // 颜色深浅的阈值，可以根据实际情况调整
  const colorGroup: ColorGroup = {
      dark: [],
      light: []
  };

  for (const color of colors) {
      // 将颜色转换为RGB值
      const rgb = hexToRgb(color);
      // 计算颜色的亮度
      const brightness = calculateBrightness(rgb);

      // 根据亮度分类
      if (brightness < darkThreshold) {
          colorGroup.dark.push(color);
      } else {
          colorGroup.light.push(color);
      }
  }

  return colorGroup;
}

// 函数：计算颜色的亮度
function calculateBrightness(rgb: number[]): number {
  // 使用加权平均法计算亮度
  // 这里简单地将红、绿、蓝的权重分别设为0.299、0.587、0.114
  return rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114;
}

// 使用示例
// const colortest: any = reactive(['#ffffff', '#000000', '#888888', '#ff0000', '#00ff00', '#0000ff'])
// const colorGroup = classifyColors(colortest);
// const dark = reactive(colorGroup.dark)
// const light = reactive(colorGroup.light)
// console.log(dark);
// console.log(light);
// 转换颜色数组为十六进制形式

</script>

<style lang="scss" scoped>
.mask {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  width: 1400px;
  height: 800px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: rgba(142, 142, 142, 0.19) 0px 6px 15px 0px;
  -webkit-box-shadow: rgba(142, 142, 142, 0.19) 0px 6px 15px 0px;
  border-radius: 12px;
  -webkit-border-radius: 12px;
  color: rgba(255, 255, 255, 0.75);

  .left {
      width: 600px;
      overflow: hidden;

      img {
          // display: block;
          // width: 600px;


          height: 700px;
      }
  }

  .right {
      width: 600px;
      height: 800px;
  }
}

.container {
  margin-top: 20px;
  width: 700px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;

  p {
      font-weight: 800;
      font-size: 20px;
      margin-left: 60px;
  }

  span {
      display: inline-block;
      width: 60px;
      height: 60px;
      border-radius: 60px;
      /* background-color: aquamarine; */
  }
}
</style>
