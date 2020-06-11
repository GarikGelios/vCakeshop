<template>
  <main class="v-home">
    <v-first-screen />
    <v-catalog msg="Catalog" />
  </main>
</template>

<script>
import vCatalog from '@/components/v-catalog'
import vFirstScreen from '@/components/v-first-screen'

export default {
  name: 'Home',
  components: {
    vCatalog,
    vFirstScreen
  }
}
</script>
