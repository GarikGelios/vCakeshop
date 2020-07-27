<template>
  <main class="v-thank">
    <h2>Thank you for your order!</h2>
    <h3>Your order has been accepted, and soon you will be contacted at the specified phone number to clarify the details</h3>
    <picture class="v-cart_empty">
      <source
        srcset="@/assets/thank-cake.svg"
        media="(min-width: 600px)"
        type="image/svg+xml"
      />
      <img src="@/assets/thank-cake.png" alt="logo" />
    </picture>
    <router-link to="/" class="btn decoration-none">⇐ Back to catalog</router-link>
  </main>
</template>

<script>
export default {
  name: 'thank'
}
</script>

<style></style>
