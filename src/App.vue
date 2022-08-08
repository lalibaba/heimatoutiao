<template>
  <div>
    <transition :name="SkipSwitchName">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      SkipSwitchName: ''
    }
  },
  methods: {},
  mounted() {},
  watch: {
    //使用watch 监听$router的变化
    $route(to, from) {
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
      // console.log(to, 'to')
      // console.log(from, 'from')
      if (to.meta.index < from.meta.index) {
        //设置动画名称
        this.SkipSwitchName = 'Skright'
      } else {
        this.SkipSwitchName = 'Skleft'
      }
    }
  }
}
</script>

<style>
button {
  width: 300px;
  height: 80px;
  font-size: 60px;
}
.Skright-enter-active,
.Skright-leave-active,
.Skleft-enter-active,
.Sklef-leave-active {
  transition: all 200ms;
}
.Skright-enter {
  opacity: 1;
  transform: translate3d(-100%, 0, 0);
}
.Skright-leave-to {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.Skleft-enter {
  opacity: 1;
  transform: translate3d(100%, 0, 0);
}
.Skleft-leave-to {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
