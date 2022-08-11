<template>
  <div>
    <van-nav-bar title="登录页面" />
    <van-form @submit="onSubmit" class="form" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #label>
          <span class="toutiao toutiao-shouji1"></span>
        </template>
      </van-field>

      <van-field
        v-model="code"
        type="code"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <template #button>
          <van-button
            v-if="isCodeShow"
            @click="sendCode"
            round
            class="code-btn"
            size="mini"
            native-type="button"
            >获取验证码</van-button
          >
          <van-count-down
            v-else
            @finish="isCodeShow = !isCodeShow"
            :time="1000 * 3"
            format="ss秒"
          />
        </template>
        <template #label>
          <span class="toutiao toutiao-yanzhengma1"></span>
        </template>
      </van-field>
      <div style="margin: 0.4267rem">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { mobileRules, codeRules } from './rules.js'
import { login, getCodeAPI } from '@/api'
export default {
  name: 'Login',
  data() {
    return {
      mobile: '',
      code: '',
      mobileRules,
      codeRules,
      isCodeShow: true
    }
  },
  methods: {
    // 加载弹窗
    loading() {
      this.$toast.loading({
        message: '加载中',
        forbidClick: true
      })
    },
    async onSubmit() {
      try {
        this.loading()
        const res = await login(this.mobile, this.code)
        this.$toast.success('登录成功')
        // 结构赋值
        //  - 数组 const [a,b] = ['你好','hello'] 拥有命名权
        //  - 对象 const { name,age } = {name:'张三',age:18} 没有命名权
        //  - 对象的连续解构赋值 : 一层层的来const { friend:{ name } } = {name:'张三',friend:{ name:'李四' }}
        //  - 对象结构赋值当中的命名 const { friend:{ name:person } } = {name:'张三',friend:{ name:'李四' }}

        // console.log(res)
        const {
          data: { data: tokenObj }
        } = res //解构token
        console.log(tokenObj)
        this.$store.commit('setUser', tokenObj)
        this.$router.push('./my')
      } catch (e) {
        console.log(e)
        let message = '请重新登录'
        const status = e.response.status
        if (status === 400) {
          message = e.response.data.message
        }
        this.$toast.fail(message)
      }
    },
    sendCode() {
      this.$refs.form.validate('mobile').then(async () => {
        try {
          const res = await getCodeAPI(this.mobile)
          this.$toast.success('验证码发送成功')
          console.log(res)
          this.isCodeShow = false
        } catch (e) {
          const status = e.response.status
          let msg = '手机号不正确'
          if (status === 429) {
            msg = e.response.data.message
          }
          this.$toast.fail(msg)
          this.isCodeShow = false
          console.log(e)
        }
      })
    }
  },
  created() {}
}
</script>

<style lang="less" scoped>
.van-nav-bar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}
// 自定义类名form保证样式作用域
:deep(.form) {
  .van-field__label {
    flex: 1;
  }
  .van-field__value {
    flex: 20;
  }
  .toutiao {
    font-size: 40px;
  }
}

//验证码按钮样式
:deep(.code-btn) {
  &.van-button--default {
    background-color: #eeeeee;
    color: #a9929b;
  }
  &.van-button--mini {
    padding: 0 0.2rem;
  }
}
:deep(.van-field__button) {
  button {
    width: 2.3rem;
  }
}
</style>
