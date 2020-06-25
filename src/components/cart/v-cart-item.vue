<template>
  <li class="v-cart-item">
    <picture>
      <img
        :src="
          'https://drive.google.com/uc?export=view&id=' + cake_in_cart_data.img
        "
        alt="cake"
        height="100"
      />
    </picture>
    <h3>{{ cake_in_cart_data.category }} "{{ cake_in_cart_data.title }}"</h3>
    <input type="hidden" :name="'title_' + item_index" v-model="cake_in_cart_data.title">
    <div class="v-cart-item__quantity">
      <div class="v-cart-item__quantity_controls">
        <span @click="decrementCake">-</span>
        {{ cake_in_cart_data.quantity }}
        <input type="hidden" :name="'quantity_' + item_index" v-model="cake_in_cart_data.quantity">
        <span @click="incrementCake">+</span>
      </div>
    </div>
    <button @click="deleteFromCart">Delete</button>
  </li>
</template>

<script>
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
  justify-content: space-around;
  align-items: center;
}
</style>
