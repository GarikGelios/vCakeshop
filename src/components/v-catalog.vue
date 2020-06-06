<template>
  <div class="v-catalog">
    <h2>{{ msg }}</h2>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'v-catalog',
  props: {
    msg: {
      type: String,
      default: ''
    }
  },
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['SPREADSHEETS']), // обратился к геттеру в store который хранит данные из Google Таблицы
    productsFromSpreadsheets () { // вычисляемое свойство для итогового массива с продукцией
      const gsx = this.SPREADSHEETS.feed.entry // сокращаем обращение в json до информации в ячейках
      const arr = gsx.map(obj => { // map создаёт новый массив который будет содержать только необходимые ключи с красивым названием
        return { // если появятся новые столбцы с информацией их надо добавить в эту функцию
          published: obj.gsx$published.$t,
          category: obj.gsx$category.$t,
          title: obj.gsx$title.$t,
          description: obj.gsx$description.$t,
          price: obj.gsx$price.$t,
          img: obj.gsx$img.$t
        }
      })
      return arr
    }
  },
  methods: {
    ...mapActions(['GET_SPREADSHEETS_FROM_API']) // чтобы из компонента сработал вызов api добавляю его метод из _vuex_
  },
  mounted () {
    this.GET_SPREADSHEETS_FROM_API() // как только компонент загружен, сразу вызываем api запрос на получение json из Google Таблиц
  }
}
</script>

<style></style>
