<template>
  <section class="v-cart">
    <h2>{{ heading }} <span v-if="typesOfCakeInCart==0">is empty</span> </h2>
    <picture class="v-cart_empty" v-if="typesOfCakeInCart==0">
      <source
        srcset="@/assets/empty-cart.svg"
        media="(min-width: 600px)"
        type="image/svg+xml"
      />
      <img src="@/assets/empty-cart.png" alt="logo" />
    </picture>
    <router-link to="/" class="btn decoration-none">⇐ Back to catalog</router-link>
    <form method="POST" action="/" v-if="typesOfCakeInCart">
      <ul>
        <input
          type="hidden"
          name="typesOfCakeInCart"
          v-model="typesOfCakeInCart"
        />
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
      <div class="v-cart_info">
        <div class="v-cart_info-personal">
          <input type="text" placeholder="Name" name="name" required />
          <input type="text" placeholder="Phone number" name="phone" required />
        </div>
        <textarea
          type="text"
          placeholder="Add a comment for your order"
          name="comment"
        ></textarea>
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
  h2 {
    font-family: 'Concert One', cursive;
  }
  &_empty {
    img {
    width: 100%;
    max-height: 250px;
  }
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0 $padding;
  }
  &_info {
    display: flex;
    flex-direction: column;
    max-width: 462px;
    margin: auto;
    input,
    textarea {
      @include input;
    }
  }
}
</style>
