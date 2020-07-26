<template>
  <!-- check for published — if "0" this should not be shown on the page -->
  <div class="v-catalog-item" v-if="product_data.published == 1">
    <div class="v-catalog-item_description">
      <picture>
        <img
          :src="
            'https://drive.google.com/uc?export=view&id=' + product_data.img
          "
          alt="cake"
          width="300"
        />
      </picture>
      <h3>{{ product_data.category }} "{{ product_data.title }}"</h3>
      <p>{{ product_data.description }}</p>
    </div>
    <div class="v-catalog-item_price-and-button">
      <p>
        <strong>{{ product_data.price }} €</strong>
      </p>
      <button
        v-if="GET_CART.length == 0"
        class="btn btn-right"
        @click="showModalBuyNow"
      >
        Buy now
      </button>
      <!-- вызываю метод добавления в корзину -->
      <button
        v-if="GET_CART.length"
        @click="addToCartAndLink"
        class="btn btn-right decoration-none"
      >
        Buy now
      </button>
      <button @click="addToCart" v-if="!isOptionProduct" class="btn btn-empty btn-left">
        Add to cart
      </button>
      <!-- Если опций у продукта нету то показываем другую кнопку с вызом модального окна для выбора опций -->
      <button @click="showModalAddToCart" v-if="isOptionProduct" class="btn btn-empty btn-left">
        Add to cart
      </button>
    </div>
    <v-modal
      v-if="isModalVisible"
      @closeModalButton="closeModal"
      rightBtntitle="By now"
      :modalCategory="product_data.category"
      :modalTitle="product_data.title"
      :productPrice="product_data.price"
      :productCreamType="product_data.cream_type"
      :productCreamFlavor="product_data.cream_flavor"
      :isOptionProduct = "isOptionProduct"
      :clickBuyNowButtom = "clickBuyNowButtom"
      :cream_type_selected = "this.product_data.cream_type_selected"
      :cream_flavor_selected = "this.product_data.cream_flavor_selected"
      @selectedCreamType = "selectedCreamType"
      @selectedCreamFlavor = "selectedCreamFlavor"
      @addToCartFromModal = "addToCartFromModal"
    >
      <picture>
        <img
          :src="
            'https://drive.google.com/uc?export=view&id=' + product_data.img
          "
          alt="cake"
          width="300"
        />
      </picture>
    </v-modal>
  </div>
</template>

<script>
import vModal from './v-modal'
import { mapGetters } from 'vuex'

export default {
  name: 'v-catalog-item',
  components: {
    vModal
  },
  props: {
    product_data: {
      type: Object,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      isModalVisible: false, // по-умолчанию модальное окно скрыто
      clickBuyNowButtom: false
    }
  },
  computed: {
    ...mapGetters(['GET_CART']),
    isOptionProduct () { // проверяем есть ли у продукта различные опции по типу крема и аромату
      if (this.product_data.cream_flavor[0] === '' || this.product_data.cream_type[0] === '') {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    addToCart () {
      this.$emit('addToCart', this.product_data) // отправляю событие наверх, к родительскому компоненту со всем содержимым этого продукта
    },
    addToCartAndLink () {
      // добавляет товар в корзину и перелинковывает в саму корзину
      this.addToCart()
      this.$router.push('/cart')
    },
    showModalBuyNow () {
      this.isModalVisible = !this.isModalVisible // при вызове метода меняется состояние скрытности модального окна
      this.clickBuyNowButtom = !this.clickBuyNowButtom // отмечаем что была кликнута кнопка Buy now
    },
    showModalAddToCart () {
      this.isModalVisible = !this.isModalVisible // при вызове метода меняется состояние скрытности модального окна
    },
    closeModal () {
      this.showModalBuyNow() // т.к. модальное окно одно и то же достаточно обратить к одному событию которое его закроет
      this.clickBuyNowButtom = false // возвращаем состояние клика по кнопке Buy Now к состоянию false
    },
    selectedCreamType (option) { // полученное значение выбранной опции помещаем в объект product_data
      this.product_data.cream_type_selected = option // вместо выставленного по умолчанию первого в массиве
      this.product_data.uniqueProductWithOptions = this.product_data.id + option + this.product_data.cream_flavor_selected
    },
    selectedCreamFlavor (option) {
      this.product_data.cream_flavor_selected = option
      this.product_data.uniqueProductWithOptions = this.product_data.id + this.product_data.cream_type_selected + option
    },
    addToCartFromModal () {
      this.$emit('addToCart', this.product_data)
      this.closeModal()
    }
  }
}
</script>

<style lang="scss">
.v-catalog-item {
  h3 {
    font-family: 'Concert One', cursive;
  }
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  flex-basis: $screenwidth / 2;
  padding: $padding * 2;
  .btn {
    font-size: 13px;
  }
}
</style>
