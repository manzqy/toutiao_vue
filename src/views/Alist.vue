<template>
  <div class="stars">
    <ctitle title="我的收藏"></ctitle>
    <van-swipe-cell v-for="(item,index) in stardata" :key="item.id">
      <ccontent :post="item"></ccontent>
      <template slot="right">
        <van-button square type="danger" text="删除" @click="foo(item.id, index)" />
      </template>
    </van-swipe-cell>
  </div>
</template>

<script>
import ctitle from '@/components/Ctitle.vue'
import ccontent from '@/components/Ccontent.vue'
import { userStarList } from '@/apis/user'
import { articleCollect } from '@/apis/article'
export default {
  data () {
    return {
      stardata: []
    }
  },
  components: {
    ctitle,
    ccontent
  },
  async mounted () {
    let { data: res } = await userStarList()
    this.stardata = res.data
  },
  methods: {
    async foo (id, index) {
      let { data: res } = await articleCollect(id)
      this.$toast.success(res.message)
      this.stardata.splice(index, 1)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.van-button {
  height: 100%;
  opacity: 0.6;
}
</style>
