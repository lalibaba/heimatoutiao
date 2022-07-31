<template>
  <div>
    <router-view></router-view>
    <!-- route:路模式-->
    <!-- 拿到path 和每一个 tabbaritem的to属性对比 -->
    <van-tabbar route>
      <van-tabbar-item
        v-for="(item, index) in tabbarList"
        :key="index"
        :to="item.to"
      >
        <template #icon>
          <span :class="'toutiao' + item.icon"> </span>
          <span>{{ item.text }} </span>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      tabbarList: [
        {
          to: '/ ',
          icon: ' toutiao-shouye1',
          text: '首页'
        },
        {
          to: '/video',
          icon: ' toutiao-shipin1',
          text: '视频'
        },
        {
          to: '/qa',
          icon: ' toutiao-wenda1',
          text: '首页'
        },
        {
          to: '/my',
          icon: ' toutiao-wode1',
          text: '我的'
        }
      ]
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
:deep(.van-tabbar-item__icon) {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
  font-size: 30px;
  .toutiao {
    font-size: 40px;
  }
}
</style>
