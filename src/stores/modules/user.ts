import type { User } from '@/types/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

/* 
  1、返回值(useUserStore)命名：以use开头，以Store结尾
  2、第一个参数是你的应用中 Store 的唯一 ID
*/
export const useUserStore = defineStore(
  'cp-user',
  () => {
    // 用户信息
    const user = ref<User>()
    //设置用户,登录后使用
    const setUser = (data: User) => {
      user.value = data
    }
    const delUser = () => {
      user.value = undefined
    }
    return { user, setUser, delUser }
  },
  {
    persist: true
  }
)
