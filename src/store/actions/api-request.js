import axios from 'axios'

export default {
  GET_SPREADSHEETS_FROM_API ({ commit }) {
    const url =
      'https://spreadsheets.google.com/feeds/list/1PVWNPVPAZ8lPTJW4CkW95ybnRxT6G_SSX3RNNDdkWgg/1/public/full?alt=json'
    return axios(url, {
      method: 'GET' // делаю запрос в Google Таблицы
    })
      .then(feed => { // отправляю полученное в мутации
        commit('SET_SPREADSHEETS_TO_STATE', feed.data) // прокидываем в мутацию полученную data из feed
        return feed
      })
      .catch(error => { // если вдруг ошибка
        console.log(error)
        return error
      })
  }
}
