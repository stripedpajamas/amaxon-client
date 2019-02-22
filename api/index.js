const fetch = require('isomorphic-fetch')

class API {
  constructor () {
    this.host = 'co7096zvs2.execute-api.us-east-1.amazonaws.com'
    this.base = process.env.NODE_ENV !== 'production'
      ? `https://${this.host}/test/`
      : `https://${this.host}/prod/`
    this.defaultOpts = {
      credentials: 'include'
    }
  }
  login (email) {
    const endpoint = 'amaxon_login'
    const url = `${this.base}${endpoint}?email=${email}`
    return fetch(url, this.defaultOpts)
  }
  authenticate (email, token) {
    const endpoint = 'amaxon_authenticate'
    const url = `${this.base}${endpoint}?email=${email}&token=${token}`
    return fetch(url, this.defaultOpts)
  }
  checkAuth () {
    const endpoint = 'amaxon_check_auth'
    const url = `${this.base}${endpoint}`
    return fetch(url, this.defaultOpts)
  }
}

module.exports = new API()
