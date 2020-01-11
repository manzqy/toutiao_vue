<template>
  <div>
    <header>
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="search">
        <van-icon name="search" />
        <span>搜索新闻</span>
      </div>
      <div class="person">
        <van-icon name="contact" />
      </div>
    </header>
    <main>
      <van-tabs v-model="active">
        <van-tab :title="item.name" v-for="item in catelist" :key="item.id*100">
          <ccontent :post="value" v-for="value in item.postlist" :key="value.id"></ccontent>
        </van-tab>
      </van-tabs>
    </main>
  </div>
</template>

<script>
import ccontent from '@/components/Ccontent.vue'
import { columnList } from '@/apis/column'
import { articleList } from '@/apis/article'
export default {
  data () {
    return {
      active: localStorage.getItem('toutiao_tt_token') ? 1 : 0,
      catelist: []
    }
  },
  components: {
    ccontent
  },
  async mounted () {
    let { data: res } = await columnList()
    console.log(res)
    this.catelist = res.data.map(v => {
      return {
        ...v,
        pageIndex: 1,
        pageSize: 5,
        postlist: []
      }
    })
    this.init()
  },
  methods: {
    async init () {
      let { data: res } = await articleList({
        pageIndex: this.catelist[this.active].pageIndex,
        pageSize: this.catelist[this.active].pageSize,
        category: this.catelist[this.active].id
      })
      console.log(res)
      this.catelist[this.active].postlist = res.data
    }
  }
}
</script>

<style lang="less" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 9px 15px;
  height: 32px;
  background-color: #ff0000;
  color: #fff;
  .iconfont {
    flex: 2;
    font-size: 56px;
    text-align: center;
  }
  .search {
    flex: 6;
    display: flex;
    height: 100%;
    justify-content: center;
    border-radius: 35/2px;
    align-items: center;
    color: #fff;
    background-color: rgba(255,255,255,0.6);
    span {
      margin-left: 7px;
    }
  }
  .person {
    flex: 1;
    text-align: center;
    font-size: 23px;
  }
}
</style>
