import { axios } from '@/utils/request'

const api = {
  hospitals: '/hospitals'
}

export default api

export function getHospitals (params) {
  return axios({
    url: api.hospitals,
    method: 'get',
    params: params
  })
}

// export function getTenant (id) {
//   return axios({
//     url: `${api.hospitals}/${id}`,
//     method: 'get'
//   })
// }

export function createHospital (entity) {
  return axios({
    url: api.hospitals,
    method: 'post',
    data: entity
  })
}

export function updateHospital (id, entity) {
  return axios({
    url: `${api.hospitals}/${id}`,
    method: 'put',
    data: entity
  })
}

export function deleteHospital (id) {
  return axios({
    url: `${api.hospitals}/${id}`,
    method: 'delete'
  })
}

// for medical-supplies
export function getHospitalMedicalSupplies (hospitalId) {
  return axios({
    url: `${api.hospitals}/${hospitalId}/medical-supplies`,
    method: 'get'
  })
}
