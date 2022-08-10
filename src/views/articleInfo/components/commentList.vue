<template>
  <div>
    <van-list
      v-model="loading"
      offset="0"
      :finished="finished"
      finished-text="没有更多了"
      @load="loadNextPage"
    >
      <!-- 单个评论 -->
      <comment-item
        @addComFn="addComFn"
        v-for="(item, index) in commentsList"
        :key="index"
        :commentsItem="item"
      ></comment-item>
    </van-list>
  </div>
</template>

<script>
import CommentItem from './commentItem.vue'
import { commentsAPI } from '@/api'
export default {
  data() {
    return {
      list: [1, 2],
      loading: false,
      finished: false,
      commentsList: [],
      endId: '',
      lastId: ''
    }
  },
  components: {
    CommentItem
  },
  methods: {
    //评论弹窗
    addComFn(id) {
      this.$emit('addComFn', id)
    },
    //获取文章评论列表
    async loadNextPage() {
      try {
        if (this.lastId === '') {
          const res = await commentsAPI('a', this.id, null, 5)
          this.commentsList.push(...res.data.data.results)
          this.lastId = res.data.data.last_id
        }
        if (this.lastId === null) {
          return (this.finished = true)
        }
        const res = await commentsAPI('a', this.id, this.lastId, 5)
        this.lastId = res.data.data.last_id
        this.commentsList.push(...res.data.data.results)
        this.loading = false
      } catch (e) {
        this.$toast.fail('加载失败请刷新')
        console.dir(e)
      }
    }
  },
  props: {
    id: {
      type: String,
      required: true
    },
    myComment: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    myComment(newvalue) {
      console.log(1, newvalue)
      this.commentsList = [...this.commentsList, newvalue[0]]
      console.log(this.commentsList)
    }
  },
  mounted() {
    this.loadNextPage()
  }
}
</script>

<style scoped></style>
