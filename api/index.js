const fetch = window.fetch

class API {
  constructor () {
    this.host = 'co7096zvs2.execute-api.us-east-1.amazonaws.com'
    this.env = process.env.NODE_ENV !== 'production'
      ? 'test'
      : 'prod'
    this.base = `https://${this.host}/${this.env}/`
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
  deactivate (email, token) {
    const endpoint = 'amaxon_deactivate'
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
      .then(res => res.ok && res.json())
  }
  setProducts (products) {
    const endpoint = 'amaxon_set_products'
    const url = `${this.base}${endpoint}`
    const body = JSON.stringify({ products })
    return fetch(url, Object.assign({
      method: 'POST',
      body
    }, this.defaultOpts))
      .then(res => res.ok && res.json())
  }
  signOut () {
    const endpoint = 'amaxon_sign_out'
    const url = `${this.base}${endpoint}`
    return fetch(url, this.defaultOpts)
  }
}

module.exports = new API()
