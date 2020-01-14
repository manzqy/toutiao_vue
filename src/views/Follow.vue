<template>
  <div class="followlist">
    <ctitle title="我的关注"></ctitle>
    <div class="row" v-for="(item,index) in followList" :key="item.id">
      <div class="left">
        <img :src="'http://127.0.0.1:3000' + item.head_img" alt="">
        <div class="author">
          <h3>{{item.nickname}}</h3>
          <p>{{item.create_date | dateform('-')}}</p>
        </div>
      </div>
      <div class="right">
        <h4 @click="unfollow(item.id, index)">取消关注</h4>
      </div>
    </div>
  </div>
</template>

<script>
import ctitle from '@/components/Ctitle.vue'
import { userFollowList, userUnfollow } from '@/apis/user'
import { dateform } from '@/utils/Ufilters'
export default {
  data () {
    return {
      followList: []
    }
  },
  filters: {
    dateform
  },
  components: {
    ctitle
  },
  async mounted () {
    let { data: res } = await userFollowList()
    this.followList = res.data
  },
  methods: {
    async unfollow (id, index) {
      let { data: res } = await userUnfollow(id)
      this.$toast(res.message)
      if (res.message === '取消关注成功') {
        this.followList.splice(index, 1)
      }
    }
  }
}
</script>

<style lang="less" scoped>
@width: 50/360*100vw;
.followlist {
  padding: 10px;
}
.row {
  display: flex;
  padding: 15px 0;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
}
img {
  display: block;
  width: @width;
  height: @width;
  border-radius: 50%;
  background-color: green;
}
.left {
  display: flex;
}
.author {
  margin-left: 10px;
  h3 {
    margin-top: 2px;
    margin-bottom: 15px;
  }
  p {
    font-size: 14px;
    color: #666;
  }
}
.right {
  h4 {
    padding: 10px;
    background-color: #ccc;
    font-size: 14px;
    margin-right: 10px;
    border-radius: 33.5/2px;
    opacity: 0.7;
  }
}
</style>
