<template>
  <header class="v-header">
    <div class="v-header_wraper">
      <router-link to="/">
        <picture class="logo">
          <img
            src="@/assets/logo/logo.png"
            alt="logo"
            width="120"
            height="120"
          />
        </picture>
      </router-link>
      <div class="v-header_contacts">
        <div class="v-header_contacts_phone">
          <a :href="'viber://chat?number=%2B' + phone"
            ><img src="@/assets/viber.svg" alt="logo" width="17" height="17" />
            Viber</a
          >
          <a :href="'https://wa.me/' + phone"
            ><img src="@/assets/watsup.svg" alt="logo" width="17" height="17" />
            WatsApp</a
          >
          <a :href="'tel:+' + phone">
            <img
              src="@/assets/smartphone-sending-data.svg"
              alt="logo"
              width="17"
              height="17"
            />
            +{{ phone }}
          </a>
        </div>
        <router-link to="/cart" class="v-header_contacts_button btn btn-empty">
          Cart: {{ this.GET_COUNT_CAKE_IN_CART }} cake
        </router-link>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'v-header',
  computed: {
    ...mapGetters(['GET_COUNT_CAKE_IN_CART', 'GET_WINDOW_TYPE'])
  },
  data () {
    return {
      phone: '35797669451'
    }
  }
}
</script>

<style lang="scss">
.v-header {
  &_wraper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
    max-width: $screenwidth * 2;
    padding: $padding;
    margin: auto;
    .logo {
      position: absolute;
      top: 0;
    }
  }
  &_contacts {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-items: center;
    &_phone {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;
      margin: 0 0 0 $margin * 15;
      text-align: end;
      a {
        color: $color-dark;
        padding: $padding/2 $padding;
      }
    }
  }

  a {
    text-decoration: none;
    border-width: 2px;

    &.router-link-exact-active {
      color: $color-dark;
      font-weight: 700;
    }
  }
}
</style>
