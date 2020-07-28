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
            <picture>
              <source
                srcset="@/assets/phone.svg"
                media="(min-width: 600px)"
                type="image/svg+xml"
              />
              <img src="@/assets/phone.png" alt="logo" width="40" height="40" />
            </picture>
            <div>
              {{ phone }}
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
    ...mapGetters(['GET_COUNT_CAKE_IN_CART'])
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
    &_phone {
      margin: 0 $margin * 2;
      a {
        font-weight: bold;
        color: #2c3e50;
        display: flex;
        align-items: center;
        picture {
          margin: 0 $margin;
        }
        p {
          margin: 0;
          font-weight: initial;
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
