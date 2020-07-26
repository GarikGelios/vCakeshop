<template>
  <div class="v-select">
    <div class="v-select_cream-type" v-if="isCreamType">
      <p
        class="v-select_cream-type_select"
        @click="isOptionVisibleType = !isOptionVisibleType"
      >
        Cream:
        {{ selectedCreamType }}
      </p>
      <div v-if="isOptionVisibleType">
        <p
          class="v-select_cream-type_select_option"
          v-for="option in creamType"
          :key="option"
          @click="selectOptionCreamType(option)"
        >
          {{ option }}
        </p>
      </div>
    </div>
    <div class="v-select_cream-flavor" v-if="isCreamFlavor">
      <p
        class="v-select_cream-flavor_select"
        @click="isOptionVisibleFlavor = !isOptionVisibleFlavor"
      >
        Flavor:
        {{ selectedCreamFlavor }}
      </p>
      <div v-if="isOptionVisibleFlavor">
        <p
          class="v-select_cream-flavor_select_option"
          v-for="option in creamFlavor"
          :key="option"
          @click="selectOptionCreamFlavor(option)"
        >
          {{ option }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'v-select',
  props: {
    creamType: {
      type: Array,
      default: () => []
    },
    creamFlavor: {
      type: Array,
      default: () => []
    },
    cream_type_selected: {
      type: String,
      default: ''
    },
    cream_flavor_selected: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isOptionVisibleType: false, // по умолчанию скрыт блок с опциями
      selectedCreamType: this.cream_type_selected, // по умолчанию текст выбранной опции
      isOptionVisibleFlavor: false,
      selectedCreamFlavor: this.cream_flavor_selected
    }
  },
  computed: {
    isCreamType () {
      // проверяем не пустой ли массив типа крема
      if (this.creamType[0] === '') {
        return false
      } else {
        return true
      }
    },
    isCreamFlavor () {
      // проверяем не пустой ли массив аромата крема
      if (this.creamFlavor[0] === '') {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    selectOptionCreamType (option) {
      // клик по селекту, чтобы выбрать тип крема
      this.$emit('selectCreamType', option) // передать родительскому блоку тип крема
      this.isOptionVisibleType = false // спарятать варианты селекта
      this.selectedCreamType = option // подставить в data() значение выбранной опции селекта
    },
    selectOptionCreamFlavor (option) {
      this.$emit('selectCreamFlavor', option) // передать родительскому блоку аромат крема
      this.isOptionVisibleFlavor = false
      this.selectedCreamFlavor = option
    }
  }
}
</script>

<style lang="scss">
.v-select {
  &_cream-type_select, &_cream-flavor_select {
    color: $color-primary;
  }
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.v-select_cream-type,
.v-select_cream-flavor {
  &_select {
    cursor: pointer;
    &_option {
      cursor: pointer;
      text-align: right;
      box-sizing: border-box;
      height: 18px;
      &:hover {
        border-bottom: 2px solid $color-primary;
      }
    }
  }
}
</style>
