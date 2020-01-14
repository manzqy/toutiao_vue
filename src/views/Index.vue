<template>
  <div>
    <header>
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="search" @click="$router.push({ name: 'Search' })">
        <van-icon name="search" />
        <span>搜索新闻</span>
      </div>
      <div class="person" @click="goPerson">
        <van-icon name="contact" />
      </div>
    </header>
    <main>
      <van-tabs v-model="active" sticky>
        <van-tab :title="item.name" v-for="item in catelist" :key="item.id*100">
          <van-pull-refresh v-model="catelist[active].isLoading" @refresh="onRefresh" success-text="刷新成功">
            <van-list
              :immediate-check="false"
              :offset="100"
              v-model="catelist[active].loading"
              :finished="catelist[active].finished"
              finished-text="没有更多了"
              @load="onLoad"
            >
            <ccontent :post="value" v-for="value in item.postlist" :key="value.id"></ccontent>
            </van-list>
          </van-pull-refresh>
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
  watch: {
    active () {
      if (this.catelist[this.active].postlist.length === 0) {
        this.init()
      }
    }
  },
  async mounted () {
    let that = this
    document.querySelector('.van-tabs').onclick = function (e) {
      if (e.target.className.indexOf('van-tabs') !== -1) {
        that.$router.push({ name: 'Category' })
      }
    }
    // -------------
    let res, result
    if (localStorage.getItem('category_add_01') || localStorage.getItem('category_del_01')) {
      res = await columnList()
      result = JSON.parse(localStorage.getItem('category_add_01')) || []
      if (this.active) {
        res = [...res.data.data.splice(0, 2), ...result]
      } else {
        res = [...res.data.data.splice(0, 1), ...result]
      }
    } else {
      res = await columnList()
      res = res.data.data
    }
    this.catelist = res.map(v => {
      return {
        ...v,
        pageIndex: 1,
        pageSize: 5,
        postlist: [],
        loading: false,
        finished: false,
        isLoading: false
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
      this.catelist[this.active].postlist.push(...res.data)
      this.catelist[this.active].isLoading = false
      this.catelist[this.active].loading = false
      if (res.data.length < this.catelist[this.active].pageSize) {
        this.catelist[this.active].finished = true
      }
    },
    onLoad () {
      this.catelist[this.active].pageIndex++
      setTimeout(() => {
        this.init()
      }, 1000)
    },
    async onRefresh () {
      this.catelist[this.active].pageIndex = 1
      this.catelist[this.active].postlist.length = 0
      await this.init()
      this.catelist[this.active].finished = false
    },
    goPerson () {
      if (this.active) {
        let pId = JSON.parse(localStorage.getItem('toutiao__tt_user') || '{}').id
        this.$router.push({ path: `/person/${pId}` })
      } else {
        this.$router.push({ name: 'Login' })
      }
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.van-tabs__wrap {
  padding-right: 36px;
}
/deep/.van-tabs__wrap::before {
  content: '💕';
  display: block;
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 36px;
  text-align: center;
  line-height: 44px;
  background-color: #fff;
}
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
