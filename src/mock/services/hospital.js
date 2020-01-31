import Mock from 'mockjs2'
import { builder, builderQueryResponse } from '../util'

const getHospitals = () => {
  var datas = []
  // var count = Math.round(Math.random() * 1000) % 10 + 1
  var count = 100
  for (let i = 1; i <= count; i++) {
    datas.push({
      id: i,
      city: 'city',
      name: 'name' + i,
      staffCount: i * (Math.round(Math.random() * 1000) % 10),
      address: 'address' + i,
      isVerifyQualification: '是',
      verifyContent: '是',
      canReceive: 'canReceive' + i,
      remark: 'remark' + i
    })
  }
  return builderQueryResponse(datas)
}

const createHospital = (id) => {
  return builder({})
}

const updateHospital = (id) => {
  return builder({})
}

const deleteHospital = (id) => {
  return builder({})
}

Mock.mock(/\/hospitals$/, 'get', getHospitals)
Mock.mock(/\/hospitals$/, 'post', createHospital)
Mock.mock(/\/hospitals\/[1-9][0-9]*$/, 'put', updateHospital)
Mock.mock(/\/hospitals\/[1-9][0-9]*$/, 'delete', deleteHospital)
