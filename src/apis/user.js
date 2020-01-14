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

export const userFollow = (id) => {
  return axios(`/user_follows/${id}`)
}

export const userUnfollow = (id) => {
  return axios(`/user_unfollow/${id}`)
}

export const userFollowList = () => {
  return axios(`/user_follows`)
}
