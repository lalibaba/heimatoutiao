<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了~"
      offset="0"
      @load="LoadNextpage"
    >
      <van-cell
        v-for="item in itemList"
        :key="item.art_id"
        :title="item.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResultAPI } from '@/api'
export default {
  data() {
    return {
      loading: false,
      finished: false,
      itemList: [],
      page: 3
    }
  },
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  methods: {
    //获取第1,2页搜索结果
    async getFirstResult() {
      try {
        const res1 = await getSearchResultAPI(this.keywords, 1)
        const res2 = await getSearchResultAPI(this.keywords, 2)
        this.itemList = [...res1.data.data.results, ...res2.data.data.results]
        //如果请求结果为空，则停止刷新
        if (this.itemList.length === 0) this.finished = true
      } catch (e) {
        console.dir(e)
      }
    },
    //加载下一页
    async LoadNextpage() {
      try {
        const res = await getSearchResultAPI(this.keywords, this.page)
        //如果请求最后的一页为空，则停止刷新
        if (res.data.data.results.length === 0) {
          return (this.finished = true)
        }
        this.itemList.push(...res.data.data.results)
        this.page++
        this.loading = false
      } catch (e) {
        console.dir(e)
      }
    }
  },
  created() {
    this.getFirstResult()
  }
}
</script>

<style scoped></style>
