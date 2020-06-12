<template>
  <!-- check for published — if "0" this should not be shown on the page -->
  <div class="v-catalog-item" v-if="product_data.published == 1">
    <picture>
      <img
        :src="'https://drive.google.com/uc?export=view&id=' + product_data.img"
        alt="cake" width="100%"
      />
    </picture>
    <h3>{{ product_data.category }} "{{ product_data.title }}"</h3>
    <p>{{ product_data.description }}</p>
    <p>{{ product_data.price }} €</p>
    <button>Buy it</button>
  </div>
</template>

<script>
export default {
  name: 'v-catalog-item',
  props: {
    product_data: {
      type: Object,
      default () {
        return []
      }
    }
  }
}
</script>

<style lang="scss">
.v-catalog-item {
  flex-basis: $screenwidth * 2 / 3;
}
</style>
