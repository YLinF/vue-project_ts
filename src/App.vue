<script setup lang="ts">
import { request } from '@/utils/request'
import type { User } from './types/user'
import { useUserStore } from './stores'

// 测试，请求拦截器，是否携带token，响应拦截器401拦截到登录地址
const getUserInfo = async () => {
  const res = await request('/patient/myUser')
  console.log(res)
}

// 测试，响应拦截器，出现非10000的情况，和返回剥离后的数据
const store = useUserStore()
const login = async () => {
  const res = await request<User>('/login/password', 'POST', {
    mobile: '13211112222',
    // 密码 abc123456 测试：出现非10000的情况
    password: 'abc12345'
  })
  store.setUser(res.data)
}
</script>

<template>
  <div>
    <van-button type="primary" @click="getUserInfo">获取个人信息</van-button>
    <van-button type="primary" @click="login">登录</van-button>
  </div>
</template>
