const html = require('choo/html')

const TITLE = 'amaxon - products'

module.exports = function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  if (state.products.firstLoad) {
    emit('products:get')
  }

  const { products } = state.products

  function onDelete (idx) {
    const newProducts = products.filter((_, i) => i !== idx)
    emit('products:set', newProducts)
  }

  function onSubmit (e) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new window.FormData(form)
    const name = data.get('name')
    const url = data.get('url')
    const newProducts = products.concat([
      { name, url, lastPrice: -1, lastCheck: -1 }
    ])
    emit('products:set', newProducts)
  }

  if (state.products.loading) {
    return html`
      <div class="pt3 w-100 mw8 center">
        <h1 class="f4 lh-copy tc">Loading products...</h2>
      </div>
    `
  }
  return html`
    <div class="overflow-auto">
      <div class="pt3 w-100 mw8 center">
        <h1 class="f4 lh-copy">Products currently watching</h2>
      </div>
      <div class="pt3 f6 w-100 mw8 center">
        <div class="cf lh-copy">
          ${products.map((product, idx) => html`
            <div class="cf hover-bg-light-gray bb bt b--light-gray">
              <div class="pa3 fl w-100 w-20-ns">${product.name}</div>
              <div class="pa3 fl w-100 w-30-ns" style="word-break: break-all">
                <a class="link underline-hover" href="${product.url}" target="_blank">
                  ${product.url}
                </a>
              </div>
              <div class="pa3 fl w-third w-20-ns">
                Price: ${product.lastPrice < 0 ? 'Unknown' : product.lastPrice}
              </div>
              <div class="pa3 fl w-third w-20-ns">
                Last Checked: ${product.lastCheck < 0 ? 'Never' : new Date(product.lastCheck).toLocaleDateString()}
              </div>
              <div class="pa3 fl w-third w-10-ns">
                <a class="fw6 f5 hover-red pointer" onclick=${() => onDelete(idx)}>x</a>
              </div>
            </div>
          `)}
        </div>
      </div>
      <div class="pt4 f6 w-100 mw8 center">
        <h1 class="f4 lh-copy">Add a product to watch</h2>
        <form class="pa3" onsubmit=${onSubmit}>
          <div class="">
            <div class="fl w-100 w-third-ns pa2">
              <input id="name" name="name" placeholder="Product Name" required class="input-reset ba b--black-20 pa2 mb3 db w-100" type="text" autocomplete="off">
            </div>
            <div class="fl w-100 w-third-ns pa2">
              <input id="url" name="url" placeholder="Amazon Product URL" required class="input-reset ba b--black-20 pa2 mb3 db w-100" type="text" autocomplete="off">
            </div>
            <div class="fl w-100 w-third-ns pa2">
              <input id="add" class="fw6 bg-dark-gray yellow input-reset ba b--black-20 pa2 mb3 db w-100 pointer hover-bg-black" type="submit" value="Add Product">
            </div>
          </div>
        </form>
      </div>
    </div>
  `
}
