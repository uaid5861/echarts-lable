<template>
  <div class="container">
    <div class="title">{{ routeTitle }}</div>
    <div class="container-input">
      <input type="text" placeholder="Search" name="text" class="input" v-model="search" @keyup.enter="anxia">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M23.414 20.586L18.337 15.509C19.386 13.928 20 12.035 20 10C20 4.486 15.514 0 10 0C4.486 0 0 4.486 0 10C0 15.514 4.486 20 10 20C12.035 20 13.928 19.386 15.509 18.337L20.586 23.414C21.366 24.195 22.634 24.195 23.414 23.414C24.195 22.633 24.195 21.367 23.414 20.586ZM3 10C3 6.14 6.14 3 10 3C13.86 3 17 6.14 17 10C17 13.86 13.86 17 10 17C6.14 17 3 13.86 3 10Z"
          fill="#5D5FEF" />
      </svg>

    </div>
    <div class="avatar">
      <el-badge :value="1" class="item">
        <el-icon :size="20" class="icon">
          <Bell />
        </el-icon>
      </el-badge>
      <el-avatar shape="square" :size="45" :src="url" class="img" />
      <div class="userinfo">
        <span class="name">tf_test</span>
        <span class="role">admin</span>
      </div>
      <div class="arrow" :class="{ rotated: isRotated }" @click="togglearrow">
        <el-icon class="arrowicon">
          <ArrowDownBold />
        </el-icon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router';
// import { Search } from '@element-plus/icons-vue'
// import type { ObjectFitProperty } from 'csstype'

const route = useRoute();
const routeTitle = ref('');

const updateTitle = (route :any) => {
  routeTitle.value = route.meta.title || '';
};

watch(route, (newRoute) => {
  updateTitle(newRoute);
});

onMounted(() => {
  updateTitle(route);
});

const search = ref('')
const anxia = () => {
  console.log(search.value);

}
const state = reactive({
  fits: [
    'fill',
    'contain',
    'cover',
    'none',
    'scale-down',
  ],
  url: 'https://picture.gptkong.com/20240605/2256cb0f6f10b14f16b678ddc19de7e4b0.jpeg',
})
const { url } = toRefs(state)

// 箭头旋转
const isRotated = ref(false)
const togglearrow = () => {
  isRotated.value = !isRotated.value;
}

</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;

  .title {
    color: #151D48;
    font-size: 24px;
    font-weight: 600;
  }

  .container-input {
    position: relative;
  }

  .input {
    width: 200px;
    padding: 10px 0px 10px 40px;
    border-radius: 16px;
    border: solid 1px #cccdfb;
    transition: all .2s ease-in-out;
    outline: none;
    opacity: 0.8;
    background-color: #F9FAFB;
  }

  .container-input svg {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translate(0, -50%);
  }

  .input:focus {
    opacity: 1;
    width: 280px;
    border: solid 2px #5D5FEF;
  }

  .avatar {
    width: 280px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .img {
      cursor: pointer;
    }


    .item {
      background-color: #FFFAF1;
      width: 30px;
      height: 30px;
      border-radius: 8px;
      cursor: pointer;
      // padding: auto auto;
      position: relative;

      .icon {
        top: 50%;
        left: 50%;
        margin-left: -10px;
        margin-top: -10px;
        position: absolute;
      }
    }

    .item:hover {
      background-color: #fdf3df;
    }

    .item:active {
      transition: 0.5s;
      transform: scale(0.88);
    }



    .userinfo {
      width: 120px;
      // background-color: pink;
      // display: flex;
      // align-items: center;
      flex-wrap: wrap;

      // margin-left: -10px;
      span {
        width: 80px;
        height: 20px;
        display: block;
        cursor: pointer;

      }

      span:hover {
        transition: 0.5s;
        transform: scale(1.1);
      }

      .name {
        font-weight: 600;
      }

      .role {
        font-size: 14px;
        // margin-top: 10px;
        line-height: 20px;
      }
    }


    .arrow {
      // height: 80px;
      // width: 30px;
      // height: 30px;
      transition: transform 0.3s ease;
      transform-origin: center;
      cursor: pointer;

      /* 确保旋转围绕中心 */
      // background-color: pink;
      // position: relative;


    }

    .rotated {
      transform: rotate(180deg);
    }
  }

}
</style>
