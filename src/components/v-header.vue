<template>
  <header class="v-header">
    <picture>
      <source
        srcset="@/assets/logo/logo.svg"
        media="(min-width: 600px)"
        type="image/svg+xml"
      />
      <img src="@/assets/logo/logo.png" alt="logo" width="50" height="50" />
    </picture>
    <nav class="v-header_nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <div class="v-header_contacts">
      <div class="v-header_contacts_phone">
        <a :href='"tel:" + phone'>{{ phone }}</a>
        <p>Call to us</p>
      </div>
      <button class="v-header_contacts_button">
        Make order
      </button>
    </div>
  </header>
</template>

<script>
export default {
  name: 'v-header',
  data () {
    return {
      phone: '+0123456789'
    }
  }
}
</script>

<style lang="scss">
.v-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: auto;
  padding: 30px 0;
  &_contacts {
    display: flex;
    &_phone{
      margin: 0 10px;
      p {
        margin: 0;
      }
    }
    &_button{
      background: transparent;
      border-radius: 50px;
    }
  }

  a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
