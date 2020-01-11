<template>
  <div>
    <ctitle title="精彩跟帖"></ctitle>
    <div class="comment" v-for="item in commentData" :key="item.id">
      <div class="row">
        <div class="col">
          <img :src="'http://127.0.0.1:3000'+item.user.head_img" alt="">
          <div class="author">
            <h3>{{item.user && item.user.nickname}}</h3>
            <p>2小时前</p>
          </div>
        </div>
        <span>回复</span>
      </div>
      <ccomment :parent="item.parent"></ccomment>
      <p>{{item.content}}</p>
    </div>
    <cfooter :post="articleData"></cfooter>
  </div>
</template>

<script>
import ctitle from '@/components/Ctitle.vue'
import ccomment from '@/components/Ccomment.vue'
import { CommentList, articleSingle } from '@/apis/article'
import cfooter from '@/components/Cfooter.vue'
export default {
  data () {
    return {
      commentData: [],
      articleData: []
    }
  },
  components: {
    ctitle,
    cfooter,
    ccomment
  },
  async mounted () {
    let { data: res } = await CommentList(this.$route.params.id)
    console.log(res)
    this.commentData = res.data
    let { data: res2 } = await articleSingle(this.$route.params.id)
    console.log(res2)
    this.articleData = res2.data
  }
}
</script>

<style lang='less' scoped>
@width: 56/360*100vw;
.comment {
  padding: 10px 15px 10px 10px;
  border-bottom: 1px solid #ccc;
  .row {
    display: flex;
    justify-content: space-between;
    padding: 15px 0;
  }
  .col {
    display: flex;
  }
  .author {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 7px;
    p {
      font-size: 14px;
      color: #666;
    }
  }
  img {
    display: block;
    width: @width;
    height: @width;
    border-radius: 50%;
    background-color: yellow;
  }
}
</style>
