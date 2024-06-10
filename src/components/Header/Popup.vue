<template>
    <transition name="fade">
      <div v-if="isRotated" class="menu" ref="menu" @click.self="closeMenu">
        <ul>
          <li @click="selectOption('Option 1')">Option 1</li>
          <li @click="selectOption('Option 2')">Option 2</li>
          <li @click="selectOption('Option 3')">Option 3</li>
        </ul>
      </div>
    </transition>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
  
  const props = defineProps({
    isRotated: Boolean
  });
  const emit = defineEmits(['update:isRotated', 'select']);
  
  const menu = ref(null);
  
  const closeMenu = () => {
    emit('update:isRotated', false);
  };
  
  const selectOption = (option) => {
    emit('select', option);
    closeMenu();
  };
  
  const handleClickOutside = (event) => {
    if (menu.value && !menu.value.contains(event.target)) {
      closeMenu();
    }
  };
  
  watch(() => props.isRotated, (newVal) => {
    if (newVal) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }
  });
  
  onMounted(() => {
    if (props.isRotated) {
      document.addEventListener('click', handleClickOutside);
    }
  });
  
  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
  });
  </script>
  
  <style scoped>
  .menu {
    background-color: white;
    border: 1px solid #ccc;
    padding: 10px;
    position: absolute;
    top: 40px; /* Adjust according to your layout */
    left: 0;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .menu ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  
  .menu li {
    padding: 5px 10px;
    cursor: pointer;
  }
  
  .menu li:hover {
    background-color: #f0f0f0;
  }
  
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s;
  }
  
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
  </style>
  