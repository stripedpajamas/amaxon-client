const css = require('sheetify')
const choo = require('choo')

css('tachyons')

const app = choo()
if (process.env.NODE_ENV !== 'production') {
  app.use(require('choo-devtools')())
} else {
  app.use(require('choo-service-worker')())
}

app.use(require('./stores/login'))
app.use(require('./stores/products'))

app.route('/', require('./views/login'))
app.route('/login', require('./views/auth'))
app.route('/products', require('./views/products'))
app.route('/error', require('./views/error'))
app.route('/*', require('./views/404'))

module.exports = app.mount('body')
