<template>
  <div class="search">
    <ctitle>
      <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        slot="center"
        shape="round"
      >
      </van-search>
      <div slot="right" @click="onSearch(null)">搜索</div>
    </ctitle>
    <div class="row">
      <h4 @click="show=!show">清空</h4>
      <h3>历史记录</h3>
      <ul>
        <li v-for="item in searchList" :key="item" @click="onSearch(item)">{{item}}</li>
      </ul>
    </div>
    <div>
      <h3>热门搜索</h3>
      <p v-for="item in searchData" :key="item.id" @click="$router.push({path:`/article/${item.id}`})">{{item.title}}</p>
    </div>
    <van-dialog
      v-model="show"
      title="提示"
      show-cancel-button
      @confirm="clearList"
    >
    <h5>你确定要清空列表吗！</h5>
    </van-dialog>
  </div>
</template>

<script>
import ctitle from '@/components/Ctitle.vue'
import { articleSearch } from '@/apis/article'
export default {
  data () {
    return {
      value: '',
      searchData: [],
      searchList: [],
      show: false
    }
  },
  components: {
    ctitle
  },
  methods: {
    async onSearch (data) {
      if (this.value.trim() || data) {
        if (this.searchList.indexOf(this.value) !== -1 && !data) {
          this.searchList.splice(this.searchList.indexOf(this.value), 1)
        }
        data || this.searchList.unshift(this.value)
        localStorage.setItem('heima_search_list', JSON.stringify(this.searchList))
        let { data: res } = await articleSearch({
          keyword: data || this.value
        })
        this.searchData = res.data
      } else {
        this.$toast.fail('搜索内容不能为空')
      }
    },
    clearList () {
      this.searchList.length = 0
      localStorage.removeItem('heima_search_list')
    }
  },
  mounted () {
    this.searchList = JSON.parse(localStorage.getItem('heima_search_list')) || []
  }
}
</script>

<style lang="less" scoped>
.search {
  padding: 10px;
}
.van-search {
  position: absolute;
  top: 50%;
  left: 47%;
  transform: translate(-50%,-50%)
}
/deep/.van-field__control {
  min-width: 186px;
}
h3 {
  padding: 15px 0;
  font-weight: 700;
}
.row {
  border-bottom: 1px solid #ccc;
  position: relative;
  padding: 10px 0;
}
h4 {
  position: absolute;
  font-size: 14px;
  top: 27px;
  right: 36px;
  color: red;
}
h5 {
  margin: 17px 0;
  text-align: center;
  color: #f96f3b;
}
ul {
  display: flex;
  flex-wrap: wrap;
  li {
    flex: 0 0 25%;
    margin-bottom: 16px;
    padding: 5px;
    color: green;
    text-decoration: underline;
  }
}
p {
  padding: 12px 15px 12px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #007acc;
}
</style>
