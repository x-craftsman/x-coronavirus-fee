import Mock from 'mockjs2'
// import { builder, builderQueryResponse } from '../util'
import { builderQueryResponse } from '../util'

// const getServiceSubscribers = () => {
//   var datas = []
//   for (let i = 1; i <= 10; i++) {
//     datas.push({
//       id: i,
//       tenantCode: 'testTenant' + i,
//       actionCode: 'SaveShippingOrder---' + i,
//       systemCode: 'WMS',
//       status: (i % 4), // 0：禁用 ， 1：稳定执行， 2：执行异常， 3：错误预警
//       type: (i % 2) // 0：标准 ， 1：自定义
//     })
//   }
//   return builderQueryResponse(datas)
// }

// const createServiceSubscriber = (entity) => {
//   return builder({})
// }
// const deleteServiceSubscriber = (id) => {
//   return builder({})
// }

const getServiceSubscriberLogs = (subscriberId) => {
  console.log(subscriberId)
  var datas = []
  for (let i = 1; i <= 35; i++) {
    datas.push({
      id: i,
      systemCode: 'WMS',
      tenantCode: 'testTenant' + i,
      actionCode: 'SaveShippingOrder' + i,
      type: (i % 2), // 0：标准 ， 1：自定义
      content: 'qwertyuiopasdasdasdadasasdewg'
    })
  }
  return builderQueryResponse(datas)
}

// Mock.mock(/\/service-subscribers$/, 'get', getServiceSubscribers)
// Mock.mock(/\/service-subscribers$/, 'post', createServiceSubscriber)
// Mock.mock(/\/service-subscribers\/[1-9][0-9]*$/, 'delete', deleteServiceSubscriber)
Mock.mock(/\/service-subscribers\/[1-9][0-9]*\/logs$/, 'get', getServiceSubscriberLogs)
