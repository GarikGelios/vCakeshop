<template>
  <main class="v-home">
    <v-catalog msg="Catalog"/>
  </main>
</template>

<script>
// @ is an alias to /src
import vCatalog from '@/components/v-catalog.vue'

export default {
  name: 'Home',
  components: {
    vCatalog
  }
}
</script>
