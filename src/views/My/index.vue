<template>
  <div>
    <!-- 头部 -->
    <header>
      <div v-if="isLogin" class="login">登录盒子</div>
      <div v-else class="logout">未登录盒子</div>
    </header>
    <!-- 主体 -->
    <main>收藏/历史</main>
    <!-- 底部 -->
    <footer>
      <button v-if="isLogin" @click="logout">退出</button>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
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

<style scoped></style>
