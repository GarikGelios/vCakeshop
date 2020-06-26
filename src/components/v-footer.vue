<template>
  <footer class="v-footer">
    <span class="v-footer_divider"></span>
    <div class="v-footer_wraper">
      <p>© HOMEMADE BAKING — IN CYPRUS 2020</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'v-footer'
}
</script>

<style lang="scss">
.v-footer {
  &_divider {
    background-image: url('../assets/stroke.svg');
    background-position: bottom;
    background-repeat: repeat-x;
    height: 100px;
    display: flex;
  }
  &_wraper{
    background-color: $color-bg;
    p {
      margin: 0;
      padding: $padding;
    }
  }
}
</style>
