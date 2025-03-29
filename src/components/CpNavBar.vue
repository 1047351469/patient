<script setup lang="ts">
import { useRouter } from 'vue-router'
const props=defineProps<{
  title?: string
  rightText?: string,
  back?: () => void
}>()
const emit = defineEmits<{
  (e: 'click-right'): void
}>()
const router = useRouter()
const onClickLeft = () => {
  if (props.back) {
   return props.back()
  }
  // TODO 点击左侧返回按钮
  // 判断历史记录中是否有回退
  console.log(history.state?.back)
  if (history.state?.back) {
    router.back()
  } else {
    router.push('/')
  }
}
const onClickRight = () => {
  // TODO 点击右侧文字按钮
  emit('click-right')
}
</script>

<template>
  <van-nav-bar
    left-arrow
    @click-left="onClickLeft"
    fixed
    :title="title"
    :right-text="rightText"
    @click-right="onClickRight"
  ></van-nav-bar>
</template>

<style lang="scss" scoped>
:deep() {
  .van-nav-bar {
    &__arrow {
      font-size: 18px;
      color: var(--cp-text1);
    }
    &__text {
      font-size: 15px;
    }
  }
}
</style>
