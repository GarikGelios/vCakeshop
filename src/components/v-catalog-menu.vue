<template>
  <nav class="v-catalog-menu">
    <ul class="v-catalog-menu_list">
      <!-- default firts cheked for all categores -->
      <li>
        <input
          type="radio"
          id="v-catalog-menu_list_all"
          name="v-catalog-menu_list"
          value="all"
          checked
          v-model="li_checked"
        />
        <!-- listen click on option for send it to parent -->
        <label for="v-catalog-menu_list_all" @click="selectOption('all')"
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
        />
        <label
          :for="'v-catalog-menu_list_all' + index"
          @click="selectOption(category)"
          >{{ category }}</label
        >
      </li>
    </ul>
    <p style="position: absolute; top: 5px; left: 5px;">
      category: {{ li_checked }}
    </p>
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
      padding: $padding;
      cursor: pointer;
    }
  }
}
</style>
