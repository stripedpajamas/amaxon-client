const api = require('../api')

const initialState = {
  firstLoad: true,
  authenticated: false,
  loggingIn: false,
  loading: true,
  loggedIn: false,
  email: '',
  tokenText: 'Validating login token...',
  safeToAuthenticate: true,
  deactivateStatus: 0 // not started
}

module.exports = function store (state, emitter) {
  state.login = Object.assign({}, initialState)

  emitter.on('login:init', () => {
    state.login = Object.assign({}, initialState)
  })

  emitter.on('login:deactivate', async () => {
    state.login.deactivateStatus = 1 // loading
    emitter.emit(state.events.RENDER)
    const { email, token } = state.query
    const res = await api.deactivate(email, token)
    if (!res.ok) {
      state.login.deactivateStatus = -1 // failure
      emitter.emit(state.events.RENDER)
      return
    }
    state.login.deactivateStatus = 2 // success
    emitter.emit(state.events.RENDER)
  })

  emitter.on('login:check', async () => {
    if (state.login.firstLoad) {
      state.login.firstLoad = false
    }
    const res = await api.checkAuth()
    if (!res.ok) {
      state.login.loading = false
      state.login.authenticated = false
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
      state.login.tokenText = 'Invalid token. Redirecting to login page...'
      emitter.emit(state.events.RENDER)
      setTimeout(() => {
        emitter.emit(state.events.PUSHSTATE, '/')
      }, 1000)
      return
    }
    state.login.tokenText = 'Logged in successfully! Redirecting to dashboard...'
    state.login.invalidToken = false
    state.login.authenticated = true
    emitter.emit(state.events.RENDER)
    setTimeout(() => {
      emitter.emit(state.events.PUSHSTATE, '/products')
    }, 700)
  })

  emitter.on('login:out', async () => {
    // delete cookie so we'll be prompted to auth again
    await api.signOut()
    emitter.emit('login:init')
    emitter.emit('products:init')
    emitter.emit(state.events.PUSHSTATE, '/')
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
