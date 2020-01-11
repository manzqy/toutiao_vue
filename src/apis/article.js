import axios from '@/utils/Uaxios'

export const articleList = params => {
  return axios({
    url: '/post',
    params
  })
}

export const articleSingle = id => {
  return axios(`/post/${id}`)
}

export const articleLike = id => {
  return axios(`/post_like/${id}`)
}

export const articleCollect = id => {
  return axios(`/post_star/${id}`)
}

export const articleComment = (id, data) => {
  return axios({
    method: 'post',
    url: `/post_comment/${id}`,
    data
  })
}
