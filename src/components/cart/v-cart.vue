<template>
  <section class="v-cart">
    <h2>{{ heading }}</h2>
    <form method="POST" action="/">
      <ul>
        <v-cart-item
          v-for="(cake, index) in this.GET_CART"
          :key="cake.id"
          :cake_in_cart_data="cake"
          :item_index="index"
          @delete="deleteFromCart(index)"
          @decrement="decrement(index)"
          @increment="increment(index)"
        />
      </ul>
      <div>
        <div class="v-cart_personal-info">
          <input type="text" placeholder="Name" name="name" required />
          <input type="text" placeholder="Phone number" name="phone" required />
        </div>
        <input
          type="text"
          placeholder="Add a comment for your order"
          name="comment"
        />
      </div>
      <button type="submit" class="btn">Make order</button>
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
    ...mapGetters(['GET_CART']),
    typesOfCakeInCart () {
      return this.GET_CART.length
    }
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
  &_personal-info {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  input {
    @include input;
  }
}
</style>
