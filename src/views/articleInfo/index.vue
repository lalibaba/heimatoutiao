<template>
  <div>
    <van-nav-bar title="黑马头条" left-arrow @click-left="$router.back()" />
    <div class="main-wrap">
      <!-- 主体 -->
      <div class="article-title">
        <p
          style="
            margin: 0;
            font-size: 20px;
            padding-left: 20px;
            font-weight: bold;
            line-height: 1.5;
          "
        >
          {{ articleInfo.title }}
        </p>
      </div>
      <div
        class="userInfo"
        style="
          height: 42px;
          display: flex;
          align-items: center;
          padding-left: 15px;
          border-top: 1px solid #ccc;
        "
      >
        <van-image
          round
          width="34px"
          height="34px"
          :src="articleInfo.aut_photo"
        />
        <div class="text" style="padding-left: 10px; flex: 3; font-size: 12px">
          <p style="color: #000; margin: 2px">{{ articleInfo.aut_name }}</p>
          <p style="color: #ccc; margin: 2px">
            {{ articleInfo.pubdate }}&nbsp;&nbsp; 阅读:{{
              articleInfo.read_count
            }}
          </p>
        </div>
        <van-button
          @click="followingsFn"
          round
          size="small"
          style="flex: 1"
          :color="articleInfo.is_followed ? '#ccc' : '#3296fa'"
          >{{ articleInfo.is_followed ? '已关注' : '+ 关注' }}</van-button
        >
      </div>
      <!-- 文章内容 -->
      <div
        class="article-content markdown-body"
        v-html="articleInfo.content"
      ></div>
      <van-divider>正文结束</van-divider>
      <!-- 评论内容 -->
      <CommentList
        @addComFn="addComFn"
        :myComment="myComment"
        :id="articleInfo.art_id || ''"
        :type="'a'"
      ></CommentList>
    </div>

    <van-tabbar>
      <van-tabbar-item
        ><van-button
          @click="replyShow = true"
          round
          size="mini"
          style="font-size: 18px; color: #57606a"
          >写评论</van-button
        ></van-tabbar-item
      >
      <van-tabbar-item
        :badge="articleInfo.comm_count"
        icon="comment"
      ></van-tabbar-item>
      <!-- 收藏 -->
      <van-tabbar-item
        @click="collectFn"
        icon="star"
        :style="articleInfo.is_collected ? 'color: #e22829' : ''"
      ></van-tabbar-item>
      <!-- 点赞 -->
      <van-tabbar-item
        :badge="articleInfo.like_count"
        icon="good-job "
        :style="articleInfo.attitude === 1 ? 'color: #e22829' : '#ccc'"
        @click="likingsFn()"
      ></van-tabbar-item>
      <!-- 不喜欢 -->
      <van-tabbar-item
        icon="good-job "
        class="dislike"
        :style="articleInfo.attitude === 0 ? 'color: #e22829' : '#ccc'"
        @click="dislikesFn()"
      ></van-tabbar-item>

      <van-tabbar-item icon="share"></van-tabbar-item>
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
    <!-- 评论的弹窗 -->
    <van-popup
      position="bottom"
      v-model="reply2Show"
      closeable
      :style="{ height: '100%', width: '100%' }"
      style="background: #fff"
      ><AddComment :commentItem="thisComment"></AddComment
    ></van-popup>
    <!-- 评论的弹窗 -->
  </div>
</template>

<script>
import { ImagePreview } from 'vant'
import {
  getarticlesInfoAPI,
  likingsAPI,
  canLikingsAPI,
  collectionsAPI,
  canCollectionsAPI,
  followingsAPI,
  canFollowingsAPI,
  dislikesAPI,
  canDislikesAPI,
  addCommentsAPI
} from '@/api'
import CommentList from './components/commentList.vue'
import AddComment from './components/addcomment.vue'

