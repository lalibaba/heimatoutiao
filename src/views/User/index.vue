<template>
  <div>
    <van-nav-bar title="个人信息" left-arrow @click-left="$router.back()" />
    <!-- 用户信息 -->
    <!-- 头像 -->
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image
        round
        width="0.8rem"
        height="0.8rem"
        :src="userInfo.photo"
      ></van-image>
      <!-- 用户选择头像表单 -->
      <input
        type="file"
        hidden
        accept=".png , .jpg ,.jfif"
        ref="file"
        @change="selectPhoto"
      />
    </van-cell>
    <!-- 头像弹窗 -->
    <van-popup
      v-model="isShowAvator"
      closeable
      :style="{ height: '100%', width: '100%' }"
      ><AvatorUppop
        v-if="isShowAvator"
        :photo="photo"
        @updateImg="userInfo.photo = $event"
      ></AvatorUppop
    ></van-popup>

    <!-- 昵称 -->
    <van-cell
      title="昵称"
      is-link
      :value="userInfo.name"
      @click="nameshow = true"
    >
    </van-cell>
    <!-- 昵称弹窗 -->
    <van-popup v-model="nameshow" position="bottom" :style="{ height: '100%' }"
      ><van-nav-bar
        title="昵称修改"
        left-text="返回"
        right-text="完成"
        left-arrow
        @click-left="nameshow = false"
        @click-right="
          editUserInfo({ name: userInfo.name })
          nameshow = false
          $toast.success('更新昵称成功')
        "
      />
      <van-cell-group>
        <van-field
          v-model="userInfo.name"
          rows="2"
          autosize
          type="textarea"
          maxlength="11"
          placeholder="请输入留言"
          show-word-limit
        />
      </van-cell-group>
    </van-popup>

    <!-- 性别 -->
    <van-cell
      title="性别"
      is-link
      :value="userInfo.gender ? '女' : '男'"
      @click="gendershow = true"
    />
    <!-- 性别弹窗 -->
    <van-popup
      v-model="gendershow"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <van-picker
        title="更新性别"
        show-toolbar
        :columns="['男', '女']"
        :default-index="userInfo.gender"
        @confirm="onConfirm"
        @cancel="gendershow = false"
      />
    </van-popup>

    <!-- 生日 -->
    <van-cell
      title="生日"
      is-link
      :value="userInfo.birthday"
      @click="birthdayshow = true"
    />
    <!-- 生日弹窗 -->
    <van-popup
      v-model="birthdayshow"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="birthdayYes"
        @cancel="birthdayshow = false"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserInfoAPI, editUserInfoAPI } from '@/api'
import AvatorUppop from './components/avatoruppop.vue'
export default {
  name: 'User',
  data() {
    return {
      userInfo: {},
      newUserInfo: {},
      isShowAvator: false,
      photo: '',
      nameshow: false,
      gendershow: false,
      birthdayshow: false,
      minDate: new Date(1900, 1, 1),
      maxDate: new Date(2022, 10, 1),
      currentDate: new Date(2021, 0, 17)
    }
  },
  computed: {},
  created() {
    this.getUserInfo()
  },
  components: {
    AvatorUppop
  },
  methods: {
    //生日确认按钮
    birthdayYes(value) {
      const bsd = new Date(value)
      const y =
        bsd.getFullYear() < 10 ? '0' + bsd.getFullYear() : bsd.getFullYear()
      const m =
        bsd.getMonth() + 1 < 10
          ? '0' + (bsd.getMonth() + 1)
          : bsd.getMonth() + 1
      const d = bsd.getDate() < 10 ? '0' + bsd.getDate() : bsd.getDate()
      const str = y + '-' + m + '-' + d
      this.userInfo.birthday = str
      this.editUserInfo({ birthday: str })
      this.birthdayshow = false
      this.$toast.success('更新生日成功')
      // console.log(str)
    },
    //性别修改按钮
    onConfirm(value, index) {
      this.userInfo.gender = index
      this.editUserInfo({ gender: index })
      this.gendershow = false
      this.$toast.success('更新性别成功')
    },
    //更改用户信息
    async editUserInfo(data) {
      await editUserInfoAPI(data)
      // console.log(res)
    },
    //获取用户资料
    async getUserInfo() {
      const { data } = await getUserInfoAPI()
      this.userInfo = data.data
      this.currentDate = new Date(data.data.birthday)
      // console.log(data.data)
    },
    // 用户选择图片
    selectPhoto(e) {
      const imgFile = e.target.files[0] //获取图片对象
      //方法一:使用window.URL.createObjectURL(file)(缺点挂载到window，不能消除，多了会造成内存泄露)
      // 获取用户选择的图片文件对象
      // const url = window.URL.createObjectURL(imgFile) //将文件对象转换成img标签可识别的url
      //文件url赋值
      // this.photo = url

      //方法二：使用内置类方法FileReader()将图片文件对象转成Base64格式
      const fr = new FileReader() //创建内
      fr.readAsDataURL(imgFile) //选择方法处理文件对象
      // this.photo = fr.result
      //通过fr.onload方法获取转换好的base64代码
      fr.onload = (e) => {
        // console.log(e.target)
        this.photo = e.target.result
        e.target.value = ''
        this.isShowAvator = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
:deep(.van-nav-bar__content) {
  background: #3396fc;
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
:deep(.update-avator) {
  background: #000;
}
</style>
