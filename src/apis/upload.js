import axios from '@/utils/Uaxios'

export const uploadFile = data => {
  return axios({
    method: 'post',
    url: '/upload',
    data
  })
}
