import axios from 'axios'

export const state = () => {
  return {
    user: {
      isLogin: false,
      userInfo: '',
      token: ''
    }
  }
}

export const mutations = {
  login(state, data) {
    if (data) {
      state.user.isLogin = true
      state.user.userInfo = data.userInfo
      state.user.token = data.token
      axios.defaults.headers.common.Authorization = data.token
    }
  },
  loginout(state) {
    state.user.isLogin = false
    state.user.userInfo = ''
    axios.defaults.headers.common.Authorization = null
  }
}

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    if (req.session) {
      if (req.session.authUser) {
        commit('login', req.session.authUser)
      }
    }
  }
}
