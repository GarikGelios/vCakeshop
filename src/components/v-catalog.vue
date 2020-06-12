<template>
  <div class="v-catalog">
    <h2>{{ msg }}</h2>
    <v-catalog-menu :categories="productCategories" @select="selectCategory" />
    <div v-if="this.GET_PROCESSED_SPREADSHEETS.length">
      <div v-for="product in sortedProducts" :key="product.id">
        <picture>
          <img
            :src="'https://drive.google.com/uc?export=view&id=' + product.img"
            alt="cake"
          />
        </picture>
      </div>
    </div>
    <div v-else>waite producte ...</div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import vCatalogMenu from '@/components/v-catalog-menu'

export default {
  name: 'v-catalog',
  components: {
    vCatalogMenu
  },
  props: {
    msg: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      sortedProducts: []
    }
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
    selectCategory (valueCategory) {
      this.sortedProducts = [...this.GET_PROCESSED_SPREADSHEETS] // перед проверкой возобновляем массив

      if (valueCategory !== 'all') { // проверяем, что если выбор вне списка категорий, то выводим все продукты
        // если в опции что-то есть, то перебери массим сортированных продуктов
        this.sortedProducts = this.sortedProducts.filter(function (product) {
          return product.category === valueCategory
        })
      } else {
        return this.GET_PROCESSED_SPREADSHEETS
      }
    },
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
          this.sortedProducts = [...this.GET_PROCESSED_SPREADSHEETS]
        }
      })
  }
}
</script>

<style></style>
