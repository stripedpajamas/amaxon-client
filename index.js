const css = require('sheetify')
const choo = require('choo')

const withLayout = require('./components/layout')

const loginView = withLayout(require('./views/login'), 'Login')
const authView = withLayout(require('./views/auth'), 'Login')
const productView = withLayout(require('./views/products'), 'Product Dashboard')
const errorView = withLayout(require('./views/error'), 'Error')
const notFoundView = withLayout(require('./views/404'), 'Not Found')

function withAuth (handler) {
  return function (state, emit) {
    if (!state.login.authenticated) {
      return loginView(state, emit)
    }
    return handler(state, emit)
  }
}

function withQuery (handler) {
  return function (state, emit) {
    if (!state.query.email || !state.query.token) {
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
app.route('/login', withQuery(authView))
app.route('/products', withAuth(productView))
app.route('/error', errorView)
app.route('/*', notFoundView)

module.exports = app.mount('body')
