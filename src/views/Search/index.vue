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
        @cancel="$router.back()"
        @focus="onSearchFocus"
      />
      <component
        :is="componentName"
        :keywords="keywords"
        @searchThis="searchThis"
      ></component>
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
    // 搜索按键
    onSearch() {
      this.isHShowSearchResults = true
      //获取搜索历史
      const kwHistory = this.$store.state.KWHistory
      //判断是否有重，有则删除再unshift
      const repeatIndex = kwHistory.findIndex((item) => item === this.keywords)
      if (repeatIndex !== -1) kwHistory.splice(repeatIndex, 1)
      this.keywords && kwHistory.unshift(this.keywords)
      this.$store.commit('KWHistory', kwHistory)
    },
    onSearchFocus() {
      this.isHShowSearchResults = false
    },
    // 搜索点击的历史记录
    searchThis(val) {
      this.keywords = val
      this.isHShowSearchResults = true
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
