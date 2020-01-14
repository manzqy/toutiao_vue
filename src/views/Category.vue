<template>
  <div class="category">
    <ctitle title="栏目管理"></ctitle>
    <div class="row">
      <h3>点击删除以下频道</h3>
      <ul class="active">
        <li
          v-for="(item,index) in categorylist"
          :key="item.id"
          @click="del(index)"
        >{{item.name}}</li>
      </ul>
    </div>
    <div class="row">
      <h3>点击添加以下频道</h3>
      <ul>
        <li
          v-for="(value,i) in uncategorylist"
          :key="value.id"
          @click="add(i)"
        >
        {{value.name}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import ctitle from '@/components/Ctitle.vue'
import { columnList } from '@/apis/column'
export default {
  data () {
    return {
      categorylist: [],
      uncategorylist: []
    }
  },
  components: {
    ctitle
  },
  async mounted () {
    if (localStorage.getItem('category_add_01') || localStorage.getItem('category_del_01')) {
      this.categorylist = JSON.parse(localStorage.getItem('category_add_01')) || []
      this.uncategorylist = JSON.parse(localStorage.getItem('category_del_01')) || []
    } else {
      let { data: res } = await columnList()
      console.log(res)
      let token = localStorage.getItem('toutiao_tt_token')
      if (token) {
        this.categorylist = res.data.splice(2)
      } else {
        this.categorylist = res.data.splice(1)
      }
    }
  },
  methods: {
    del (index) {
      this.uncategorylist.push(this.categorylist.splice(index, 1)[0])
      localStorage.setItem('category_add_01', JSON.stringify(this.categorylist))
      localStorage.setItem('category_del_01', JSON.stringify(this.uncategorylist))
    },
    add (index) {
      this.categorylist.push(this.uncategorylist.splice(index, 1)[0])
      localStorage.setItem('category_add_01', JSON.stringify(this.categorylist))
      localStorage.setItem('category_del_01', JSON.stringify(this.uncategorylist))
    }
  }
}
</script>

<style lang="less" scoped>
.row {
  padding: 15px;
  h3 {
    margin-left: 5px;
    font-size: 17px;
    color: green;
    padding: 10px 0;
  }
  ul {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  li {
    flex: 0 0 15%;
    text-align: center;
    padding: 10px;
    border: 1px solid #666;
    margin: 5px;
  }
}
.active {
  color: #007acc;
}
</style>
