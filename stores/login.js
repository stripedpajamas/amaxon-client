const api = require('../api')

module.exports = store

function store (state, emitter) {
  state.login = {
    authenticated: false,
    loading: false,
    loggedIn: false,
    email: '',
    invalidToken: false
  }

  emitter.on(state.events.NAVIGATE, async () => {
    if (!state.login.authenticated) {
      emitter.emit(state.events.PUSHSTATE, '/')
    }
  })

  emitter.on('login:check', async () => {
    const res = await api.checkAuth()
    if (!res.ok) return
    const { email } = await res.json()
    state.login.email = email
    state.login.authenticated = true
    emitter.emit(state.events.PUSHSTATE, '/products')
  })

  emitter.on('login:auth', async () => {
    const { email, token } = state.query
    const res = await api.authenticate(email, token)
    if (!res.ok) {
      state.login.invalidToken = true
      emitter.emit(state.events.RENDER)
      return
    }
    state.login.invalidToken = false
    state.login.authenticated = true
    emitter.emit(state.events.PUSHSTATE, '/products')
  })

  emitter.on('DOMContentLoaded', () => {
    emitter.on('login:begin', async (email) => {
      state.login.email = email
      state.login.loading = true
      emitter.emit(state.events.RENDER)
      try {
        const res = await api.login(email)
        if (!res.ok) {
          emitter.emit(state.events.PUSHSTATE, '/error')
        } else {
          state.login.loggedIn = true
          state.login.loading = false
          emitter.emit(state.events.RENDER)
        }
      } catch (e) {
        console.error(e)
        emitter.emit(state.events.PUSHSTATE, '/error')
      }
    })
  })
}
