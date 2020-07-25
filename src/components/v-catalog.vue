<template>
  <section class="v-catalog">
    <h2>{{ msg }}</h2>
    <v-catalog-menu :categories="productCategories" @select="selectCategory" />
    <div class="v-catalog_items" v-if="this.sortedProducts.length">
      <v-catalog-item
        v-for="product in sortedProducts"
        :key="product.id"
        :product_data="product"
        @addToCart="addToCart"
      />
    </div>
    <!-- show preloader if data is not downloaded -->
    <div v-else>waite producte ...</div>
    <v-notification :messages="messages" />
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import vCatalogMenu from '@/components/v-catalog-menu'
import vCatalogItem from '@/components/v-catalog-item'
import vNotification from '@/components/notifications/v-notification'

export default {
  name: 'v-catalog',
  components: {
    vCatalogMenu,
    vCatalogItem,
    vNotification
  },
  props: {
    msg: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      sortedProducts: [],
      // messages: [{ name: 'notification name', id: Date.now().toLocaleString() }]
      messages: []
    }
  },
  computed: {
    ...mapGetters(['GET_SPREADSHEETS', 'GET_PROCESSED_SPREADSHEETS']), // обратился к геттеру в store который хранит данные из Google Таблицы
    productCategories () {
      return [
        ...new Set( // собираю названия категорий и оставляю каждое в единственном виде
          this.GET_PROCESSED_SPREADSHEETS.map(({ category }) => category)
        )
      ]
    }
  },
  methods: {
    ...mapActions([
      'ACT_SPREADSHEETS_FROM_API', // чтобы из компонента сработал вызов api добавляю его метод из vuex
      'ACT_PROCESSED_SPREADSHEETS_TO_STORE', // переработанный список товаров, с нормальными ключами
      'ACT_ADD_TO_CART' // для передачи в store продукта, в корзину
    ]),
    addToCart (data) {
      this.ACT_ADD_TO_CART(data).then(() => {
        const timeStamp = Date.now().toLocaleString() // уникальный id это время создания с точностью до милисекунды
        this.messages.unshift({ // или push, смотря куда собираешся добавлять: в конец или в начало
          name: data.category + ' added to cart',
          id: timeStamp
        })
      })
    },
    selectCategory (valueCategory) {
      this.sortedProducts = [...this.GET_PROCESSED_SPREADSHEETS] // перед проверкой возобновляем массив

      if (valueCategory !== 'all') {
        // проверяем, что если выбор вне списка категорий, то выводим все продукты
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
          // если появятся новые столбцы с информацией их надо добавить в эту функцию, без нижнего подчеркивания
          id: index,
          published: obj.gsx$published.$t,
          category: obj.gsx$category.$t,
          title: obj.gsx$title.$t,
          description: obj.gsx$description.$t,
          price: obj.gsx$price.$t,
          img: obj.gsx$imglink.$t.split('/view?')[0].split('d/')[1], // обрезаем лишнее в картинке
          cream_type: obj.gsx$creamtype.$t.split(', '), // разделяем полученные парамерты по запятой с пробелом и превращаем строку в массив
          cream_flavor: obj.gsx$creamflavor.$t.split(', ')
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

<style lang="scss">
.v-catalog {
  max-width: $screenwidth * 2;
  margin: auto;
  h2 {
    font-family: 'Concert One', cursive;
  }
  &_items {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
}
</style>
