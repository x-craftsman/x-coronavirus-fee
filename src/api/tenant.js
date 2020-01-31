import { axios } from '@/utils/request'

const api = {
  tenants: '/tenants'
}

export default api

export function getTenants () {
  return axios({
    url: api.tenants,
    method: 'get'
  })
}

// export function getTenant (id) {
//   return axios({
//     url: `${api.tenants}/${id}`,
//     method: 'get'
//   })
// }

export function createTenant (entity) {
  return axios({
    url: api.tenants,
    method: 'post',
    data: entity
  })
}

export function updateTenant (id, entity) {
  return axios({
    url: `${api.tenants}/${id}`,
    method: 'put',
    data: entity
  })
}

export function deleteTenant (id) {
  return axios({
    url: `${api.tenants}/${id}`,
    method: 'delete'
  })
}

// for api-keys
export function getTenantApiKeys (tenantId) {
  return axios({
    url: `${api.tenants}/${tenantId}/api-keys`,
    method: 'get'
  })
}

export function createTenantApiKey (tenantId, entity) {
  return axios({
    url: `${api.tenants}/${tenantId}/api-keys`,
    method: 'post',
    data: entity
  })
}

export function updateTenantApiKey (tenantId, apiKeyId, entity) {
  return axios({
    url: `${api.tenants}/${tenantId}/api-keys/${apiKeyId}`,
    method: 'put',
    data: entity
  })
}

export function deleteTenantApiKey (tenantId, apiKeyId) {
  return axios({
    url: `${api.tenants}/${tenantId}/api-keys/${apiKeyId}`,
    method: 'delete'
  })
}
