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
        />
      </picture>
      <div
        class="v-catalog-item_description_text"
        :class="{ basis130: GET_WINDOW_TYPE == 'Extra large' }"
      >
        <h3>{{ product_data.category }} "{{ product_data.title }}"</h3>
        <p>{{ product_data.description }}</p>
      </div>
    </div>
    <div class="v-catalog-item_price-and-button">
      <p>
        <strong>{{ product_data.price }} €</strong>
      </p>
      <!-- вызывает модальное окно с формой быстрого заказа, также записывает что была нажата кнопка Buy now -->
      <button
        v-if="GET_CART.length == 0"
        class="btn btn-right"
        @click="
          showModalBuyNow()
          clickBuyNowButtom = true
        "
      >
        Buy now
      </button>
      <!-- вызываю метод добавления в корзину -->
      <button
        v-if="GET_CART.length && !isOptionProduct"
        @click="
          addToCartAndLink()
          clickBuyNowButtom = true
        "
        class="btn btn-right decoration-none"
      >
        Buy now
      </button>
      <!-- если в корзине уже есть товары и у товара есть опции, то кнопка Buy now вызывает модальное окно для выбора опций-->
      <button
        v-if="GET_CART.length && isOptionProduct"
        @click="
          showModalAddToCart()
          clickBuyNowButtom = true
        "
        class="btn btn-right decoration-none"
      >
        Buy now
      </button>
      <!-- если у товара нету опций то сразу добавляет его в корзину -->
      <button
        @click="addToCart"
        v-if="!isOptionProduct"
        class="btn btn-empty btn-left"
      >
        Add to cart
      </button>
      <!-- если у товара есть опции то показывает другую кнопку с вызом модального окна, где будут отображены опции -->
      <button
        @click="
          showModalAddToCart()
          clickAddToCartButton = true
        "
        v-if="isOptionProduct"
        class="btn btn-empty btn-left"
      >
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
      :isOptionProduct="isOptionProduct"
      :clickBuyNowButtom="clickBuyNowButtom"
      :clickAddToCartButton="clickAddToCartButton"
      :cream_type_selected="this.product_data.cream_type_selected"
      :cream_flavor_selected="this.product_data.cream_flavor_selected"
      @selectedCreamType="selectedCreamType"
      @selectedCreamFlavor="selectedCreamFlavor"
      @addToCartFromModal="addToCartFromModal"
    >
      <picture>
        <img
          :src="
            'https://drive.google.com/uc?export=view&id=' + product_data.img
          "
          alt="cake"
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
      clickBuyNowButtom: false,
      clickAddToCartButton: false
    }
  },
  computed: {
    ...mapGetters(['GET_CART', 'GET_WINDOW_TYPE']),
    isOptionProduct () {
      // проверяем есть ли у продукта различные опции по типу крема и аромату
      if (
        this.product_data.cream_flavor[0] === '' ||
        this.product_data.cream_type[0] === ''
      ) {
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
    },
    showModalAddToCart () {
      this.isModalVisible = !this.isModalVisible // при вызове метода меняется состояние скрытности модального окна
    },
    closeModal () {
      this.showModalBuyNow() // т.к. модальное окно одно и то же достаточно обратить к одному событию которое его закроет
      this.clickBuyNowButtom = false // возвращаем состояние клика по кнопке Buy Now к состоянию false
      this.clickAddToCartButton = false // возвращаем состояние клика по кнопке Buy Now к состоянию false
    },
    selectedCreamType (option) {
      // полученное значение выбранной опции помещаем в объект product_data
      this.product_data.cream_type_selected = option // вместо выставленного по умолчанию первого в массиве
      this.product_data.uniqueProductWithOptions =
        this.product_data.id + option + this.product_data.cream_flavor_selected
    },
    selectedCreamFlavor (option) {
      this.product_data.cream_flavor_selected = option
      this.product_data.uniqueProductWithOptions =
        this.product_data.id + this.product_data.cream_type_selected + option
    },
    addToCartFromModal () {
      this.$emit('addToCart', this.product_data)
      const vm = this
      if (!this.clickAddToCartButton) {
        vm.$router.push('/cart')
      }
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
  &_description {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
    img {
      max-width: 300px;
      max-height: 300px;
    }
    .basis130 {
      flex-basis: 130px;
    }
  }
}
</style>
