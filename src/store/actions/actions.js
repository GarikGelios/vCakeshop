export default {
  ACT_WINDOW_SIZE ({ commit }, size) {
    commit('MUT_CHANGE_WINDOW_SIZE', size)
  },
  ACT_PROCESSED_SPREADSHEETS_TO_STORE ({ commit }, arr) {
    commit('MUT_PROCESSED_SPREADSHEETS_TO_STORE', arr)
  },
  ACT_ADD_TO_CART ({ commit }, product) {
    // функция реагирует на нажатие кнопки @click="addToCart" и отправляет на мутацию обект
    commit('MUT_ADD_TO_CART', product)
  }
}
