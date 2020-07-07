<template>
  <section class="v-benefits">
    <div class="v-benefits_items">
      <ul>
        <li>
          <picture>
            <source srcset="@/assets/calendar.svg" type="image/svg+xml" />
            <img src="@/assets/calendar.png" alt="2 Days" width="70"/>
          </picture>
          <p class="lead">High-quality execution of the order in two days</p>
        </li>
        <li>
          <picture>
            <source srcset="@/assets/point.svg" type="image/svg+xml" />
            <img src="@/assets/point.png" alt="point" width="70"/>
          </picture>
          <p class="lead">You can pick it up yourself at a convenient time</p>
        </li>
        <li>
          <picture>
            <source srcset="@/assets/delivery.svg" type="image/svg+xml" />
            <img src="@/assets/delivery.png" alt="delivery" width="70"/>
          </picture>
          <p class="lead">Free delivery of sweet pastries in Limmasol</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  name: 'v-benefits'
}
</script>

<style lang="scss">
.v-benefits {
  display: flex;
  align-items: center;
  margin: auto;
  padding: $padding*4 0;
  min-height: 150px;
  background-image: url('../assets/drips.svg');
  background-position: top;
  background-repeat: repeat-x;
  &_items {
    max-width: $screenwidth * 2;
    margin: auto;
    width: 100%;
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      margin: 0;
      list-style: none;
      li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-basis: 300px;
        p {
          text-align: left;
          margin: $margin;
        }
      }
    }
  }
}
</style>
