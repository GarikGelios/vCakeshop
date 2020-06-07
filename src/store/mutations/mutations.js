export default {
  SET_SPREADSHEETS_TO_STATE: (state, feed) => {
    state.spreadsheets = feed // записываю полученные данные в массив products: []
  },
  CHANGE_WINDOW_SIZE (state, size) {
    state.windowSize = size
  }
}
