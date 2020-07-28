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
    commit('MUT_COUNT_CAKE_IN_CART') // при каждом изменении количества товара пересчитываем количество пирожков
  },
  ACT_DECREMENT_CART_ITEM ({ commit }, index) {
    commit('MUT_DECREMENT', index)
    commit('MUT_COUNT_CAKE_IN_CART')
  },
  ACT_INCREMENT_CART_ITEM ({ commit }, index) {
    commit('MUT_INCREMENT', index)
    commit('MUT_COUNT_CAKE_IN_CART')
  },
  ACT_DELETE_FROM_CART ({ commit }, index) {
    commit('MUT_REMOVE_FROM_CART', index)
    commit('MUT_COUNT_CAKE_IN_CART')
  },
  ACT_COUNT_CAKE_IN_CART ({ commit }) {
    commit('MUT_COUNT_CAKE_IN_CART')
  }
}
