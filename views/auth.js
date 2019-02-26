var html = require('choo/html')
const header = require('../components/header')
const footer = require('../components/footer')

const TITLE = 'amaxon - authenticating'

module.exports = function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  if (!state.query.email || !state.query.token) {
    emit(state.events.PUSHSTATE, '/')
  }
  if (state.login.safeToAuthenticate) {
    emit('login:auth')
  }
  const text = state.login.invalidToken
    ? 'Invalid token'
    : 'Logged in successfully! Redirecting...'

  return html`
    <body class="sans-serif flex flex-column min-vh-100">
      ${header('Login')}
      <main style="flex: 1" class="pt3 dark-gray">
        <div class="pt3 w-100 mw8 center">
          <h1 class="f4 lh-copy tc">${text}</h1>
        </div>
      </main>
      ${footer}
    </body>
  `
}
