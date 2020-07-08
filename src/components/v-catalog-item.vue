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
      <button v-if="GET_CART.length==0" class="btn btn-right" @click="showModal">Buy now</button>
      <!-- вызываю метод добавления в корзину -->
      <router-link v-if="GET_CART.length" to="/cart" class="btn btn-right decoration-none">
        Buy now
      </router-link>
      <button @click="addToCart" class="btn btn-empty btn-left">
        Add to cart
      </button>
    </div>
    <v-modal
      v-if="isModalVisible"
      @closeModalButton="closeModal"
      rightBtntitle="By now"
      :modalTitle="
        product_data.category + ' &quot;' + product_data.title + '&quot;'
      "
      :productPrice="product_data.price"
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
      isModalVisible: false // по-умолчанию модальное окно скрыто
    }
  },
  computed: {
    ...mapGetters(['GET_CART'])
  },
  methods: {
    addToCart () {
      this.$emit('addToCart', this.product_data) // отправляю событие наверх, к родительскому компоненту со всем содержимым этого продукта
    },
    showModal () {
      this.isModalVisible = !this.isModalVisible // при вызове метода меняется состояние скрытности модального окна
    },
    closeModal () {
      this.showModal()
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
