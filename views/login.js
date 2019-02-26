const html = require('choo/html')
const header = require('../components/header')
const footer = require('../components/footer')

const TITLE = 'amaxon - login'

module.exports = function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  function onsubmit (e) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new window.FormData(form)
    const email = data.get('email')
    emit('login:begin', email)
  }

  const loginPage = html`
    <body class="sans-serif flex flex-column min-vh-100">
      ${header('Login')}
      <main style="flex: 1" class="pt3 dark-gray">
        <section>
          <form onsubmit=${onsubmit} class="mw7 center pa4 br2-ns">
            <div class="cf">
              <p class="pb3">Enter your email address to sign in. You will receive a magic login link within a few minutes.</p>
              <label class="clip" for="email-address">Email Address</label>
              <input
                class="ba b--black-20 f6 f5-l input-reset fl black-80 bg-white pa3 lh-solid w-100 w-75-m w-80-l br2-ns br--left-ns"
                placeholder="Your Email Address"
                type="text"
                name="email"
                value=${state.login.email}
                id="email-address"
                ${state.login.loggingIn ? 'disabled' : ''}
              >
              <input
                class="ba b--dark-gray f6 f5-l button-reset fl pv3 tc bg-animate bg-dark-gray hover-bg-black white pointer w-100 w-25-m w-20-l br2-ns br--right-ns"
                type="submit"
                value=${state.login.loggingIn ? 'Loading...' : 'Send Login Email'}
                ${state.login.loggingIn ? 'disabled' : ''}
              >
            </div>
          </form>
        </section>
      </main>
      ${footer}
    </body>
  `

  const loggedInPage = html`
    <body class="sans-serif flex flex-column min-vh-100">
      ${header('Login')}
      <main style="flex: 1" class="pt3 dark-gray">
        <div class="pt3 w-100 mw8 center">
          <h1 class="f4 lh-copy tc">We've just sent you an email with a login link. Click the link to login.</h1>
          <h2 class="f6 lh-copy tc">You can safely close this page.</h2>
        </div>
      </main>
      ${footer}
    </body>
  `

  if (state.login.authenticated || state.login.loading) {
    // if we are authenticated, go to products
    if (state.login.authenticated) emit(state.events.PUSHSTATE, '/products')
    else if (state.login.firstLoad) emit('login:check')

    const text = state.login.authenticated ? 'Redirecting...' : 'Loading...'
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

  if (state.login.loggedIn) {
    return loggedInPage
  }

  if (state.login.firstLoad) emit('login:check')
  return loginPage
}
