import http from '@/utils/http'

//获取结算信息
export const getCheckoutInfoAPI = () => {
  return http({
    url:'/member/order/pre'
  })
}
