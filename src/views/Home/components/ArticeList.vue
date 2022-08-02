<template>
  <div>
    <van-pull-refresh
      v-model="refreshLoading"
      @refresh="loadNextPageArticle"
      success-text="刷新成功"
    >
      <van-list
        v-model="loading"
        @load="loadNextPageArticle"
        offset="0"
        :immediate-check="false"
        :finished="isFinshed"
        finished-text="没有更多文章~"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <article-item
          v-for="item in articleList"
          :key="item.art_id"
          :articleIfon="item"
        ></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleAPI } from '@/api'
import ArticleItem from '@/components/ArticleItem.vue'
export default {
  name: 'ArticleList',
  data() {
    return {
      articleList: [],
      loading: false,
      refreshLoading: false,
      timestamp: '',
      isFinshed: false,
      error: false
    }
  },
  components: {
    ArticleItem
  },
  props: {
    id: {
      type: [Number, String],
      required: true
    }
  },
  created() {
    this.getFirstPageArticle()
  },
  methods: {
    //加载第一页数据
    async getFirstPageArticle() {
      try {
        const res = await getArticleAPI(this.id, +new Date())
        // console.log(res.data.data.pre_timestamp)
        this.articleList = res.data.data.results
        this.timestamp = res.data.data.pre_timestamp
      } catch (e) {
        console.log(e)
        this.$toast.fail('获取失败请刷新')
      }
    },
    //加载下一页数据
    async loadNextPageArticle() {
      try {
        // //自定义一个50%的失败
        // if (Math.random() < 0.5) {
        //   console.log(a)
        // }
        const res = await getArticleAPI(this.id, this.timestamp)
        //更改新时间戳
        this.timestamp = res.data.data.pre_timestamp
        //判读是否为最后一页
        if (this.timestamp === null) {
          this.isFinshed = true
        }
        if (this.refreshLoading) {
          // 下拉传入新页的内容
          this.articleList.unshift(...res.data.data.results)
        } else {
          // 下滑传入新页的内容
          this.articleList.push(...res.data.data.results)
        }

        //解除加载状态
      } catch (e) {
        this.error = true
        console.log(e)
      } finally {
        this.refreshLoading = false
        this.loading = false
      }
    }
  }
}
</script>

<style scoped></style>
