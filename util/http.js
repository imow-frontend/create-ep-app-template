import Axios from 'axios'

class Http {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }

  async get(url, data, configs) {
    url = this.baseUrl + url
    try {
      const res = await Axios.get(url, {
        params: data,
        ...configs
      })
      return this.handleResponse(res)
    } catch (err) {
      console.log(err) // eslint-disable-line
    }
  }

  async post(url, data, configs) {
    url = this.baseUrl + url
    try {
      const res = await Axios.post(url, data, ...configs)
      return this.handleResponse(res)
    } catch (err) {
      console.log(err) // eslint-disable-line
    }
  }

  handleResponse(res) {
    const result = {
      data: res.data || res,
      message: res.message
    }
    if (process.env.NODE_ENV === 'development') {
      result.success = true
    } else if (res.status === 0 || res.status === 200) {
      result.success = true
    } else {
      result.success = false
    }
    return result
  }
}

export default Http
