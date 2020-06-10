export default {
  MUT_SPREADSHEETS_TO_STATE: (state, feed) => {
    state.spreadsheets = feed // записываю полученные данные в массив products: []
  },
  MUT_CHANGE_WINDOW_SIZE (state, size) {
    state.windowSize = size
  },
  MUT_PROCESSED_SPREADSHEETS_TO_STORE: (state, arr) => {
    state.products = arr
  }
}