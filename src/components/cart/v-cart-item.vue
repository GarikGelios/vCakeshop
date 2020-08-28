<template>
  <li class="v-cart-item">
    <div class="v-cart-item_img-name">
      <picture>
        <img
          :src="
            'https://drive.google.com/uc?export=view&id=' +
              cake_in_cart_data.img
          "
          alt="cake"
          height="100"
        />
      </picture>
      <div class="v-cart-item_img-name_name">
        <h3>
          {{ cake_in_cart_data.category }} "{{ cake_in_cart_data.title }}"
        </h3>
        <div class="v-cart-item_img-name_name_options">
          <span v-if="cake_in_cart_data.cream_type_selected">{{
            'cream: ' + cake_in_cart_data.cream_type_selected
          }}</span>
          <span v-if="cake_in_cart_data.cream_flavor_selected">{{
            'flavor: ' + cake_in_cart_data.cream_flavor_selected
          }}</span>
        </div>
      </div>
      <input
        type="hidden"
        :name="'category_' + item_index"
        v-model="cake_in_cart_data.category"
      />
      <input
        type="hidden"
        :name="'title_' + item_index"
        v-model="cake_in_cart_data.title"
      />
      <input
        type="hidden"
        :name="'creamType_' + item_index"
        v-model="cake_in_cart_data.cream_type_selected"
      />
      <input
        type="hidden"
        :name="'creamFlavor_' + item_index"
        v-model="cake_in_cart_data.cream_flavor_selected"
      />
    </div>
    <div
      class="v-cart-item_qnt-del"
      :class="{
        'justify-content-between': GET_WINDOW_TYPE == 'Extra small',
        'justify-content-end': GET_WINDOW_TYPE != 'Extra small'
      }"
    >
      <div class="v-cart-item__price">
        <strong
          >{{ cake_in_cart_data.price }} € /
          {{ cake_in_cart_data.price * cake_in_cart_data.quantity }} €</strong
        >
        <input
          type="hidden"
          :name="'price_' + item_index"
          v-model="cake_in_cart_data.price"
        />
      </div>
      <div class="v-cart-item__quantity">
        <div class="v-cart-item__quantity_controls">
          <p @click="decrementCake"><span>-</span></p>
          {{ cake_in_cart_data.quantity }}
          <input
            type="hidden"
            :name="'quantity_' + item_index"
            v-model="cake_in_cart_data.quantity"
          />
          <p @click="incrementCake"><span>+</span></p>
        </div>
      </div>
      <button class="btn btn-white" @click="deleteFromCart">Delete</button>
    </div>
  </li>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'v-cart-item',
  props: {
    cake_in_cart_data: {
      type: Object,
      default () {
        return []
      }
    },
    item_index: {
      type: Number,
      default () {
        return 0
      }
    }
  },
  computed: {
    ...mapGetters(['GET_WINDOW_TYPE']) // обратился к геттеру c размером экрана
  },
  methods: {
    decrementCake (index) {
      this.$emit('decrement') // надо поднять к родителю, т.к. там в методе v-for есть нужный index
    },
    incrementCake (index) {
      this.$emit('increment')
    },
    deleteFromCart (index) {
      this.$emit('delete')
    }
  }
}
</script>

<style lang="scss">
.v-cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  h3 {
    font-family: 'Concert One', cursive;
  }
  &_img-name {
    display: flex;
    align-items: center;
    flex-grow: 1;
    justify-content: space-between;
    &_name {
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      &_options {
        display: flex;
        flex-wrap: wrap;
        span {
          padding: 0 $padding 0 0;
        }
      }
    }
  }
  &__quantity {
    margin: 0 $margin * 3;
  }
  &__quantity_controls {
    display: flex;
    align-items: center;
    p {
      margin: $margin;
      cursor: pointer;
      color: $color-dark;
      // border: 2px solid $color-primary;
      border: 2px solid $color-dark;
      border-radius: 50%;
      span {
        padding: $padding / 2;
        font-weight: bold;
      }
    }
  }
  &_qnt-del {
    display: flex;
    align-items: center;
    flex-grow: 1;
  }
}
</style>
