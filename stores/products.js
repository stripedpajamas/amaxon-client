const api = require('../api')

const initialState = {
  firstLoad: true,
  loading: false,
  products: []
}

module.exports = function store (state, emitter) {
  state.products = Object.assign({}, initialState)

  emitter.on('products:init', () => {
    state.products = Object.assign({}, initialState)
  })

  emitter.on('products:get', async () => {
    state.products.firstLoad = false
    state.products.loading = true
    emitter.emit(state.events.RENDER)
    try {
      const products = await api.getProducts()
      state.products.products = products || []
      state.products.loading = false
      emitter.emit(state.events.RENDER)
    } catch (e) {
      console.error(e)
      emitter.emit(state.events.PUSHSTATE, '/error')
    }
  })
  emitter.on('products:set', async (newProducts) => {
    state.products.loading = true
    try {
      const products = await api.setProducts(newProducts)
      state.products.products = products || []
      state.products.loading = false
      emitter.emit(state.events.RENDER)
    } catch (e) {
      console.error(e)
      emitter.emit(state.events.PUSHSTATE, '/error')
    }
  })
  emitter.on('DOMContentLoaded', () => {
  })
}
