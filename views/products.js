const html = require('choo/html')
const footer = require('../components/footer')
const header = require('../components/header')

const TITLE = 'amaxon - products'

module.exports = function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  if (state.products.firstLoad) {
    // emit('products:get')
  }

  // const { products } = state.products
  const products = [
    {
      "name": "hat",
      "url": "https://www.amazon.com/Carhartt-Mens-Acrylic-Watch-Hat/dp/B002G9U38W",
      "lastCheck": 1550873588743,
      "lastPrice": -1
    },
    {
      "name": "other thing",
      "url": "https://www.amazon.com/gp/product/B07M7YZH6Q",
      "lastCheck": 1550873588743,
      "lastPrice": -1
    }
  ]

  if (state.products.loading) {
    return html`
      <body>
        <p>Loading products...</p>
      </body>
    `
  }
  return html`
    <body class="sans-serif dark-gray">
      ${header('Product Dashboard')}
      <div class="pa4">
        <div class="overflow-auto">
          <div class="pt3 w-100 mw8 center">
            <h1 class="f4 lh-copy">Products currently watching</h2>
          </div>
          <table class="pt3 f6 w-100 mw8 center" cellspacing="0">
            <thead>
              <tr>
                <th class="fw6 tl pa3 bg-white">Name</th>
                <th class="fw6 tl pa3 bg-white">URL</th>
                <th class="fw6 tl pa3 bg-white">Last Price</th>
                <th class="fw6 tl pa3 bg-white">Last Checked</th>
                <th class="fw6 tl pa3 bg-white">Delete</th>
              </tr>
            </thead>
            <tbody class="lh-copy">
              ${products.map(product => html`
                <tr class="dim">
                  <td class="pa3">${product.name}</td>
                  <td class="pa3">
                    <a class="link" href="${product.url}" target="_blank">
                      ${product.url}
                    </a>
                  </td>
                  <td class="pa3">
                    ${product.lastPrice < 0 ? 'Unknown' : product.lastPrice}
                  </td>
                  <td class="pa3">
                    ${new Date(product.lastCheck).toLocaleDateString('en-US')}
                  </td>
                  <td class="pa3"><a href="#">x</a></td>
                </tr>
              `)}
            </tbody>
          </table>
          <div class="pt4 f6 w-100 mw8 center">
            <h1 class="f4 lh-copy">Add a product to watch</h2>
            <form class="pa3">
              <div class="">
                <div class="fl w-100 w-third-ns pa2">
                  <input id="name" placeholder="Product Name" class="input-reset ba b--black-20 pa2 mb3 db w-100" type="text" autocomplete="off">
                </div>
                <div class="fl w-100 w-third-ns pa2">
                  <input id="url" placeholder="Amazon Product URL" class="input-reset ba b--black-20 pa2 mb3 db w-100" type="text" autocomplete="off">
                </div>
                <div class="fl w-100 w-third-ns pa2">
                  <input id="add" class="fw6 bg-dark-gray yellow input-reset ba b--black-20 pa2 mb3 db w-100" type="submit" value="Add Product">
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      ${footer}
    </body>
  `
}
