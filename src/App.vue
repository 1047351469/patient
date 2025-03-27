<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { request } from '@/utils/request'
import type { User } from './types/user'
import { Button as VanButton } from 'vant'
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores'
const { user } = storeToRefs(useUserStore())
const { setUser, delUser } = useUserStore()
const getUserInfo = async () => {
  const res = await request('/patient/myUser')
  console.log(res)
}
const login = async () => {
  const res = await request<User>('/login/password', 'POST', {
    mobile: '13211112222',
    // 正确密码abc12345
    // 密码 abc123456 测试：出现非10000的情况
    password: 'abc12345'
  })
  setUser(res.data)
}
const del = () => {
  
  delUser()
}
</script>

<template>
  {{ user }}
  <van-button type="primary" @click="getUserInfo">获取个人信息</van-button>
  <van-button @click="login">login</van-button>
  <!-- <button @click="()=>delUser()">退出</button> -->
  <button @click="del">退出</button>
  <a href="#">123</a>
  <div class="container">
  </div>
  <RouterView />
</template>

<style scoped>
.container {
  width: 40px;
  height: 40px;
  border: 1px solid green;
  background-color: pink;
  text-align: center;
  line-height: 400px;
  color: white;
  font-weight: 800;
}

a {
  color: var(--cp-primary);
}
</style>
