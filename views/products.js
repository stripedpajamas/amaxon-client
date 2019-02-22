var html = require('choo/html')

const TITLE = 'amaxon - products'

module.exports = function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)
  return html`
    <body>
      The products page
    </body>
  `
}
