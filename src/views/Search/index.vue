<template>
  <div>
    <form action="/">
      <van-search
        v-model.trim="keywords"
        show-action
        background="#3296fa"
        placeholder="请输入搜索关键词"
        class="search"
        @search="onSearch"
        @focus="onSearchFocus"
      />
      <component :is="componentName" :keywords="keywords"></component>
    </form>
  </div>
</template>

<script>
import searchHistory from './components/searchHistory.vue'
import searchResult from './components/searchResult.vue'
import searchSuggestion from './components/searchSuggestion.vue'
export default {
  name: 'Search',
  data() {
    return {
      keywords: '',
      isHShowSearchResults: false
    }
  },
  methods: {
    onSearch() {
      console.log('正在搜索')
      this.isHShowSearchResults = true
    },
    onSearchFocus() {
      this.isHShowSearchResults = false
    }
  },
  components: {
    searchHistory,
    searchResult,
    searchSuggestion
  },
  computed: {
    componentName() {
      if (this.keywords === '') {
        return 'searchHistory'
      }
      if (this.isHShowSearchResults) {
        // this.isHShowSearchResults = false
        return 'searchResult'
      }
      return 'searchSuggestion'
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  [role='button'] {
    color: #fff;
  }
}
</style>
