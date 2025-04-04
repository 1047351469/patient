import { ref,onMounted } from 'vue'
import { OrderType } from '@/enums'
import {
  cancelOrder,
  deleteOrder,
  followOrUnfollow,
  getPrescriptionPic
} from '@/services/consult'
import { getMedicalOrderDetail } from '@/services/order'
import type { FollowType,ConsultOrderItem  } from '@/types/consult'
import type { OrderDetail } from '@/types/order'
import type { CodeType } from '@/types/user'
import {
  showFailToast,
  showImagePreview,
  showSuccessToast,
  type FormInstance,
  showToast
} from 'vant'

// 封装逻辑，规范 useXxx，表示使用某功能
export const useFollow = (type: FollowType = 'doc') => {
  const loading = ref(false)
  // {a, b} 类型，传值得时候 {a, b, c} 也可以，这是类型兼容：多的可以给少的
  const follow = async (item: { id: string; likeFlag: 0 | 1 }) => {
    loading.value = true
    try {
      await followOrUnfollow(item.id, type)
      item.likeFlag = item.likeFlag === 1 ? 0 : 1
    } finally {
      loading.value = false
    }
  }
  return { loading, follow }
}

// 提供查看处方
export const useShowPrescription = () => {
  const onShowPrescription = async (id?: string) => {
    if (id) {
      const res = await getPrescriptionPic(id)
      showImagePreview([res.data.url])
    }
  }
  return { onShowPrescription }
}

// 取消订单
export const useCancelOrder = () => {
  const loading = ref(false)
  const cancelConsultOrder = async (item: ConsultOrderItem) => {
    try {
      loading.value = true
      await cancelOrder(item.id)
      item.status = OrderType.ConsultCancel
      item.statusValue = '已取消'
      showSuccessToast('取消成功')
    } catch (error) {
      showFailToast('取消失败')
    } finally {
      loading.value = false
    }
  }
  return { loading, cancelConsultOrder }
}

// 删除订单
export const useDeleteOrder = (cb: () => void) => {
  const loading = ref(false)
  const deleteConsultOrder = async (item: ConsultOrderItem) => {
    try {
      loading.value = true
      await deleteOrder(item.id)
      showSuccessToast('删除成功')
      cb && cb()
    } catch (error) {
      showFailToast('删除失败')
    } finally {
      loading.value = false
    }
  }
  return { loading, deleteConsultOrder }
}

export const useOrderDetail = (id: string) => {
  const order = ref<OrderDetail>()
  const loading = ref(false)
  onMounted(async () => {
    try {
      loading.value = true
      const res = await getMedicalOrderDetail(id)
      order.value = res.data
    } finally {
      loading.value = false
    }
  })
  return { loading, order }
}



