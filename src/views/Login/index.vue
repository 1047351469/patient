<script setup lang="ts">
import { showSuccessToast, showToast, type FormInstance } from 'vant'
import { useUserStore } from '@/stores'
import { useRoute, useRouter } from 'vue-router'
import type { CodeType, User } from '@/types/user'
import { loginByMobile, loginByPassword,sendMobileCode } from '@/services/user'
import { mobileRules, passwordRules,codeRules } from '@/utils/rules'
import { ref,onUnmounted } from 'vue'
const mobile = ref('13211112222')
const password = ref('abc12345')
const agree = ref(false)
const isPass = ref(true)
const code = ref('')
// 密码的可见与不可见
const isShow = ref(false)
const store = useUserStore()
const route = useRoute()
const router = useRouter()
const time = ref(0)
let timeId: number
const form = ref<FormInstance>()
const send = async () => {
  // 已经倒计时time的值大于0，此时不能发送验证码
  if (time.value > 0) return
  await form.value?.validate('mobile')
  await sendMobileCode(mobile.value,'login')
  showSuccessToast('发送成功')
  time.value = 4
  clearInterval(timeId)
  timeId = window.setInterval(() => {
    time.value--
    if (time.value <= 0) window.clearInterval(timeId)
 }, 1000)
}
onUnmounted(() => {
  window.clearInterval(timeId)
})
// 表单提交
const login = async () => {
  if (!agree.value) return showToast('请勾选我已同意')
  // 验证完毕，进行登录
  const res =isPass.value? await loginByPassword(mobile.value, password.value):
         await loginByMobile(mobile.value, code.value)
  store.setUser(res.data)
  // 如果有回跳地址就进行回跳，没有跳转到个人中心
  router.push((route.query.returnUrl as string) || '/user')
  showSuccessToast('登录成功')
 

}
</script>

<template>
  <div class="login-page">
    <cp-nav-bar
      right-text="注册"
      @click-right="$router.push('/register')"
    ></cp-nav-bar>
    <!-- 头部 -->
    <div class="login-head">
      <h3>{{ isPass ? '密码登录' : '短信验证码登录' }}</h3>
      <a href="javascript:;" @click="isPass = !isPass">
        <span>{{ !isPass ? '密码登录' : '短信验证码登录' }}</span>
        <van-icon name="arrow"></van-icon>
      </a>
    </div>
    <!-- 表单 -->
    <van-form autocomplete="off" @submit="login" ref="form">
      <van-field placeholder="请输入手机号" type="tel" :rules="mobileRules"  v-model="mobile"  name="mobile"></van-field>
      <van-field  v-if="isPass" placeholder="请输入密码"    :rules="passwordRules"  v-model="password"
      :type="isShow ? 'text' : 'password'"
      >
      <template #button>

          <cp-icon
            :name="`login-eye-${isShow ? 'on' : 'off'}`"
            @click="isShow = !isShow"
            style="margin-right: 10px"
          ></cp-icon>
        </template>
    </van-field>
      <van-field v-else placeholder="短信验证码" v-model="code" :rules="codeRules">
        <template #button>
          <span class="btn-send" @click="send" :class="{ active: time > 0 }">
            {{ time > 0 ? `${time}s后再次发送` : '发送验证码' }}
          </span>
        </template>
      </van-field>
      <div class="cp-cell">
        <van-checkbox  v-model="agree">
          <span>我已同意</span>
          <a href="javascript:;">用户协议</a>
          <span>及</span>
          <a href="javascript:;">隐私条款</a>
        </van-checkbox>
      </div>
      <div class="cp-cell">
        <van-button block round type="primary" native-type="submit">登 录</van-button>
      </div>
      <div class="cp-cell">
        <a href="javascript:;">忘记密码？</a>
      </div>
    </van-form>
    <!-- 底部 -->
    <div class="login-other">
      <van-divider>第三方登录</van-divider>
      <div class="icon">
        <img src="@/assets/qq.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  &-page {
    padding-top: 46px;
  }
  &-head {
    display: flex;
    padding: 30px 30px 50px;
    justify-content: space-between;
    align-items: flex-end;
    line-height: 1;
    h3 {
      font-weight: normal;
      font-size: 24px;
    }
    a {
      font-size: 15px;
    }
  }
  &-other {
    margin-top: 60px;
    padding: 0 30px;
    .icon {
      display: flex;
      justify-content: center;
      img {
        width: 36px;
        height: 36px;
        padding: 4px;
      }
    }
  }
}
.van-form {
  padding: 0 14px;
  .cp-cell {
    height: 52px;
    line-height: 24px;
    padding: 14px 16px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    .van-checkbox {
      a {
        color: var(--cp-primary);
        padding: 0 5px;
      }
    }
  }
  .btn-send {
    color: var(--cp-primary);
    &.active {
      color: rgba(22,194,163,0.5);
    }
  }
}
</style>
