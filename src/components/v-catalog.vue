<template>
  <div class="v-catalog">
    <h2>{{ msg }}</h2>
    <div v-for="category in this.productCategories" :key="category">
      {{ category }}
    </div>
    <div v-if="this.GET_PROCESSED_SPREADSHEETS.length">
      {{ this.GET_PROCESSED_SPREADSHEETS }}
    </div>
    <div v-else>waite producte ...</div>
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
    ...mapGetters(['GET_SPREADSHEETS', 'GET_PROCESSED_SPREADSHEETS']), // обратился к геттеру в store который хранит данные из Google Таблицы
    productCategories () {
      return [
        ...new Set(
          this.GET_PROCESSED_SPREADSHEETS.map(({ category }) => category)
        )
      ]
    }
  },
  methods: {
    ...mapActions([
      'ACT_SPREADSHEETS_FROM_API', // чтобы из компонента сработал вызов api добавляю его метод из vuex
      'ACT_PROCESSED_SPREADSHEETS_TO_STORE'
    ]),
    productsFromSpreadsheets () {
      // вычисляемое свойство для итогового массива с продукцией
      const gsx = this.GET_SPREADSHEETS.feed.entry // сокращаем обращение в json до информации в ячейках
      const arr = gsx.map((obj, index) => {
        // map создаёт новый массив который будет содержать только необходимые ключи с красивым названием
        return {
          // если появятся новые столбцы с информацией их надо добавить в эту функцию
          id: index,
          published: obj.gsx$published.$t,
          category: obj.gsx$category.$t,
          title: obj.gsx$title.$t,
          description: obj.gsx$description.$t,
          price: obj.gsx$price.$t,
          img: obj.gsx$img.$t
        }
      })
      this.ACT_PROCESSED_SPREADSHEETS_TO_STORE(arr)
    }
  },
  mounted () {
    this.ACT_SPREADSHEETS_FROM_API() // как только компонент загружен, сразу вызываем api запрос на получение json из Google Таблиц
      .then(response => {
        if (response.data) {
          console.log('Data arrived!')
          this.productsFromSpreadsheets() // и тут же превращаем в красивый массив
        }
      })
  }
}
</script>

<style></style>
