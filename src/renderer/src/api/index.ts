import axios from 'axios'

const linkUrl = 'http://localhost:3010/'

export const api = axios.create({
  baseURL: linkUrl
})

api.interceptors.response.use(
  function (response) {
    console.log(response)
    return response
  },
  function (error) {
    console.log(error)
    return Promise.reject(error)
  }
)
