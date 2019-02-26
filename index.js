const css = require('sheetify')
const choo = require('choo')

const loginView = require('./views/login')
const authView = require('./views/auth')
const productView = require('./views/products')
const errorView = require('./views/error')
const notFoundView = require('./views/404')

function withAuth (handler) {
  return function (state, emit) {
    if (!state.login.authenticated) {
      return loginView(state, emit)
    }
    return handler(state, emit)
  }
}

css('tachyons')

const app = choo()

if (process.env.NODE_ENV !== 'production') {
  app.use(require('choo-devtools')())
}

app.use(require('./stores/login'))
app.use(require('./stores/products'))

app.route('/', loginView)
app.route('/login', authView)
app.route('/products', withAuth(productView))
app.route('/error', errorView)
app.route('/*', notFoundView)

module.exports = app.mount('body')
