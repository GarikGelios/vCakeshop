export default {
  MUT_SPREADSHEETS_TO_STATE: (state, feed) => {
    state.spreadsheets = feed // записываю полученные данные в массив products: []
  },
  MUT_CHANGE_WINDOW_SIZE (state, size) {
    state.windowSize = size
  },
  MUT_PROCESSED_SPREADSHEETS_TO_STORE: (state, arr) => {
    state.products = arr
  },
  MUT_ADD_TO_CART: (state, product) => {
    // принимает обект из экшена, когда нажали кнопку и добавляет его в массив cart: []
    if (state.cart.length) { // если в state массива корзине количество товара не нулевое
      let isProductExists = false
      state.cart.map(function (item) {
        if (item.title === product.title) {
          isProductExists = true
          item.quantity++
        }
      })
      if (!isProductExists) {
        state.cart.push({ ...product, quantity: 1 })
      }
    } else {
      state.cart.push({ ...product, quantity: 1 })
    }
  }
}
