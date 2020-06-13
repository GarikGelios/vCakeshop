<template>
  <section class="v-firstscreen">
    <div class="v-firstscreen_text">
      <h1>homemade baking — in Cyprus</h1>
      <p>
        Is it your holiday, birthday, anniversary, or just love sweet pastries?
      </p>
      <p>
        Freshly baked home-made cakes, made only from natural products,
        according to the highest individual order, made with love.
      </p>
      <button class="v-firstscreen-button btn">Show menu</button>
    </div>
    <picture>
      <img
        src="https://drive.google.com/uc?export=view&id=1M7LWoBTfxnQa-oMBddgfJZl7SDARcsDU"
        alt="cake" width="100%"
      />
    </picture>
  </section>
</template>

<script>
export default {
  name: 'v-first-screen'
}
</script>

<style lang="scss">
.v-firstscreen {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  max-width: $screenwidth * 2;
  margin: auto;
  padding: $padding;
  &_text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex-basis: 600px;
    h1 {
      text-transform: uppercase;
    }
    p {
      text-align: left;
    }
  }
}
</style>
