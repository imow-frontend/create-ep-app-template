import axios from 'axios'

export default ({ store }) => {
  const authorization = axios.defaults.headers.common.Authorization
  if (!authorization) {
    axios.defaults.headers.common.Authorization = store.state.user.token
  }
}
