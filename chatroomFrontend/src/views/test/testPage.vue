<template>
    <div class="login">
      <div class="text">
        <h1>你好,注册页</h1>
      </div>
      <div class="text">
        <h1>{{ useStore.count }}</h1>
      </div>
      <div>
        <button @click="testBtn">加一</button>
        <button @click="reset">重置</button>
      </div>
    </div>
  </template>
  <script setup>
  // import { useCounterStore } from '@/stores/counter'
  import { useNumStore } from '@/stores'
  const useStore = useNumStore()
  const testBtn = () => {
    useStore.increment()
  }
  const reset = () => {
    useStore.reset()
    // console.log(new);
    
  }
  </script>
  <style>
  .login {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: pink;
  }
  </style>
  