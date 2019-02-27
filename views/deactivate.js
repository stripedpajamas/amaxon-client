var html = require('choo/html')

const TITLE = 'amaxon - deactivate'

module.exports = function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)
  function onClick () {
    emit('login:deactivate')
  }
  switch (state.login.deactivateStatus) {
    case -1:
      return html`
      <div class="pt3 w-100 mw8 center tc">
        <h1 class="f4 lh-copy tc">Account could not be deactivated. Please try again later.</h1>
      </div>
    `
    case 2:
      return html`
      <div class="pt3 w-100 mw8 center tc">
        <h1 class="f4 lh-copy tc">Account successfully deactivated</h1>
      </div>
    `
    default:
      return html`
      <div class="pt3 w-100 mw8 center tc">
        <h1 class="f4 lh-copy tc">To deactivate your account press Deactivate</h1>
        <button
          ${state.login.deactivateStatus === 1 ? 'disabled' : ''}
          onclick=${onClick}
          class="pointer button-reset bg-dark-gray near-white ma2 tc br2 pa2"
        >
          Deactivate
        </button>
      </div>
    `
  }
}
