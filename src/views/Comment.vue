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
        <span @click="replyCxt(item)">回复</span>
      </div>
      <ccomment :parent="item.parent" v-if="item.parent" @banana="replyCxt"></ccomment>
      <p class="c_comment">{{item.content}}</p>
    </div>
    <cfooter :post="articleData" @cg_ok="publishCxt" :obj="c_obj" :present="false"></cfooter>
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
      articleData: [],
      c_obj: ''
    }
  },
  components: {
    ctitle,
    cfooter,
    ccomment
  },
  async mounted () {
    this.init()
    let { data: res2 } = await articleSingle(this.$route.params.id)
    console.log(res2)
    this.articleData = res2.data
  },
  methods: {
    publishCxt () {
      this.init()
      this.$toast.success('发表评论成功')
      window.scrollTo(0, 0)
    },
    async init () {
      let { data: res } = await CommentList(this.$route.params.id)
      console.log(res)
      this.commentData = res.data
    },
    replyCxt (data) {
      this.c_obj = data
    }
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
.c_comment {
  color: #007acc;
}
</style>
