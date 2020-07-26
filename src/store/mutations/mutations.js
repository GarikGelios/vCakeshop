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
    if (state.cart.length) {
      // если в state массива корзине количество товара не нулевое
      let isProductExists = false
      state.cart.map(function (item) {
        if (item.uniqueProductWithOptions === product.uniqueProductWithOptions) {
          console.log('%c%s', 'background-color: white; color: #A63E51; font: 1rem/1 Tahoma; padding: 0 5px', 'Another one ' + item.category + ' "' + item.title + '" ' + item.cream_type_selected + ' / ' + item.cream_flavor_selected + ' has been added to cart.')
          isProductExists = true
          item.quantity++
        }
      })
      if (!isProductExists) {
        state.cart.push({ ...product, quantity: 1 })
        console.log('%c%s', 'background-color: white; color: #A63E51; font: 1rem/1 Tahoma; padding: 0 5px', product.category + ' "' + product.title + '" ' + product.cream_type_selected + ' / ' + product.cream_flavor_selected + ' has been added to cart.')
      }
    } else {
      state.cart.push({ ...product, quantity: 1 })
      console.log('%c%s', 'background-color: white; color: #A63E51; font: 1rem/1 Tahoma; padding: 0 5px', product.category + ' "' + product.title + '" ' + product.cream_type_selected + ' / ' + product.cream_flavor_selected + ' has been added to cart.')
    }
  },
  MUT_DECREMENT (state, index) {
    if (state.cart[index].quantity > 1) {
      state.cart[index].quantity--
    }
  },
  MUT_INCREMENT (state, index) {
    state.cart[index].quantity++
  },
  MUT_REMOVE_FROM_CART: (state, index) => {
    state.cart.splice(index, 1)
  }
}
