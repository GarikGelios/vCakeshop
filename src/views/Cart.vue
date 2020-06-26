<template>
  <main class="cart">
    <vBenefits />
    <v-cart heading="Cart" />
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
