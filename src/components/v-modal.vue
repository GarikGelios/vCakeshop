<template>
  <div class="modal_wrapper" ref="modal_wrapper">
    <form method="POST" action="/" class="v-modal">
      <div class="v-modal__header">
        <h3>{{ modalTitle }} — {{ productPrice }} €</h3>
        <input type="hidden" name="typesOfCakeInCart" value="1">
        <input type="hidden" name="title_0" v-model="modalTitle" />
        <span class="v-modal__header_close" @click="closeModalButton">X</span>
      </div>
      <div class="v-modal__content">
        <slot></slot>
      </div>
      <div class="v-modal__footer">
        <input type="hidden" name="name" value="customer" />
        <input
          type="text"
          placeholder="Enter your phone number"
          name="phone"
          required
        />
        <input
          type="hidden" name="comment" value="Quick order form" />
        <button type="submit" class="btn">{{ rightBtntitle }}</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'v-modal',
  props: {
    rightBtntitle: {
      type: String,
      default: 'OK'
    },
    modalTitle: {
      type: String,
      default: 'Popup name'
    },
    productPrice: {
      type: String,
      default: '0'
    }
  },
  methods: {
    closeModalButton () {
      this.$emit('closeModalButton')
    }
  },
  mounted () {
    const vm = this
    document.addEventListener('click', function (item) {
      if (item.target === vm.$refs.modal_wrapper) {
        vm.closeModalButton()
      }
    })
  }
}
</script>

<style lang="scss">
.modal_wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba($color: #646464, $alpha: 0.4);
}
.v-modal {
  padding: $padding * 2;
  position: fixed;
  top: 50px;
  width: 400px;
  background: white;
  border-radius: $radius*2;
  z-index: 10;
  &__header,
  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &_close{
      cursor: pointer;
    }
  }
  &__content {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  input {
    @include input;
  }
}
</style>
