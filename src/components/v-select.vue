<template>
  <div class="v-select">
    <div class="v-select_cream-type" v-if="isCreamType">
      <p @click="isOptionVisibleType = !isOptionVisibleType">
        Cream:
        {{ selectedCreamType }}
      </p>
      <div v-if="isOptionVisibleType">
        <p
          v-for="option in creamType"
          :key="option"
          @click="selectOptionCreamType(option)"
        >
          {{ option }}
        </p>
      </div>
    </div>
    <div class="v-select_cream-flavor" v-if="isCreamFlavor">
      <p @click="isOptionVisibleFlavor = !isOptionVisibleFlavor">
        Flavor:
        {{ selectedCreamFlavor }}
      </p>
      <div v-if="isOptionVisibleFlavor">
        <p
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
    }
  },
  data () {
    return {
      isOptionVisibleType: false, // по умолчанию скрыт блок с опциями
      selectedCreamType: 'select', // по умолчанию текст выбранной опции
      isOptionVisibleFlavor: false,
      selectedCreamFlavor: 'select'
    }
  },
  computed: {
    isCreamType () { // проверяем не пустой ли массив типа крема
      if (this.creamType[0] === '') {
        return false
      } else {
        return true
      }
    },
    isCreamFlavor () { // проверяем не пустой ли массив аромата крема
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

<style></style>
