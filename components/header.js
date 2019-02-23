const html = require('choo/html')

module.exports = (name) => html`
  <div class="pv3 pv4-l ph4 bg-yellow dark-gray">
    <h1 class="f2">${name}</h1>
  </div>
`
