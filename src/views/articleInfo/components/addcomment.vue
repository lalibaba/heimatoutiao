<template>
  <div>
    <!-- 顶部 -->
    <van-nav-bar
      :title="commentItem.reply_count + '条回复'"
      left-arrow
      @click-left="$parent.$parent.reply2Show = false"
      style="z-index: 9999"
    />
    <!-- 当前回复的评论 -->
    <CommentItem :commentsItem="commentItem"></CommentItem>
    <van-divider>全部回复</van-divider>
    <!-- 回复列表 -->
    <CommentList :id="commentItem.com_id"></CommentList>

    <!-- 底部 -->
    <van-tabbar>
      <van-tabbar-item @click="addComment">发布评论</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import CommentItem from './commentItem.vue'
import CommentList from './commentList.vue'
// import addCommentsAPI from '@/api'
export default {
  name: 'AddComment',
  data() {
    return {
      myComment: []
    }
  },
  components: {
    CommentItem,
    CommentList
  },
  methods: {
    //添加评论
    addComment() {}
  }, //方法
  props: {
    commentItem: {
      type: Object,
      default: () => ({})
    }
  }, //props传值
  computed: {}, //计算属性
  watch: {}, //监视属性
  create() {}, //创建阶段钩子
  mounted() {}, //挂载阶段钩子
  updated() {}, //更新阶段钩子
  destroyed() {} //销毁阶段钩子
}
</script>

<style lang="less" scoped>
/* 头部 */
:deep(.van-nav-bar__content) {
  background: #f1f3f6;

  .van-icon {
    color: #000;
  }
  .van-nav-bar__title {
    color: #000;
  }
  .van-nav-bar__text {
    color: #fff;
  }
}
.van-tabbar-item {
  font-size: 16px;
}
</style>
