<template>
  <div class="modal_wrapper" ref="modal_wrapper">
    <form @submit.prevent="submit" class="v-modal">
      <div class="v-modal__header">
        <h3>{{ modalCategory }} "{{ modalTitle }}" — {{ productPrice }} €</h3>
        <input type="hidden" name="typesOfCakeInCart" value="1" />
        <input type="hidden" name="category_0" v-model="modalCategory" />
        <input type="hidden" name="title_0" v-model="modalTitle" />
        <input type="hidden" name="price_0" v-model="productPrice" />
        <input type="hidden" name="quantity_0" value="1" />
        <input type="hidden" name="total" v-model="productPrice" />
        <span class="v-modal__header_close" @click="closeModalButton">X</span>
      </div>
      <div class="v-modal__content">
        <slot></slot>
      </div>
      <v-select
        :creamType="productCreamType"
        @selectCreamType="selectedCreamType"
        :creamFlavor="productCreamFlavor"
        @selectCreamFlavor="selectedCreamFlavor"
        :cream_type_selected="cream_type_selected"
        :cream_flavor_selected="cream_flavor_selected"
      />
      <!-- быстрая форма заявки доступна, если в корзина пуста, смотрим по массиву GET_CART -->
      <!-- <div class="v-modal__footer" v-if="!isOptionProduct || clickBuyNowButtom === true"> -->
      <div
        class="v-modal__footer"
        v-if="!this.GET_CART.length && clickBuyNowButtom === true"
      >
        <input type="hidden" name="name" value="customer" />
        <input
          type="text"
          placeholder="Enter your phone number"
          name="phone"
          required
          v-model="fields.phone"
        />
        <input type="hidden" name="comment" value="Quick order form" />
        <button type="submit" class="btn">
          {{ rightBtntitle }}
        </button>
      </div>
      <!-- чтобы не сабмитить форму это не button, а простая ссылка с отправкой события на верх к родителю -->
      <a
        @click="addToCart"
        class="btn btn-empty"
        v-if="
          (this.GET_CART.length && clickBuyNowButtom === true) ||
            clickAddToCartButton === true
        "
      >
        Add to cart
      </a>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import vSelect from './v-select'
import { mapGetters } from 'vuex'

export default {
  name: 'v-modal',
  components: {
    vSelect
  },
  props: {
    rightBtntitle: {
      type: String,
      default: 'OK'
    },
    modalCategory: {
      type: String,
      default: 'Category'
    },
    modalTitle: {
      type: String,
      default: 'Title'
    },
    productPrice: {
      type: String,
      default: '0'
    },
    productCreamType: {
      type: Array,
      default: () => []
    },
    productCreamFlavor: {
      type: Array,
      default: () => []
    },
    isOptionProduct: {
      type: Boolean,
      default: true
    },
    clickBuyNowButtom: {
      type: Boolean,
      default: true
    },
    clickAddToCartButton: {
      type: Boolean,
      default: true
    },
    cream_type_selected: {
      type: String,
      default: ''
    },
    cream_flavor_selected: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      fields: {
        typesOfCakeInCart: 1,
        category_0: this.modalCategory,
        title_0: this.modalTitle,
        price_0: this.productPrice,
        creamType_0: this.productCreamType[0],
        creamFlavor_0: this.productCreamFlavor[0],
        quantity_0: 1,
        total: this.productPrice,
        name: 'Customer',
        phone: '',
        comment: 'Quick order form'
      }
    }
  },
  computed: {
    ...mapGetters(['GET_CART'])
  },
  methods: {
    closeModalButton () {
      this.$emit('closeModalButton')
    },
    makeNotification () {
      this.$emit('makeNotification')
    },
    submit () {
      const vm = this
      axios
        .post('/', this.fields)
        .then(function (response) {
          if (response.status === 200) {
            vm.$router.push('thank')
          }
        })
        .catch(error => console.log(error))
    },
    selectedCreamType (option) {
      // встречаю функцию из дочернего v-select которая содержит опцию тип выбранного крема
      this.fields.creamType_0 = option // подставляю переданную опцию в массив fields
      this.$emit('selectedCreamType', option) // передать родительскому блоку тип крема
    },
    selectedCreamFlavor (option) {
      this.fields.creamFlavor_0 = option
      this.$emit('selectedCreamFlavor', option)
    },
    addToCart () {
      this.$emit('addToCartFromModal')
    }
  },
  mounted () {
    const vm = this
    document.addEventListener('click', function (item) {
      if (item.target === vm.$refs.modal_wrapper) {
        vm.closeModalButton()
      }
    })
  }
}
</script>

<style lang="scss">
.modal_wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba($color: #646464, $alpha: 0.4);
}
.v-modal {
  padding: $padding * 2;
  position: fixed;
  top: 50px;
  max-width: 400px;
  background: white;
  border-radius: $radius * 2;
  z-index: 10;
  &__header,
  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &_close {
      cursor: pointer;
      position: absolute;
      top: 10px;
      right: 10px;
    }
  }
  &__content {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      max-width: 300px;
      max-height: 300px;
    }
  }
  input {
    @include input;
  }
}
</style>
