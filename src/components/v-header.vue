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
          <a :href="'tel:' + phone">
            {{ phone }}
            <div>
              <img src="@/assets/viber.svg" alt="logo" width="20" height="20" />
              <img
                src="@/assets/watsup.svg"
                alt="logo"
                width="20"
                height="20"
              />
              <p>Call to us</p>
            </div></a
          >
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
      phone: '(+357) 97669451'
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
      margin: 0 $margin * 2 $margin $margin * 8;
      a {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-weight: bold;
        color: #2c3e50;
        div {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          p {
            margin: 0;
            font-weight: initial;
          }
        }
      }
    }
  }

  a {
    text-decoration: none;
    border-width: 2px;

    &.router-link-exact-active {
      color: #a63e51;
      font-weight: 700;
    }
  }
}
</style>
