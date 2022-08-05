<template>
  <div class="my">
    <!-- 头部 -->
    <header class="head">
      <div v-if="isLogin" class="login">
        <div class="login1">
          <van-image
            round
            width="56px"
            height="56px"
            src="http://toutiao.itheima.net/images/user_head.jpg"
          />
          <p style="font-size: 0.5rem; color: #fff">1827016431</p>
          <van-button round type="info" size="mini">编辑资料</van-button>
        </div>
        <van-grid>
          <van-grid-item
            ><template #text>
              <p>文字</p>
              <p>文字</p>
            </template>
          </van-grid-item>
          <van-grid-item
            ><template #text>
              <p>文字</p>
              <p>文字</p>
            </template>
          </van-grid-item>
          <van-grid-item
            ><template #text>
              <p>文字</p>
              <p>文字</p>
            </template>
          </van-grid-item>
          <van-grid-item
            ><template #text>
              <p>文字</p>
              <p>文字</p>
            </template>
          </van-grid-item>
        </van-grid>
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
      <van-button v-if="isLogin" @click="logout">退出</van-button>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'My',
  data() {
    return {}
  },
  computed: {
    isLogin() {
      return !!this.$store.state.tokenObj.token
    }
  },
  methods: {
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
