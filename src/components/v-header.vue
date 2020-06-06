<template>
  <header class="v-header">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </header>
</template>

<script>
export default {
  name: 'v-header',
  data () {
    return {}
  }
}
</script>

<style lang="scss">
.v-header {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
