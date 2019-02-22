const html = require('choo/html')

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
    <body class="sans-serif">
      <main>
        <section>
          <form onsubmit=${onsubmit}>
            <fieldset>
              <legend>Sign In</legend>
              <div>
                <label class="clip" for="email-address">Email Address</label>
                <input
                  placeholder="Your Email Address"
                  type="text"
                  name="email"
                  value=${state.login.email}
                  id="email-address"
                  ${state.login.loading ? 'disabled' : ''}
                >
                <input
                  type="submit"
                  value=${state.login.loading ? 'Loading...' : 'Send Login Email'}
                >
              </div>
            </fieldset>
          </form>
        </section>
      </main>
    </body>
  `

  const loggedInPage = html`
    <body class="sans-serif">
      <main>
        <section>
          We've just sent you an email with a login link. Click the link to login.
          <p>You can safely close this page.</p>
        </section>
      </main>
    </body>
  `

  if (state.login.authenticated) {
    // if we are authenticated, go to products
    emit(state.events.PUSHSTATE, '/products')
    return html`
      <body>Redirecting...</body>
    `
  }

  if (state.login.loggedIn) {
    return loggedInPage
  }

  if (state.login.firstLoad) emit('login:check')
  return loginPage
}
