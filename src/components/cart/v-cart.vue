<template>
  <section class="v-cart">
    <h2>{{ heading }} <span v-if="typesOfCakeInCart == 0">is empty</span></h2>
    <picture class="v-cart_empty" v-if="typesOfCakeInCart == 0">
      <source
        srcset="@/assets/empty-cart.svg"
        media="(min-width: 600px)"
        type="image/svg+xml"
      />
      <img src="@/assets/empty-cart.png" alt="logo" />
    </picture>
    <router-link to="/" class="btn decoration-none"
      >⇐ Back to catalog</router-link
    >
    <form @submit.prevent="submit" v-if="typesOfCakeInCart">
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
          <input
            type="text"
            placeholder="Name"
            name="name"
            v-model="name"
            required
          />
          <input
            type="text"
            placeholder="Phone number"
            name="phone"
            v-model="phone"
            required
          />
        </div>
        <textarea
          type="text"
          placeholder="Add a comment for your order"
          name="comment"
          v-model="comment"
        ></textarea>
      </div>
      <button type="submit" class="btn">Make order</button>
    </form>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import vCartItem from '@/components/cart/v-cart-item'
import axios from 'axios'

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
  data () {
    return {
      name: '',
      phone: '',
      comment: ''
    }
  },
  computed: {
    ...mapGetters(['GET_CART']),
    typesOfCakeInCart () {
      return this.GET_CART.length
    },
    dataForm () {
      const arrItems = {}
      arrItems.typesOfCakeInCart = this.GET_CART.length
      for (let i = 0; i < this.GET_CART.length; i++) {
        arrItems['category_' + i] = this.GET_CART[i].category
        arrItems['title_' + i] = this.GET_CART[i].title
        arrItems['price_' + i] = this.GET_CART[i].price
        arrItems['quantity_' + i] = this.GET_CART[i].quantity
      }
      arrItems.name = this.name
      arrItems.phone = this.phone
      arrItems.comment = this.comment
      return arrItems
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
    },
    submit () {
      const vm = this
      axios
        .post('/', this.dataForm)
        .then(function (response) {
          if (response.status === 200) {
            vm.$router.push('thank')
          }
        })
        .catch(error => console.log(error))
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
