<template>
  <div class="v-notification">
    <transition-group name="v-transition-animate" class="messages_list">
      <div
        class="v-notification_content"
        v-for="message in messages"
        :key="message.id"
      >
        <div>
          <p class="v-notification_content_text">{{ message.name }}</p>
          <i>✔</i>
        </div>
        <div class="v-notification_content_buttons">
          <button v-if="leftButton">{{ leftButton }}</button>
          <button v-if="rightButton">{{ rightButton }}</button>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: 'v-notification',
  props: {
    messages: {
      type: Array,
      default: () => {
        return []
      }
    },
    leftButton: {
      type: String,
      default: ''
    },
    rightButton: {
      type: String,
      default: ''
    }
  },
  data () {
    return {}
  },
  computed: {},
  methods: {
    hideNotification () {
      const vm = this
      if (this.messages.length) {
        setTimeout(function () {
          vm.messages.splice(vm.messages.length - 1, 1)
        }, 3000)
      }
    }
  },
  watch: {
    messages () {
      this.hideNotification()
    }
  },
  mounted () {
    this.hideNotification()
  }
}
</script>

<style lang="scss">
.v-notification {
  position: fixed;
  top: 100px;
  right: 16px;
  z-index: 10;
  &_content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: $padding * 2;
    height: 20px;
    margin-bottom: $margin * 2;
    border-radius: 20px;
    background-color: $color-light;
    color: $color-primary;
    border: 2px solid $color-primary;
    div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      i {
        margin: $margin;
      }
    }
  }
}
.v-transition-animate {
  &-enter {
    transform: translateX(120px);
    opacity: 0;
  }
  &-enter-active {
    transition: all 0.6s ease;
  }
  &-enter-to {
    opacity: 1;
  }
  &-leave {
    height: 50px;
    opacity: 1;
  }
  &-leave-active {
    transition: all 0.6s ease, opacity 0.6s, height;
  }
  &-leave-to {
    height: 0;
    transform: translateX(120px);
    opacity: 0;
  }
  &-move {
    transition: transform 0.6s ease;
  }
}
</style>
