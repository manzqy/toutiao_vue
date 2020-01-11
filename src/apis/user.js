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
