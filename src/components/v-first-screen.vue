<template>
  <section class="v-firstscreen">
    <article>
      <div class="v-firstscreen_text">
        <h1>homemade baking — in Cyprus</h1>
        <p class="lead">
          Is it your holiday, birthday, anniversary, or just love sweet
          pastries?
        </p>
        <p>
          Freshly baked home-made cakes, made only from natural products,
          according to the highest individual order, made with love.
        </p>
        <a class="v-firstscreen-button btn" href="#v-catalog-menu"
          >Show catalog</a
        >
      </div>
      <picture>
        <img
          src="https://drive.google.com/uc?export=view&id=1M7LWoBTfxnQa-oMBddgfJZl7SDARcsDU"
          alt="cake"
          width="100%"
        />
      </picture>
    </article>
  </section>
</template>

<script>
export default {
  name: 'v-first-screen'
}
</script>

<style lang="scss">
.v-firstscreen {
  background-color: $color-bg;
  article {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    max-width: $screenwidth * 2;
    margin: auto;
    padding: $padding;
  }
  &_text {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      flex-basis: 600px;
      h1 {
        font-family: 'Concert One', cursive;
        text-transform: uppercase;
        font-size: 36px;
        color: $color-primary;
      }
      p {
        text-align: left;
      }
      a {
        text-decoration: none;
      }
    }
}
</style>
