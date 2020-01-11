<template>
  <div>
    <ctitle>
      <span class="iconfont iconnew" slot="left"></span>
      <div slot="right" class="followbtn">
        <cbutton size="small" :type="articleData.has_follow==false?'secondary':'danger'" @click="follow_a">
          {{articleData.has_follow==false?'关注':'已关注'}}
        </cbutton></div>
    </ctitle>
  <div class="article">
    <h3>{{articleData.title}}</h3>
    <p class="author">
      <span>{{articleData.user && articleData.user.nickname}}</span>
      <span>{{articleData.create_date | dateform}}</span>
    </p>
    <video
      :src="articleData.content"
      v-if="articleData.type==2"
      controls
      :poster="articleData.cover[0].url"
    ></video>
    <p
     v-if="articleData.type==1" v-html="articleData.content"
     class="contentlist"
    ></p>
    <div class="btngroup">
      <cbutton size="small" type="secondary" :class="{active: articleData.has_like}" @click="click_like">
        <van-icon name="good-job-o" />
        <span>{{articleData.like_length || 0}}</span>
      </cbutton>
      <cbutton size="small" type="secondary">
        <van-icon name="chat" class="w" />
        <span>微信</span>
      </cbutton>
    </div>
    <header>
      <h3>精彩跟帖</h3>
      <p>暂无跟踪,抢占沙发</p>
      <cfooter :post="articleData"></cfooter>
    </header>
  </div>
  </div>
</template>

<script>
import ctitle from '@/components/Ctitle.vue'
import cbutton from '@/components/Cbutton.vue'
import cfooter from '@/components/Cfooter.vue'
import { articleSingle, articleLike } from '@/apis/article'
import { userFollow, userUnfollow } from '@/apis/user'
import { dateform } from '@/utils/Ufilters'
export default {
  data () {
    return {
      articleData: {}
    }
  },
  filters: {
    dateform
  },
  components: {
    ctitle,
    cbutton,
    cfooter
  },
  async mounted () {
    let { data: res } = await articleSingle(this.$route.params.id)
    console.log(res)
    this.articleData = res.data
  },
  methods: {
    async follow_a () {
      if (!this.articleData.has_follow) {
        let { data: res } = await userFollow(this.articleData.user.id)
        if (res.message === '关注成功') {
          this.$toast.success(res.message)
          this.articleData.has_follow = true
        }
      } else {
        let { data: res2 } = await userUnfollow(this.articleData.user.id)
        if (res2.message === '取消关注成功') {
          this.$toast.fail(res2.message)
          this.articleData.has_follow = false
        }
      }
    },
    async click_like () {
      let { data: res } = await articleLike(this.$route.params.id)
      if (res.message === '取消成功') {
        this.articleData.like_length--
      } else {
        this.articleData.like_length++
      }
      this.articleData.has_like = !this.articleData.has_like
    }
  }
}
</script>

<style lang="less" scoped>
.w {
  color: #4dcb09;
}
.article {
  padding: 5px 10px;
}
.iconfont {
  font-size: 44px;
  position: relative;
  top: 7px;
}
.followbtn {
  position: relative;
  top: 15px;
}
/deep/.photo {
  img {
  width: 100%;
}
}
.author {
  font-size: 14px;
  color: #666;
  margin: 10px 0 15px 0;
  span {
    margin-right: 15px;
  }
}
h3 {
  font-weight: 700;
  font-size: 17px;
  padding: 15px 0;
}
.contentlist {
  line-height: 26px;
}
video {
  width: 100%;
}
.btngroup {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px 10px 45px 10px;
  border-bottom: 3px solid #ccc;
  span {
    margin-left: 5px;
  }
  .van-icon {
    position: relative;
    top: 2px;
  }
}
header {
  text-align: center;
  padding-bottom: 60px;
  h3 {
    margin: 20px 0;
    font-weight: 400;
  }
  p {
    font-size: 14px;
    color: #666;
  }
}
.active {
  color: #dd001b!important;
}
</style>
