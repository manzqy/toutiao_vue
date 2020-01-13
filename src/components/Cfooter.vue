<template>
  <div class="comment">
    <div class="addcomment" v-show='!isFocus'>
      <input type="text" placeholder="写跟帖" @focus="handlerFocus" @click='isFocus = !isFocus'/>
      <span class="comment_a" @click="goComment">
        <i class="iconfont iconpinglun-"></i>
        <em>{{post.comment_length}}</em>
      </span>
      <i class="iconfont iconshoucang" :class="{active:post.has_star}" @click="favorite"></i>
      <i class="iconfont iconfenxiang"></i>
    </div>
    <div class="inputcomment" v-show='isFocus'>
        <textarea  ref='commtext' rows="5" ></textarea>
        <div>
            <span @click="publicCtx">发送</span>
            <span @click='o_cancel'>取消</span>
        </div>
    </div>
  </div>
</template>

<script>
import { articleCollect, articleComment } from '@/apis/article'
export default {
  props: {
    post: [Object, Array, String],
    obj: [Object, Array, String],
    present: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      isFocus: false
    }
  },
  watch: {
    obj () {
      if (this.obj) {
        this.isFocus = true
      }
    }
  },
  methods: {
    //   获取焦点时触发
    handlerFocus () {
      this.$refs.commtext.focus()
    },
    async favorite () {
      let { data: res } = await articleCollect(this.post.id)
      this.post.has_star = !this.post.has_star
      this.$toast.success(res.message)
    },
    async publicCtx () {
      let cData = this.$refs.commtext.value
      if (!cData.trim()) {
        return this.$toast.fail('请输入内容')
      }
      let data = { content: cData }
      this.obj && (data.parent_id = this.obj.id)
      let { data: res } = await articleComment(this.post.id, data)
      if (res.message !== '评论发布成功') {
        return this.$toast.fail('评论发布失败')
      }
      this.$emit('cg_ok')
      this.isFocus = false
      this.$refs.commtext.value = ''
    },
    o_cancel () {
      this.isFocus = !this.isFocus
      this.$refs.commtext.value = ''
      this.$emit('o_clear')
    },
    goComment () {
      if (this.present) {
        console.log(1111111)
        this.$router.push({ path: `/comment/${this.post.id}` })
      }
      this.present = true
    }
  }
}
</script>

<style lang='less' scoped>
.inputcomment{
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    padding: 10px;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    background-color: #fff;
    align-items: flex-end;
    span {
      display: inline-block;
      margin: 5px 0;
    }
    textarea{
        flex: 3;
        background-color: #eee;
        border:none;
        border-radius: 10px;
        padding: 10px;
    }
    div{
        padding: 20px;
    }
    span {
        display: block;
        flex: 1;
        height: 24px;
        line-height: 24px;
        padding: 0 10px;
        background-color: #f00;
        color:#fff;
        text-align: center;
        border-radius: 6px;
        font-size: 13px;
    }
}
.addcomment {
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #fff;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  margin-top: 20px;
  display: flex;
  text-align: center;
  bottom: 0;
  left: 0;
  > input {
    flex: 4;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    border: none;
    background-color: #eee;
    padding-left: 20px;
    font-size: 14px;
  }
  i {
    font-size: 20px;
  }
  > span {
    flex: 1;
    position: relative;
    > em {
      position: absolute;
      right: 0;
      top: -5px;
      font-size: 10px;
      background-color: #f00;
      color: #fff;
      border-radius: 5px;
      padding: 3px 5px;
    }
  }
  > i {
    flex: 1;
  }
}
.active {
  color: #f00;
}
</style>
