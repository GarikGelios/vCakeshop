<template>
  <section class="v-cart">
    <h2>{{ heading }}</h2>
    <form method="POST" action="/">
      <ul>
        <v-cart-item
          v-for="(cake, index) in this.GET_CART"
          :key="cake.id"
          :cake_in_cart_data="cake"
          @delete="deleteFromCart(index)"
          @decrement="decrement(index)"
          @increment="increment(index)"
        />
      </ul>
      <input type="text" name="text">
       <button type="submit">Send order</button>
    </form>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import vCartItem from '@/components/cart/v-cart-item'

export default {
  name: 'v-cart',
  components: {
    vCartItem
  },
  props: {
    heading: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters(['GET_CART'])
  },
  methods: {
    ...mapActions([
      'ACT_DECREMENT_CART_ITEM',
      'ACT_INCREMENT_CART_ITEM',
      'ACT_DELETE_FROM_CART'
    ]),
    decrement (index) {
      this.ACT_DECREMENT_CART_ITEM(index)
    },
    increment (index) {
      this.ACT_INCREMENT_CART_ITEM(index)
    },
    deleteFromCart (index) {
      this.ACT_DELETE_FROM_CART(index)
    }
  }
}
</script>

<style lang="scss">
.v-cart {
  max-width: $screenwidth * 2;
  margin: auto;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
}
</style>
