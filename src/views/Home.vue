<template>
  <main class="v-home">
    <vFirstScreen />
    <vCatalog msg="Catalog" />
  </main>
</template>

<script>
// @ is an alias to /src
import vCatalog from '@/components/v-catalog.vue'
import vFirstScreen from '@/components/v-firstscreen.vue'

export default {
  name: 'Home',
  components: {
    vCatalog,
    vFirstScreen
  }
}
</script>
