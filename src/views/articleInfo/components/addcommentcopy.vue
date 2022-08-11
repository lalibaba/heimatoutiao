<template>
  <div>
    <!-- 顶部 -->
    <van-nav-bar
      :title="reply_count + '条回复'"
      left-arrow
      @click-left="$parent.$parent.replyShow2 = false"
      style="z-index: 9999"
    />
    <!-- 当前回复的评论 -->
    <CommentItem :commentsItem="commentItem"></CommentItem>
    <van-divider>全部回复</van-divider>
    <!-- 回复列表 -->
    <CommentList
      :type="'c'"
      :id="commentItem.com_id"
      :myComment="myComment"
      @addComFn="addComFn"
    ></CommentList>

    <!-- 底部 -->
    <van-tabbar>
      <van-tabbar-item @click="replyShow = true">发布评论</van-tabbar-item>
    </van-tabbar>
    <!-- /回复弹出层 -->
    <van-popup
      position="bottom"
      v-model="replyShow"
      :style="{ height: '20%' }"
      style="display: flex; justify-content: center; align-items: center"
    >
      <div class="myComment">
        <van-field
          autosize
          style="flex: 13"
          v-model="message"
          rows="2"
          type="textarea"
          maxlength="50"
          placeholder="请输入留言"
          show-word-limit
        >
        </van-field>
        <van-button
          @click="addComment"
          size="small"
          style="flex: 4; color: blue; font-size: 14px"
          >发布</van-button
        >
      </div>
    </van-popup>
  </div>
</template>

<script>
import CommentItem from './commentItem.vue'
import CommentList from './commentList.vue'
import { addCommentsAPI } from '@/api'
export default {
  name: 'AddComment',
  data() {
    return {
      myComment: [],
      replyShow: false,
      message: '',
      reply_count: this.commentItem.reply_count //页面评论数
    }
  },
  components: {
    CommentItem,
    CommentList
  },
  methods: {
    //添加评论
    async addComment() {
      // console.log(this.commentItem)
      this.reply_count++ //页面评论数增加
      this.replyShow = false
      try {
        const res = await addCommentsAPI(
          this.commentItem.com_id,
          this.message.trim(),
          this.$route.params.id
        )
        this.myComment.unshift(res.data.data.new_obj)
      } catch (e) {
        console.dir(e)
        this.$toast.fail('发送失败请重新输入')
      }
    }
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
