import axios from '@/utils/Uaxios'

export const articleList = params => {
  return axios({
    url: '/post',
    params
  })
}
