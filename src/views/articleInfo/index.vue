<template>
  <div>
    <van-nav-bar title="黑马头条" left-arrow @click-left="$router.back()" />
  </div>
</template>

<script>
import { getarticlesInfoAPI } from '@/api'
export default {
  name: 'articleInfo',
  data() {
    return {}
  },
  methods: {
    async getarticlesInfo() {
      const res = await getarticlesInfoAPI(this.$route.params.id)
      console.log(res.data.data)
    }
  },
  created() {
    this.getarticlesInfo()
  }
}
</script>

<style lang="less" scoped>
:deep(.van-nav-bar__content) {
  background: #9bbcde;
  .van-icon {
    color: #fff;
  }
  .van-nav-bar__title {
    color: #fff;
  }
  .van-nav-bar__text {
    color: #fff;
  }
}
</style>
