<template>
  <main class="v-home">
    <vFirstScreen />
    <v-catalog msg="Catalog" />
  </main>
</template>

<script>
import vCatalog from '@/components/v-catalog'
import vFirstScreen from '@/components/v-firstscreen'

export default {
  name: 'Home',
  components: {
    vCatalog,
    vFirstScreen
  }
}
</script>
