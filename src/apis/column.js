import axios from '@/utils/Uaxios'
export const columnList = () => {
  return axios('/category')
}
