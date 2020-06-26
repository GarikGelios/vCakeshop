<template>
  <main class="v-home">
    <v-first-screen />
    <vBenefits />
    <v-catalog msg="Choose sweets to your taste" />
  </main>
</template>

<script>
import vFirstScreen from '@/components/v-first-screen'
import vBenefits from '@/components/v-benefits'
import vCatalog from '@/components/v-catalog'

export default {
  name: 'Home',
  components: {
    vCatalog,
    vFirstScreen,
    vBenefits
  }
}
</script>
