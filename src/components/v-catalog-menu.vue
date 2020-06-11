<template>
  <nav class="v-catalog-menu">
    <ul class="v-catalog-menu_list">
      <li>
        <input
          type="radio"
          id="v-catalog-menu_list_all"
          name="v-catalog-menu_list"
          value="all"
          checked
          v-model="li_checked"
        />
        <label for="v-catalog-menu_list_all">All</label>
      </li>
      <li v-for="(category, index) in this.categories" :key="category">
        <input
          type="radio"
          :id="'v-catalog-menu_list_all' + index"
          name="v-catalog-menu_list"
          :value="index"
          v-model="li_checked"
        />
        <label :for="'v-catalog-menu_list_all' + index">{{ category }}</label>
      </li>
    </ul>
    <p style="position: absolute; top: 0; left: 5px;">category: {{ li_checked }}</p>
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
