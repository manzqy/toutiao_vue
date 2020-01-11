<template>
  <div class="login">
    <div class="close">
      <span class="iconfont iconicon-test">
      </span>
    </div>
    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>
    <div class="row">
      <!-- 用户名 -->
      <cinput
        placeholder="用户名/手机号码"
        msg="用户名或手机密码在3至16位之间"
        :rules="/^\S{3,16}$/"
        v-model="user.username"
      >
      </cinput>
    </div>
    <div class="row">
      <!-- 昵称 -->
      <cinput
        placeholder="用户名/昵称"
        msg="昵称至少在一位"
        :rules="/^\S{1,16}$/"
        v-model="user.nickname"
      >
      </cinput>
    </div>
    <div class="row">
      <!-- 密码 -->
      <cinput
        placeholder="密码"
        msg="密码至少为3位"
        :rules="/^\S{3,16}$/"
        v-model="user.password"
      >
      </cinput>
    </div>
    <div class="register">已有账号？<span @click="register">去登录</span></div>
    <div class="row">
      <cbutton @click="login" type="warning">注册</cbutton>
    </div>
  </div>
</template>

<script>
import cbutton from '@/components/Cbutton.vue'
import cinput from '@/components/Cinput.vue'
import { userRegister } from '@/apis/user'
export default {
  data () {
    return {
      user: {
        username: '',
        password: '',
        nickname: ''
      }
    }
  },
  components: {
    cbutton,
    cinput
  },
  methods: {
    async login () {
      if (/^\S{3,16}$/.test(this.user.username) && /^\S{3,16}$/.test(this.user.password) && /^\S{1,16}$/.test(this.user.nickname)) {
        let { data: res } = await userRegister(this.user)
        this.$toast.success(res.message)
        console.log(res)
        if (res.message === '注册成功') {
          this.$router.push({ name: 'Login' })
        }
      } else {
        this.$toast.fail('请输入正确的格式')
      }
    },
    register () {
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  text-align: center;
}
.register {
  text-align: right;
  font-size: 14px;
  color: #666;
  padding-right: 26px;
  span {
    color: #5dce05;
    cursor: pointer;
  }
}
.close {
  text-align: left;
  margin: 20px;
}
.iconfont {
  font-size: 30px;
}
.logo {
  .iconfont {
    font-size: 125px;
    color: #d81e06;
  }
}
.row {
  padding: 10px 0;
  margin: 20px 0;
}
</style>
