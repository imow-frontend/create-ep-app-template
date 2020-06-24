const axios = require('axios')
const { baseUrl } = '../../env.json'

async function login(account, password) {
  try {
    const res = await axios.post(baseUrl + 'login', {
      account,
      password
    })
    return res
  } catch (error) {
    console.log(error) //eslint-disable-line
  }
}

module.exports = { login }