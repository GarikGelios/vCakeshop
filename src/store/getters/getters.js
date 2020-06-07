export default {
  SPREADSHEETS (state) {
    return state.spreadsheets // реактивно получает данные из массива spreadsheets: [], который в state
  },
  WINDOW_TYPE (state) {
    return state.windowSize
  }
}
