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
  getProducts () {
    const endpoint = 'amaxon_get_products'
    const url = `${this.base}${endpoint}`
    return fetch(url, this.defaultOpts)
      .then(res => res.json())
  }
  setProducts () {
    const endpoint = 'amaxon_set_products'
    const url = `${this.base}${endpoint}`
    return fetch(url, Object.assign({
      method: 'POST'
    }, this.defaultOpts))
      .then(res => res.json())
  }
}

module.exports = new API()
