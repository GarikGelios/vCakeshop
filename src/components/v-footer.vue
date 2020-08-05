<template>
  <footer class="v-footer">
    <span class="v-footer_divider"></span>
    <div class="v-footer_wraper">
      <p>© HOMEMADE BAKING — IN CYPRUS 2020</p>
      <a href="https://www.facebook.com/SWEET-HOME--869790083410504/">
        <img src="@/assets/facebook.svg" alt="logo" width="30" height="30" />
      </a>
      <a href="https://instagram.com/stories/lusine2745/2368773757131886583?igshid=dtl9t1orkdpx">
        <img src="@/assets/instagram.svg" alt="logo" width="30" height="30" />
      </a>
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
  &_wraper {
    background-color: $color-bg;
    p {
      margin: 0;
      padding: $padding;
    }
    a {
      margin: $margin;
    }
  }
}
</style>
