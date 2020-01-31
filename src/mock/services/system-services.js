import Mock from 'mockjs2'
import { builder, builderQueryResponse } from '../util'

const getSystemServices = () => {
  var datas = []
  for (let i = 1; i <= 5; i++) {
    datas.push({
      id: i,
      actionCode: 'SaveShippingOrderAA' + i,
      systemCode: 'WMS',
      tenantCode: 'testTenant',
      baseUrl: 'http://testxa.360scm.com',
      port: 80,
      resource: 'SCM.WMS7.Apis/Api/Shipping/SaveShippingOrder' + i,
      status: 1
    })
  }
  return builderQueryResponse(datas)
}

const createSystemService = (id) => {
  return builder({})
}

const updateSystemService = (id) => {
  return builder({})
}

const deleteSystemService = (id) => {
  return builder({})
}

Mock.mock(/\/system-services$/, 'get', getSystemServices)
Mock.mock(/\/system-services$/, 'post', createSystemService)
Mock.mock(/\/system-services\/[1-9][0-9]*$/, 'put', updateSystemService)
Mock.mock(/\/system-services\/[1-9][0-9]*$/, 'delete', deleteSystemService)
