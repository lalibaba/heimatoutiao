<template>
  <div>
    <van-cell
      v-if="articleIfon.cover.type === 0"
      :title="articleIfon.title"
      :label="label"
    />
    <!-- 2张图片 -->
    <van-cell
      v-else-if="articleIfon.cover.type === 1"
      :title="articleIfon.title"
      :label="label"
      ><van-image width="50" height="50" :src="articleIfon.cover.images[0]" />
    </van-cell>
    <!-- 三张图片 -->
    <van-cell v-else :title="articleIfon.title" :label="label">
      <van-image
        width="50"
        height="50"
        v-for="(item, index) in articleIfon.cover.images"
        :key="index"
        :src="item"
      />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    label() {
      return `${this.articleIfon.aut_name} ${
        this.articleIfon.comm_count
      }评论 ${Math.floor(
        (+new Date() - +new Date(this.articleIfon.pubdate)) /
          1000 /
          60 /
          60 /
          24 /
          365
      )} 年前`
    }
  },
  props: {
    articleIfon: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped></style>
