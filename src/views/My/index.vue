<template>
  <div class="my">
    <!-- 头部 -->
    <header class="head">
      <div v-if="isLogin" class="login" style="width: 100%">
        <div class="login1">
          <van-image round width="56px" height="56px" :src="userInfo.photo" />
          <p style="font-size: 0.5rem; color: #fff; padding-right: 80px">
            {{ userInfo.name }}
          </p>
          <van-button
            round
            type="info"
            size="mini"
            @click="$router.push('/profile')"
            >编辑资料</van-button
          >
        </div>
        <div class="fans">
          <ul
            style="
              display: flex;
              justify-content: space-evenly;
              height: 50px;
              font-size: 16px;
              color: #fff;
              margin-top: 60px;
              text-align: center;
            "
          >
            <li>
              <p>头条</p>
              <p>0</p>
            </li>
            <li>
              <p>粉丝</p>
              <p>0</p>
            </li>
            <li>
              <p>关注</p>
              <p>0</p>
            </li>
            <li>
              <p>获赞</p>
              <p>0</p>
            </li>
          </ul>
        </div>
      </div>

      <div v-else class="logout" @click="$router.push('/login')">
        <img src="../../assets/images/mobile.png" alt="" />
        <span>登录 / 注册</span>
      </div>
    </header>
    <!-- 主体 -->
    <main>
      <div class="item">
        <p class="toutiao toutiao-shoucang1"></p>
        <p>收藏</p>
      </div>
      <div class="item">
        <p class="toutiao toutiao-lishi1"></p>
        <p>历史</p>
      </div>
    </main>
    <van-nav-bar left-text="消息通知">
      <template #right><van-icon name="arrow" /></template>
    </van-nav-bar>
    <van-nav-bar left-text="小智同学">
      <template #right><van-icon name="arrow" /></template>
    </van-nav-bar>
    <!-- 底部 -->
    <footer>
      <van-button v-if="isLogin" @click="logout" block style="color: red"
        >退出</van-button
      >
    </footer>
  </div>
</template>

<script>
import { getUserInfoAPI } from '@/api'
export default {
  name: 'My',
  data() {
    return {
      userInfo: {}
    }
  },
  computed: {
    isLogin() {
      return !!this.$store.state.tokenObj.token
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    //获取用户信息
    async getUserInfo() {
      const res = await getUserInfoAPI()
      this.userInfo = res.data.data
      // console.log(res.data.data)
    },
    logout() {
      this.$store.commit('TOKEN', {})
    }
  }
}
</script>

<style lang="less" scoped>
.my {
  background: #f5f7f9;
  height: calc(100vh - 1.33333rem);
}
.head {
  height: 400px;
  // 背景图
  background: url(../../assets/images/banner.png) no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;

  .logout {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 30px;
    color: #fff;
    img {
      width: 132px;
      height: 132px;
    }
    span {
      padding-top: 15px;
    }
  }
  .login1 {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    :deep(.van-button--mini) {
      width: 2.64rem;
    }
    :deep(.van-grid-item__content) {
      font-size: 2px;
      color: #fff;
      width: 86px;
      height: 48px;
    }
  }
  li {
    p {
      margin: 0;
    }
  }
}

main {
  display: flex;
  justify-content: space-around;
  height: 156px;
  .item {
    width: 374px;
    text-align: center;
    margin: 0 3px 10px 3px;

    font-size: 24px;
    background-color: #fff;
    .toutiao {
      margin: 30px 0 5px 0;
      font-size: 46px;
    }
    .toutiao-shoucang1 {
      color: #ed5253;
    }
    .toutiao-lishi1 {
      color: #ffb31d;
    }
  }
}
:deep(.van-nav-bar__title) {
  color: red;
}
:deep(.van-nav-bar__text) {
  color: black;
}
:deep(.van-nav-bar) {
  color: black;
}
</style>
