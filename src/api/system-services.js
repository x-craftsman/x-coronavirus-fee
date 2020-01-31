import { axios } from '@/utils/request'
import { resolveUrl } from '@/utils/util'

const api = {
  systemServices: '/system-services'
}

export default api

export function getSystemServices () {
  return axios({
    url: api.systemServices,
    method: 'get'
  })
}

export function createSystemService (parameter) {
  var info = resolveUrl(parameter.servicePath)
  if (info == null) {
    return null
  }
  parameter.baseUrl = info.baseUrl
  parameter.port = info.port
  parameter.resource = info.resource
  return axios({
    url: api.systemServices,
    method: 'post',
    data: parameter
  })
}
export function updateSystemService (id, parameter) {
  var info = resolveUrl(parameter.servicePath)
  if (info == null) {
    return null
  }
  parameter.baseUrl = info.baseUrl
  parameter.port = info.port
  parameter.resource = info.resource
  return axios({
    url: `${api.systemServices}/${id}`,
    method: 'put',
    data: parameter
  })
}

export function deleteSystemService (id) {
  return axios({
    url: `${api.systemServices}/${id}`,
    method: 'delete'
  })
}

export function getSystemServiceAuthConfigs (systemServiceId) {
  return axios({
    url: `${api.systemServices}/${systemServiceId}/auth-configs`,
    method: 'get'
  })
}
