<template>
  <div class="personal">
    <router-link :to="{path: `/editcxt/${$route.params.id}`}">
      <div class="profile">
        <!-- $axios.defaults.baseURL读取axios的服务器路径 -->
        <img :src="user.head_img" alt />
        <div class="profile-center">
          <div class="name">
            <span class="iconfont iconxingbienan"></span>{{user.nickname}}
          </div>
          <div class="time">{{user.create_date | dateform}}</div>
        </div>
        <span class="iconfont iconjiantou1"></span>
      </div>
    </router-link>
    <clist>
      <h3 slot="left">我的关注</h3>
      <p slot="right">关注的用户</p>
    </clist>
    <clist>
      <h3 slot="left">我的跟帖</h3>
      <p slot="right">跟帖/回复</p>
    </clist>
    <clist>
      <h3 slot="left">我的收藏</h3>
      <p slot="right">文章/视频</p>
    </clist>
    <clist>
      <h3 slot="left">设置</h3>
    </clist>
    <div class="btn">
      <cbutton type="danger">退出</cbutton>
    </div>
  </div>
</template>

<script>
import clist from '@/components/Clist.vue'
import cbutton from '@/components/Cbutton.vue'
import { dateform } from '@/utils/Ufilters'
import { userDetail } from '@/apis/user'
export default {
  data () {
    return {
      user: {}
    }
  },
  components: {
    clist,
    cbutton
  },
  filters: {
    dateform
  },
  async mounted () {
    let { data: res } = await userDetail(this.$route.params.id)
    if (res.message !== '获取成功') {
      return this.$toast.fail(this.message)
    }
    this.user = res.data
    this.user.head_img = 'http://127.0.0.1:3000' + res.data.head_img
  }
}
</script>

<style lang='less' scoped>
.personal{
    width: 100vw;
    height: 100vh;
    background-color: #eee;
}
.btn {
  margin-top: 32px;
}
a{
    color: #666;
}
.profile {
  display: flex;
  padding: 20px 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px #ddd solid;

  img {
    width: 70 / 360 * 100vw;
    height: 70 / 360 * 100vw;
    border-radius: 50%;
  }

  .profile-center {
    flex: 1;
    padding: 0 10px;
  }

  .name {
    span {
      color: #75b9eb;
    }
  }

  .time {
    color: #666;
    font-size: 14px;
    margin-top: 5px;
  }
}
</style>
