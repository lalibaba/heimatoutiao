<template>
  <div>
    <van-cell v-for="(item, index) in suggestions" :key="index" icon="search">
      <template #title>
        <!-- 实现搜索字段高亮功能 -->
        <!-- <span v-html="item"></span> -->
        <!-- //高亮搜索方法一 -->
        <span
          v-html="
            item.replace(new RegExp(keywords, 'gi'), (match) => {
              return `<span style='color:red'>${match}</span>`
            })
          "
        ></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
// 1，动态正则
// 字面量/aasdasd/ig
// new RegExp（变量，'ig'）
// 2.字符串的replace第一个参数可以是正则
// 第二个参数可以是函数，函数的返回值是要替换的字符串match：正则匹配上的字符
// 'Auglar'.replace（/a/ig，function（match）{ return'<span>$（match）</span>'}
//
import { getSearchSuggestionsAPI } from '@/api'
import { debounce } from 'lodash'
export default {
  data() {
    return {
      suggestions: []
    }
  },
  computed: {
    //高亮搜索方法二
    // heightlightSuggestions() {
    //   const reg = new RegExp(this.keywords, 'ig')
    //   return this.suggestions.map((item) =>
    //     item.replace(
    //       reg,
    //       (match) => `<span style="color: red;">${match}</span>`
    //     )
    //   )
    // }
  },
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  watch: {
    keywords: {
      //页面渲染立即执行
      immediate: true,
      handler() {
        this.getSearchSuggestions()
      }
    }
  },
  methods: {
    //请求防抖处理
    //方法一：
    //1.设置定时器，延时执行
    //2.清除上一个定时器（要把定时器id挂在this组件实例上）
    // 方法二：使用lodash方法（遵循单一原则 防抖+处理搜索建议）
    //debounce(需要防抖的函数，延时时间)
    getSearchSuggestions: debounce(async function () {
      try {
        const { data } = await getSearchSuggestionsAPI(this.keywords)
        this.suggestions = data.data.options.filter(Boolean)
      } catch (e) {
        this.$toast.fail('获取搜索建议失败')
        console.dir(e)
      }
    }, 300)
  }
}
</script>

<style scoped></style>
