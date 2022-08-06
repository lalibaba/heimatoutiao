<template>
  <div class="update-avator">
    <img :src="photo" class="img" ref="image" />

    <footer>
      <span @click="$parent.$parent.isShowAvator = false">取消</span>
      <span @click="uploadAvatorimg">完成</span>
    </footer>
  </div>
</template>

<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { uploadAvator } from '@/api'
export default {
  data() {
    return {}
  },
  props: {
    photo: {
      type: String
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    //上传截图
    uploadAvatorimg() {
      this.$parent.$parent.isShowAvator = false
      try {
        this.myCropper.getCroppedCanvas().toBlob(async (blob) => {
          // blon是一个文件对象，在请求中已经将其处理为表单后传输
          const res = await uploadAvator(blob)
          //解决请求后头像未更新bug
          // console.log(res.data.data.photo)
          this.$emit('updateImg', res.data.data.photo)
        })
        this.$toast.success('头像更换成功')
      } catch (e) {
        console.dir(e)
      }
    },
    //初始化截图数据
    init() {
      this.myCropper = new Cropper(this.$refs.image, {
        viewMode: 1,
        dragMode: 'none',
        initialAspectRatio: 1,
        aspectRatio: 1,
        preview: '.before',
        background: false,
        autoCropArea: 0.6,
        zoomOnWheel: false
      })
    }
  }
}
</script>

<style lang="less" scoped>
.update-avator {
  height: 100%;
  position: relative;
  .img {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 100%;
    height: 65%;
  }
  footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    color: #fff;
    font-size: 40px;
  }
}
</style>
