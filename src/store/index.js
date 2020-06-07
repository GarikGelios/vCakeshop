import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations/mutations'
import commonActions from './actions/actions'
import apiRequest from './actions/api-request'
import getters from './getters/getters'

const actions = { ...commonActions, ...apiRequest }

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    windowSize: '', // размер экрана
    spreadsheets: [], // данные из Google Таблицы
    products: []
  },
  mutations,
  actions,
  getters
})
