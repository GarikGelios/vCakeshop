<template>
  <nav class="v-catalog-menu" id="v-catalog-menu">
    <ul class="v-catalog-menu_list">
      <!-- default firts cheked for all categores -->
      <li :class="{ w100: GET_WINDOW_TYPE=='Extra small' }">
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
      <li v-for="(category, index) in this.categories" :key="category" :class="{ w100: GET_WINDOW_TYPE=='Extra small' }">
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
import { mapGetters } from 'vuex'

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
  computed: {
    ...mapGetters(['GET_WINDOW_TYPE']) // обратился к геттеру c размером экрана
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
    flex-wrap: wrap;
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
