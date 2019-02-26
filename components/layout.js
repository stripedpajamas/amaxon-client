const html = require('choo/html')

module.exports = (view, name) => (state, emit) => {
  return html`
    <body class="sans-serif flex flex-column min-vh-100">
      <div class="pv2 pv3-l ph4 bg-yellow dark-gray">
        <h1 class="f2">${name}</h1>
      </div>
      <main style="flex: 1" class="pt3 dark-gray">
        ${view(state, emit)}
      </main>
      <footer class="bg-dark-gray white-80 pv3 pv4-l ph4">
        <p class="f6"><span class="dib mr4 mr5-ns">Copyright © 2019 Peter Squicciarini</span>
          <a class="link white-80 hover-yellow" href="https://github.com/stripedpajamas/amaxon-client/blob/master/LICENSE">MIT License</a> /
          <a class="link white-80 hover-yellow" href="https://github.com/stripedpajamas/amaxon-client"> Github </a> /
          <a class="link white-80 hover-yellow" href="https://github.com/choojs/choo"> Made with Choo </a>
        </p>
      </footer>
    </body>
  `
}
