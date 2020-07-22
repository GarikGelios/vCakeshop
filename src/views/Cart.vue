<template>
  <main class="cart">
    <vBenefits />
    <v-cart heading="Cart" />
    <router-link to="/thank" class="btn decoration-none">Thank page</router-link>
  </main>
</template>

<script>
import vBenefits from '@/components/v-benefits'
import vCart from '@/components/cart/v-cart'

export default {
  name: 'cart',
  components: {
    vCart,
    vBenefits
  }
}
</script>

<style></style>
