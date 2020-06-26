<template>
  <section class="v-benefits">
    <div class="v-benefits_items"></div>
  </section>
</template>

<script>
export default {
  name: 'v-benefits'
}
</script>

<style lang="scss">
.v-benefits {
  margin: auto;
  min-height: 150px;
  background-image: url('../assets/drips.svg');
  background-position: top;
  background-repeat: repeat-x;
  &_items {
    max-width: $screenwidth * 2;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
}
</style>
