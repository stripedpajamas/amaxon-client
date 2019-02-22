var html = require('choo/html')

const TITLE = 'amaxon - error'

module.exports = function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  return html`
    <body>
      Something went wrong :(
      <a href="/">Click here to go back home</a>
    </body>
  `
}
