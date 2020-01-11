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
        v-model="user.usename"
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
      <cbutton>登录</cbutton>
    </div>
  </div>
</template>

<script>
import cbutton from '@/components/Cbutton.vue'
import cinput from '@/components/Cinput.vue'
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
