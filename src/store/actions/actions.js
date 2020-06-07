export default {
  ACT_WINDOW_SIZE ({ commit }, size) {
    commit('MUT_CHANGE_WINDOW_SIZE', size)
  }
}