export default {
  name: 'articleInfo',
  data() {
    return {
      replyShow: false,
      reply2Show: false,
      message: '',
      articleInfo: {},
      myComment: [],
      thisComment: {}
    }
  },
  components: {
    AddComment,
    CommentList
  },
  methods: {
    //评论弹窗
    addComFn(id) {
      this.thisComment = id
      this.reply2Show = true
    },
    //添加评论
    async addComment() {
      this.replyShow = false
      try {
        const res = await addCommentsAPI(
          this.$route.params.id,
          this.message.trim()
        )
        this.myComment.unshift(res.data.data.new_obj)
      } catch (e) {
        console.dir(e)
        this.$toast.fail('发送失败请重新输入')
      }
    },
    //获取本文信息
    async getarticlesInfo() {
      try {
        const res = await getarticlesInfoAPI(this.$route.params.id)
        // const res = await getarticlesInfoAPI(8086)
        // console.log(res.data.data)
        this.articleInfo = res.data.data
        // 给所有要预览的图片添加类名
        this.articleInfo.content = this.articleInfo.content.replaceAll(
          '<img',
          '<img class="imagepreview"'
        )
        // 数据加载完成
        setTimeout(() => {
          this.previewImg()
        }, 10)
      } catch (e) {
        console.dir(e)
      }
    },
    //获取所有img节点
    previewImg() {
      //获取所有img元素
      const allImg = document.querySelectorAll('.imagepreview')
      const images = []
      // console.log(allImg)
      allImg.forEach((element, index) => {
        // 获取img路径
        images.push(element.src)
        // 绑定点击事件并运行图片预览函数
        element.onclick = () => {
          ImagePreview({
            images,
            startPosition: index,
            closeable: true
          })
        }
      })
    },
    //点赞
    async likingsFn() {
      // 判断是否为没点赞
      if (this.articleInfo.attitude !== 1) {
        await likingsAPI(this.$route.params.id) //点赞
        this.articleInfo.attitude = 1
        this.articleInfo.like_count++
      } else {
        await canLikingsAPI(this.$route.params.id) //取消点赞
        this.articleInfo.attitude = -1
        this.articleInfo.like_count--
      }
    },
    //点不喜欢
    async dislikesFn() {
      // 判断是否为不是不喜欢
      if (this.articleInfo.attitude !== 0) {
        await dislikesAPI(this.$route.params.id) //点不喜欢
        this.articleInfo.attitude = 0
      } else {
        await canDislikesAPI(this.$route.params.id) //取消点不喜欢
        this.articleInfo.attitude = -1
      }
      this.getarticlesInfo()
    },
    //收藏文章
    async collectFn() {
      if (!this.articleInfo.is_collected) {
        await collectionsAPI(this.$route.params.id) //收藏
      } else {
        await canCollectionsAPI(this.$route.params.id) //取消收藏
      }
      this.articleInfo.is_collected = !this.articleInfo.is_collected
    },
    //关注用户
    async followingsFn() {
      if (!this.articleInfo.is_followed) {
        await followingsAPI(this.articleInfo.aut_id) //关注
      } else {
        await canFollowingsAPI(this.articleInfo.aut_id) //取消关注
      }
      this.articleInfo.is_followed = !this.articleInfo.is_followed
    }
  },
  created() {
    this.getarticlesInfo()
  }
}
</script>

<style lang="less" scoped>
// 评论
.myComment {
  display: flex;
  align-items: center;
}
:deep(.van-field__control) {
  background: #f5f7f9;
}
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
// 主体
:deep(.main-wrap) {
  position: fixed;
  left: 0;
  right: 0;
  top: 1.22667rem;
  bottom: 1.17333rem;
  overflow-y: scroll;
  padding: 10px;
  background-color: #fff;
}
// 文章主体
.article-content {
  padding: 55px 32px;
  p {
    text-align: justify;
  }
}
:deep(.markdown-body) {
  color: #000;
  background-color: #fff;
  pre {
    background-color: #ded4f7;
  }
}
.dislike {
  transform: rotateZ(180deg);
}
</style>
