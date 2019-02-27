var html = require('choo/html')

const TITLE = 'amaxon - authenticating'

module.exports = function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  if (state.login.safeToAuthenticate) {
    emit('login:auth')
  }

  return html`
    <div class="pt3 w-100 mw8 center">
      <h1 class="f4 lh-copy tc">${state.login.tokenText}</h1>
    </div>
  `
}
