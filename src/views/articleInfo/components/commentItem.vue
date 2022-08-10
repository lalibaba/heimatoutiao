<template>
  <div>
    <van-cell :title="Item.aut_name">
      <template #icon>
        <van-image round width="34px" height="34px" :src="Item.aut_photo"
      /></template>
      <template #label>
        <p style="color: #000">{{ Item.content }}</p>
        <p
          style="
            display: flex;
            line-height: 0.5rem;
            justify-content: space-between;
          "
        >
          <span>{{ time }}</span>
          <van-button @click="addComFn" round style="width: 2rem" size="mini"
            >回复{{ Item.reply_count }}</van-button
          >
        </p>
      </template>
      <span>
        <van-icon
          @click="commentLike"
          :color="Item.is_liking ? 'red' : '#ccc'"
          name="good-job"
        />赞{{ Item.like_count }}</span
      >
    </van-cell>
  </div>
</template>

<script>
import timeFomat from '@/util/timeFomat'
import { commentLikeAPI, canCommentLikeAPI } from '@/api'
export default {
  data() {
    return {
      Item: this.commentsItem
    }
  },
  computed: {
    time() {
      return timeFomat(this.Item.pubdate)
    }
  },
  props: {
    commentsItem: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    //评论弹窗
    addComFn() {
      this.$emit('addComFn', this.Item)
    },
    //点赞评论
    async commentLike() {
      if (this.Item.is_liking === false) {
        this.Item.like_count++
        this.Item.is_liking = !this.Item.is_liking
        await commentLikeAPI(this.Item.com_id) //点赞评论
      } else {
        this.Item.like_count--
        this.Item.is_liking = !this.Item.is_liking
        await canCommentLikeAPI(this.Item.com_id) //取消点赞评论
      }
    }
  } //方法
}
</script>

<style lang="less" scoped>
:deep(.van-cell) {
  height: 3.2533rem;
}
</style>
