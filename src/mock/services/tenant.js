import Mock from 'mockjs2'
import { builder, builderQueryResponse } from '../util'

const getTenants = () => {
  var datas = []
  var count = Math.round(Math.random() * 1000) % 10 + 1
  for (let i = 1; i <= count; i++) {
    datas.push({
      id: i,
      name: 'name' + i,
      code: 'code' + i,
      nickname: 'nickname' + i,
      status: 1,
      type: 1,
      contactName: 'Alan' + i,
      contactTel: '1860000000' + i,
      contactEmail: `alan.luo${i}@gmail.com`
    })
  }
  return builderQueryResponse(datas)
}

const createTenants = (id) => {
  return builder({})
}

const updateTenants = (id) => {
  return builder({})
}

const deleteTenants = (id) => {
  return builder({})
}

Mock.mock(/\/tenants$/, 'get', getTenants)
Mock.mock(/\/tenants$/, 'post', createTenants)
Mock.mock(/\/tenants\/[1-9][0-9]*$/, 'put', updateTenants)
Mock.mock(/\/tenants\/[1-9][0-9]*$/, 'delete', deleteTenants)
