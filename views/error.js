var html = require('choo/html')
const header = require('../components/header')
const footer = require('../components/footer')

const TITLE = 'amaxon - error'

module.exports = function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  function goHome () {
    emit(state.events.PUSHSTATE, '/')
  }

  return html`
    <body class="sans-serif flex flex-column min-vh-100">
      ${header('Login')}
      <main style="flex: 1" class="pt3 dark-gray pointer" onclick=${goHome}>
        <div class="pt3 w-100 mw8 center tc">
          <h1 class="f4 lh-copy tc">Something went wrong</h1>
          <img src="../assets/elk.svg" class="w-20">
          <h2 class="f6 ly-copy tc">Click anywhere to go back home</h2>
        </div>
      </main>
      ${footer}
    </body>
  `
}
