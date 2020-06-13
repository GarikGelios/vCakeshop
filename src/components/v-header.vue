<template>
  <header class="v-header">
    <picture>
      <source
        srcset="@/assets/logo/logo.svg"
        media="(min-width: 600px)"
        type="image/svg+xml"
      />
      <img src="@/assets/logo/logo.png" alt="logo" width="50" height="50" />
    </picture>
    <nav class="v-header_nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <div class="v-header_contacts">
      <div class="v-header_contacts_phone">
        <a :href="'tel:' + phone">{{ phone }}</a>
        <p>Call to us</p>
      </div>
      <button class="v-header_contacts_button btn btn-empty">
        Make order: {{ productsInCart }} cake in cart
      </button>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'v-header',
  computed: {
    ...mapGetters(['GET_CART']),
    productsInCart () {
      if (this.GET_CART.length === 0) {
        return 0 // по умолчанию в корзине 0
      } else {
        return this.GET_CART.reduce(function (sum, cake) {
          return sum + cake.quantity // считаю количество продукта каждого вида, сумма всех quantity продуктов в корзине
        }, 0)
      }
    }
  },
  data () {
    return {
      phone: '+0123456789'
    }
  }
}
</script>

<style lang="scss">
.v-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: $screenwidth * 2;
  margin: auto;
  padding: $padding;
  &_contacts {
    display: flex;
    &_phone {
      margin: 0 10px;
      p {
        margin: 0;
      }
    }
  }

  a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
