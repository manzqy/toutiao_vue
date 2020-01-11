import axios from '@/utils/Uaxios'

export const userLogin = data => {
  return axios({
    method: 'post',
    url: '/login',
    data
  })
}

export const userDetail = id => {
  return axios(`/user/${id}`)
}

export const userEdit = (id, data) => {
  return axios({
    method: 'post',
    url: `/user_update/${id}`,
    data
  })
}

export const userRegister = data => {
  return axios({
    method: 'post',
    url: '/register',
    data
  })
}
