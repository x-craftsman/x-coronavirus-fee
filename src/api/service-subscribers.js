import { axios } from '@/utils/request'

const api = {
  serviceSubscribers: '/service-subscribers'
}

export default api

export function getServiceSubscribers () {
  return axios({
    url: api.serviceSubscribers,
    method: 'get'
  })
}

export function getServiceSubscriber (id) {
  return axios({
    url: `${api.serviceSubscribers}/${id}`,
    method: 'get'
  })
}

export function createServiceSubscriber (entity) {
  return axios({
    url: api.serviceSubscribers,
    method: 'post',
    data: entity
  })
}

export function deleteServiceSubscriber (id) {
  return axios({
    url: `${api.serviceSubscribers}/${id}`,
    method: 'delete'
  })
}

// ServiceSubscriberRuleDetail 相关请求
export function createServiceSubscriberRuleDetail (subscriberId, ruleId, entity) {
  return axios({
    url: `${api.serviceSubscribers}/${subscriberId}/mapping-rules/${ruleId}/rule-details`,
    method: 'post',
    data: entity
  })
}

export function updateServiceSubscriberRuleDetail (subscriberId, ruleId, detailId, entity) {
  return axios({
    url: `${api.serviceSubscribers}/${subscriberId}/mapping-rules/${ruleId}/rule-details/${detailId}`,
    method: 'put',
    data: entity
  })
}

export function deleteServiceSubscriberRuleDetail (subscriberId, ruleId, detailId) {
  return axios({
    url: `${api.serviceSubscribers}/${subscriberId}/mapping-rules/${ruleId}/rule-details/${detailId}`,
    method: 'delete'
  })
}

// ServiceSubscriber execution-records 相关请求
export function getServiceSubscriberExecutionRecords (subscriberId) {
  return axios({
    url: `${api.serviceSubscribers}/${subscriberId}/execution-records`,
    method: 'get'
  })
}

export function getServiceSubscriberExecutionLogs (subscriberId, recordId) {
  return axios({
    url: `${api.serviceSubscribers}/${subscriberId}/execution-records/${recordId}/execution-logs`,
    method: 'get'
  })
}
