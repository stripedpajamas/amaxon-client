const api = require('../api')

module.exports = function store (state, emitter) {
  state.login = {
    firstLoad: true,
    authenticated: false,
    loggingIn: false,
    loading: true,
    loggedIn: false,
    email: '',
    invalidToken: true,
    safeToAuthenticate: true
  }

  emitter.on('login:check', async () => {
    if (state.login.firstLoad) {
      state.login.firstLoad = false
    }
    const res = await api.checkAuth()
    if (!res.ok) {
      state.login.loading = false
      emitter.emit(state.events.RENDER)
      return
    }
    const { email } = await res.json()
    state.login.email = email
    state.login.authenticated = true
    emitter.emit(state.events.PUSHSTATE, '/products')
  })

  emitter.on('login:auth', async () => {
    state.login.safeToAuthenticate = false
    const { email, token } = state.query
    const res = await api.authenticate(email, token)
    if (!res.ok) {
      state.login.invalidToken = true
      emitter.emit(state.events.RENDER)
      return
    }
    state.login.safeToAuthenticate = true
    state.login.invalidToken = false
    state.login.authenticated = true
    emitter.emit(state.events.PUSHSTATE, '/products')
  })

  emitter.on('DOMContentLoaded', () => {
    emitter.on('login:begin', async (email) => {
      state.login.email = email
      state.login.loggingIn = true
      emitter.emit(state.events.RENDER)
      try {
        const res = await api.login(email)
        if (!res.ok) {
          console.error('Not ok from API:', res)
          emitter.emit(state.events.PUSHSTATE, '/error')
        } else {
          state.login.loggedIn = true
          state.login.loggingIn = false
          emitter.emit(state.events.RENDER)
        }
      } catch (e) {
        console.error(e)
        emitter.emit(state.events.PUSHSTATE, '/error')
      }
    })
  })
}
