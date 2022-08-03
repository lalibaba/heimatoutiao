<template>
  <div class="channel">
    <!-- 我的频道 -->
    <van-cell title="我的频道">
      <van-button
        round
        size="small"
        class="edit_btn"
        @click="isEdit = !isEdit"
        >{{ isEdit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <van-grid direction="horizontal" gutter="0.2rem">
      <van-grid-item
        v-for="(item, index) in channels"
        :key="item.id"
        :text="item.name"
        :class="['mychannel_item', { active: item.name == '推荐' }]"
        @click="changeActive(index, item)"
      >
        <template #icon>
          <van-icon
            name="cross"
            v-show="isEdit && item.name != '推荐'"
          ></van-icon> </template
      ></van-grid-item>
    </van-grid>
    <!-- 推荐频道 -->
    <van-cell title="推荐频道"> </van-cell>
    <van-grid gutter="0.2rem" direction="horizontal">
      <van-grid-item
        v-for="item in recommendChannels"
        :key="item.id"
        :text="item.name"
        icon="plus"
        class="recommend_item"
        @click="$emit('add-channel', item)"
      />
    </van-grid>
  </div>
</template>
<script>
import { getAllChannel } from '@/api'
export default {
  name: 'ChannelPopup',
  data() {
    return {
      isEdit: false,
      AllChannelList: []
    }
  },
  props: {
    channels: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    recommendChannels() {
      return this.AllChannelList.filter(
        (allitem) => !this.channels.find((myitem) => myitem.id === allitem.id)
      )
    }
  },
  created() {
    this.getAllChannelList()
  },
  methods: {
    //获取所有频道列表
    async getAllChannelList() {
      const res = await getAllChannel()
      // console.log(res.data.data.channels)
      this.AllChannelList = res.data.data.channels
    },
    //点击频道
    changeActive(index, item) {
      if (this.isEdit) {
        //删除频道
        if (item.name === '推荐') return
        this.$emit('delChannel', item.id)
      } else {
        //关闭弹窗
        this.$emit('close')
        // console.log(this.$parent.$parent)
        // this.$parent.$parent.show = false
        this.$emit('change-active', index)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.active {
  :deep(.van-grid-item__text) {
    color: red;
  }
}
.channel {
  padding-top: 1.33333rem;
  .edit_btn {
    width: 104px;
    color: red;
    &.van-button--default {
      border-color: red;
    }
  }
  :deep(.van-grid-item__content) {
    background-color: #eee;
  }
  .recommend_item {
    :deep(.van-grid-item__icon) {
      font-size: 40px;
    }
  }
  :deep(.mychannel_item) {
    .van-grid-item__content {
      position: relative;
    }
    .van-grid-item__icon-wrapper {
      position: unset;
    }
    .van-icon-cross {
      position: absolute;
      right: 0;
      top: 0;
      font-size: 30px;
      transform: translate(45%, -50%);
      border: 2px solid #000;
      border-radius: 50%;
      z-index: 300;
    }
  }
}
</style>
