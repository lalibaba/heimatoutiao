<template>
  <div>
    <van-cell title="搜索历史">
      <i
        class="van-icon van-icon-delete-o"
        @click="isShowDel = true"
        v-show="!isShowDel"
      ></i>
      <div v-show="isShowDel">
        <span @click="delAllKW">全部删除&nbsp; </span
        ><span @click="isShowDel = false">完成</span>
      </div>
    </van-cell>
    <van-cell
      v-for="(item, index) in $store.state.KWHistory"
      :key="index"
      :title="item"
      @click="searchThis(item)"
    >
      <i
        class="van-icon van-icon-close"
        v-show="isShowDel"
        @click.stop="delOne(index)"
      ></i
    ></van-cell>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowDel: false
    }
  },
  computed: {},
  methods: {
    //删除所有搜索历史
    delAllKW() {
      this.$store.commit('KWHistory', [])
    },
    //删除选定历史
    delOne(val) {
      const KWHistory = this.$store.state.KWHistory
      KWHistory.splice(val, 1) //splice删除数组元素，并返回的是删除的数，改变原数组
      this.$store.commit('KWHistory', KWHistory)
    },
    //搜索给历史记录
    searchThis(val) {
      if (!this.isShowDel) this.$emit('searchThis', val)
    }
  }
}
</script>

<style scoped></style>
