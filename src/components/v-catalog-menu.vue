<template>
  <nav class="v-catalog-menu" id="v-catalog-menu">
    <ul class="v-catalog-menu_list">
      <!-- default firts cheked for all categores -->
      <li>
        <input
          type="radio"
          id="v-catalog-menu_list_all"
          name="v-catalog-menu_list"
          value="all"
          v-model="li_checked"
          class="d-none"
        />
        <!-- listen click on option for send it to parent -->
        <label for="v-catalog-menu_list_all" class="btn btn-white" :class="{ checked: li_checked=='all' }" @click="selectOption('all')"
          >All</label
        >
      </li>
      <!-- categores from array -->
      <li v-for="(category, index) in this.categories" :key="category">
        <input
          type="radio"
          :id="'v-catalog-menu_list_all' + index"
          name="v-catalog-menu_list"
          :value="category"
          v-model="li_checked"
          class="d-none"
        />
        <label
          :for="'v-catalog-menu_list_all' + index"
          class="btn btn-white"
          :class="{ checked: li_checked==category }"
          @click="selectOption(category)"
          >{{ category }}</label
        >
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'v-catalog-menu',
  props: {
    categories: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      li_checked: 'all'
    }
  },
  methods: {
    selectOption (valueCategory) {
      this.$emit('select', valueCategory)
    }
  }
}
</script>

<style lang="scss">
.v-catalog-menu {
  &_list {
    display: flex;
    list-style: none;
    padding: $padding;
    justify-content: center;
    li {
      margin: $margin;
      label {
        cursor: pointer;
      }
      .checked {
        font-weight: bold;
      }
    }
  }
}
</style>
