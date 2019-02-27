const html = require('choo/html')

const TITLE = 'amaxon - route not found'

module.exports = function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)
  function goHome () {
    emit(state.events.PUSHSTATE, '/')
  }
  return html`
    <div class="pointer" onclick=${goHome}>
      <div class="pt3 w-100 mw8 center tc">
        <h1 class="f4 lh-copy tc">404 not found</h1>
        <img src="../assets/elk.svg" class="w-20">
        <h2 class="f6 ly-copy tc">Click anywhere to go back home</h2>
      </div>
    </div>
  `
}
