<template>
  <div>
    <ctitle title="编辑资料"></ctitle>
    <div class="pic">
      <van-uploader :after-read="afterRead" />
      <img :src="user.head_img" alt="">
    </div>
    <clist @click="show_a=!show_a">
      <h3 slot="left">昵称</h3>
      <p slot="right">{{user.nickname}}</p>
    </clist>
    <clist @click="show_b=!show_b">
      <h3 slot="left">密码</h3>
      <p slot="right">******</p>
    </clist>
    <clist @click="show_c=!show_c">
      <h3 slot="left">性别</h3>
      <p slot="right">{{user.gender==0?'男':'女'}}</p>
    </clist>
    <!-- 昵称 -->
    <van-dialog
      v-model="show_a"
      title="昵称"
      show-cancel-button
      :before-close="beforeClose_a"
    >
      <van-field v-model="t_nickname" label="昵称" />
    </van-dialog>
    <!-- 密码 -->
    <van-dialog
      v-model="show_b"
      title="密码"
      show-cancel-button
      :before-close="beforeClose_b"
    >
      <van-field v-model="n_password" label="原密码" />
      <van-field v-model="t_password" label="新密码" />
    </van-dialog>
    <!-- 性别 -->
    <van-dialog
      v-model="show_c"
      title="性别"
      show-cancel-button
      :before-close="beforeClose_c"
    >
      <van-picker :columns="['男','女']" @change="onChange" :default-index="t_gender"/>
    </van-dialog>
  </div>
</template>

<script>
import ctitle from '@/components/Ctitle.vue'
import clist from '@/components/Clist.vue'
import { userDetail, userEdit } from '@/apis/user'
import { uploadFile } from '@/apis/upload'
export default {
  data () {
    return {
      user: {},
      show_a: false,
      show_b: false,
      show_c: false,
      t_nickname: '',
      n_password: '',
      t_password: '',
      t_gender: ''
    }
  },
  components: {
    ctitle,
    clist
  },
  async mounted () {
    let { data: res } = await userDetail(this.$route.params.id)
    if (res.message !== '获取成功') {
      return this.$toast.fail(this.message)
    }
    this.user = res.data
    this.user.head_img = 'http://127.0.0.1:3000' + res.data.head_img
    this.t_nickname = this.user.nickname
    this.t_gender = this.user.gender
  },
  methods: {
    async afterRead (file) {
      // 此时可以自行将文件上传至服务器
      let fd = new FormData()
      fd.append('file', file.file)
      let { data: res } = await uploadFile(fd)
      if (res.message !== '文件上传成功') {
        return this.$toast.fail(res.message)
      }
      this.user.head_img = 'http://127.0.0.1:3000' + res.data.url
      let { data: res2 } = await userEdit(this.$route.params.id, {
        head_img: res.data.url
      })
      if (res2.message === '修改成功') {
        return this.$toast.success(res2.message)
      }
      this.$toast.fail(res2.message)
    },
    async beforeClose_a (action, done) {
      if (action === 'confirm') {
        let reg = /^\S{1,16}$/
        if (!reg.test(this.t_nickname)) {
          done(false)
          return this.$toast.fail('昵称至少为一位')
        }
        let { data: res2 } = await userEdit(this.$route.params.id, {
          nickname: this.t_nickname
        })
        done()
        if (res2.message === '修改成功') {
          this.user.nickname = this.t_nickname
          return this.$toast.success(res2.message)
        }
        this.$toast.fail(res2.message)
      } else {
        done()
      }
    },
    async beforeClose_b (action, done) {
      if (action === 'confirm') {
        if (this.n_password !== this.user.password) {
          done(false)
          return this.$toast.fail('密码不正确')
        } else if (!/^\S{3,16}$/.test(this.t_password)) {
          done(false)
          return this.$toast.fail('密码至少三位')
        }
        let { data: res2 } = await userEdit(this.$route.params.id, {
          password: this.t_password
        })
        done()
        if (res2.message === '修改成功') {
          return this.$toast.success(res2.message)
        }
        this.$toast.fail(res2.message)
      }
      this.t_password = ''
      this.n_password = ''
      done()
    },
    onChange (picker, value, index) {
      this.t_gender = index
    },
    async beforeClose_c (action, done) {
      if (action === 'confirm') {
        let { data: res2 } = await userEdit(this.$route.params.id, {
          gender: this.t_gender
        })
        if (res2.message === '修改成功') {
          this.user.gender = this.t_gender
          done()
          return this.$toast.success(res2.message)
        }
        this.$toast.fail(res2.message)
        done()
      }
      this.t_gender = this.user.gender
      done()
    }
  }
}
</script>

<style lang="less" scoped>
@height: 70/360*100vw;
.pic {
  position: relative;
  height: 136px;
  img {
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    width: @height;
    height: @height;
    border-radius: @height/2;
    background-color: yellow;
  }
  /deep/.van-uploader__upload {
    width: @height;
    height: @height;
  }
  /deep/.van-uploader {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    z-index: 9999;
    opacity: 0;
  }
}
</style>
