<script setup lang="ts">
import { MsgType,OrderType} from '@/enums'
import type { Message, TimeMessages } from '@/types/room'
import {ref,nextTick,provide} from "vue"
const list = ref<Message[]>([])
import type { ConsultOrderItem,Image } from '@/types/consult'
import { getConsultOrderDetail } from '@/services/consult'
import RoomStatus from './components/RoomStatus.vue'
import RoomAction from './components/RoomAction.vue'
import RoomMessage from './components/RoomMessage.vue'
import type { Socket } from 'socket.io-client'
import { io } from 'socket.io-client'
import { onMounted, onUnmounted } from 'vue'
import { baseURL } from '@/utils/request'
import { useUserStore } from '@/stores'
import { useRoute } from 'vue-router'
import dayjs from 'dayjs'
import { showToast } from 'vant'

const store = useUserStore()
const route = useRoute()
let socket: Socket
onUnmounted(() => {
  socket.close()
})
// 下拉刷新
const loading = ref(false)
const time = ref(dayjs().format('YYYY-MM-DD HH:mm:ss'))
const onRefresh = () => {
  socket.emit('getChatMsgList', 20, time.value, consult.value?.id)
}
const initialMsg = ref(true)
onMounted(async () => {
  loadConsult()
  // 建立链接，创建 socket.io 实例
  socket = io(baseURL, {
    auth: {
      token: `Bearer ${store.user?.token}`
    },
    query: {
      orderId: route.query.orderId
    }
  })

  socket.on('connect', () => {
    // 建立连接成功
    console.log('connect')
    list.value = []
  })

  socket.on('error', (event) => {
    // 错误异常消息
    console.log('error')
  })

  socket.on('disconnect', ()=> {
    // 已经断开连接
    console.log('disconnect')
  })

    // 聊天记录
    socket.on('chatMsgList', ({ data }: { data: TimeMessages[] }) => {
    // 准备转换常规消息列表
    const arr: Message[] = []
    console.log(data)
    data.forEach((item, i) => {
       // 记录每一段消息中最早的消息时间，获取聊天记录需要使用
       if (i === 0) time.value = item.createTime
      arr.push({
        msgType: MsgType.Notify,
        msg: { content: item.createTime },
        createTime: item.createTime,
        id: item.createTime
      })
      arr.push(...item.items)
    })
    // 追加到聊天消息列表
    list.value.unshift(...arr)
    loading.value = false
    if (!arr.length) return showToast('没有更多聊天记录了')
    if (initialMsg.value) {
      socket.emit('updateMsgStatus', arr[arr.length - 1].id)
      // 第一次需要滚动到最新的消息
      nextTick(() => {
        window.scrollTo(0, document.body.scrollHeight)
        initialMsg.value = false
      })
    }
  })

   // 订单状态 在onMounted注册
   socket.on('statusChange', () => {
    loadConsult()
  })
  // 接收消息 在onMounted注册
  socket.on('receiveChatMsg', async (event) => {
    socket.emit('updateMsgStatus', event.id)
    list.value.push(event)
    await nextTick()
    window.scrollTo(0, document.body.scrollHeight)
  })
})

const consult = ref<ConsultOrderItem>()
  const loadConsult = async () => {
  const res = await getConsultOrderDetail(route.query.orderId as string)
  consult.value = res.data
}
onMounted(async () => {
  const res = await getConsultOrderDetail(route.query.orderId as string)
  consult.value = res.data
})  
const sendText = (text: string) => {
  // 发送信息需要  发送人  收消息人  消息类型  消息内容
  socket.emit('sendChatMsg', {
    from: store.user?.id,
    to: consult.value?.docInfo?.id,
    msgType: MsgType.MsgText,
    msg: { content: text }
  })
}

const sendImage = (img: Image) => {
  socket.emit('sendChatMsg', {
    from: store.user?.id,
    to: consult.value?.docInfo?.id,
    msgType: MsgType.MsgImage,
    msg: { picture: img }
  })
}
provide('consult', consult)

const completeEva = (score: number) => {
  const item = list.value.find((item) => item.msgType === MsgType.CardEvaForm)
  if (item) {
    item.msg.evaluateDoc = { score }
    item.msgType = MsgType.CardEva
  }
}
provide('completeEva', completeEva)




</script>

<template>
  <div class="room-page">
    <cp-nav-bar title="医生问诊室" />
    <room-status :status="consult?.status" :countdown="consult?.countdown"></room-status>
    <van-pull-refresh v-model="loading" @refresh="onRefresh">
      <room-message v-for="item in list" :key="item.id" :item="item"></room-message>
  </van-pull-refresh>
    <room-action :disabled="consult?.status !== OrderType.ConsultChat" @send-text="sendText" @send-image="sendImage"></room-action>
  </div>
</template>

<style lang="scss" scoped>
.room-page {
  padding-top: 90px;
  padding-bottom: 60px;
  min-height: 100vh;
  box-sizing: border-box;
  background-color: var(--cp-bg);
  .van-pull-refresh {
    width: 100%;
    min-height: calc(100vh - 150px);
  }
}
</style>
