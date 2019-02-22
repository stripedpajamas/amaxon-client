var html = require('choo/html')

const TITLE = 'amaxon - authenticating'

module.exports = function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  if (!state.query.email || !state.query.token) {
    emit(state.events.PUSHSTATE, '/')
  }
  emit('login:auth')
  const text = state.invalidToken
    ? 'Invalid token'
    : 'Logged in successfully! Redirecting...'
  return html`
    <body>
      ${text}
    </body>
  `
}
