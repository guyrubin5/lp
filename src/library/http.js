import { stringify } from 'qs'
import axios from 'axios'

const careerpath_api = process.env.GATSBY_CAREERPATH_API

const get = (endpoint, params = undefined) => {
  let url = careerpath_api + endpoint
  if (careerpath_api === undefined) {
    console.error('No career path API environment variable')
    return Promise.reject(null)
  }

  if (params) {
    url += `?=${stringify(params)}`
  }

  return axios
    .get(url)
    .then(response => response.data || [])
    .catch(err => {
      console.error('Get request failed', url, err)
    })
}

export default {
  get: get
}
