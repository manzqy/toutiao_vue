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
      <!-- 密码 -->
      <cinput
        placeholder="密码"
        msg="密码至少为3位"
        :rules="/^\S{3,}$/"
        v-model="user.password"
      >
      </cinput>
    </div>
    <div class="row">
      <cbutton @click="submit">登录</cbutton>
    </div>
  </div>
</template>

<script>
import cbutton from '@/components/Cbutton.vue'
import cinput from '@/components/Cinput.vue'
import { userLogin } from '@/apis/user'
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  components: {
    cbutton,
    cinput
  },
  methods: {
    async submit () {
      if (/^\S{3,16}$/.test(this.user.username) && /^\S{3,}$/.test(this.user.password)) {
        let { data: res } = await userLogin(this.user)
        this.$toast.success(res.message)
        if (res.message === '登录成功') {
          localStorage.setItem('toutiao_tt_token', res.data.token)
          localStorage.getItem('toutiao__tt_user', JSON.stringify(res.data.user))
          this.$router.push({ path: `/person/${res.data.user.id}` })
        }
      } else {
        this.$toast.fail('用户名或者密码不正确')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  text-align: center;
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
