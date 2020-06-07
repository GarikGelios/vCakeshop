export default {
  ACT_WINDOW_SIZE ({ commit }, size) {
    commit('MUT_CHANGE_WINDOW_SIZE', size)
  },
  ACT_PROCESSED_SPREADSHEETS_TO_STORE ({ commit }, arr) {
    commit('MUT_PROCESSED_SPREADSHEETS_TO_STORE', arr)
  }
}
