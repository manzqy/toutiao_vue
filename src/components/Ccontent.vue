<template>
<!-- num 1 -->
  <div v-if="post.type==1&&post.cover.length==1" class="content" @click="foo">
    <div class="left">
      <h3>{{post.title}}</h3>
      <p><span>{{post.user && post.user.nickname}}</span><span>{{post.comment_length}}</span></p>
    </div>
    <div class="right">
      <img :src="post.cover[0].url" alt="">
    </div>
  </div>
  <!-- num 2 -->
  <div v-else-if="post.type==2" class="video" @click="foo">
    <h3>{{post.title}}</h3>
    <div class="cover">
      <van-icon name="play" />
      <img :src="post.cover[0].url" alt="">
    </div>
      <p><span>{{post.user && post.user.nickname}}</span><span>{{post.comment_length}}</span></p>
  </div>
  <!-- num 3 -->
  <div v-else class="video" @click="foo">
    <h3>{{post.title}}</h3>
    <div class="mulpic">
      <img :src="value.url" alt="" v-for="value in post.cover" :key="value.id">
    </div>
    <p><span>{{post.user && post.user.nickname}}</span><span>{{post.comment_length}}</span></p>
  </div>
</template>

<script>
export default {
  props: ['post'],
  methods: {
    foo () {
      this.$router.push({ path: `/article/${this.post.id}` })
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  display: flex;
  justify-content: space-between;
  padding: 20px 15px;
  border-bottom: 1px solid #ccc;
  .left {
    flex: 3;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px 0;
    padding-right: 10px;
  }
  .right {
    flex: 2;
  }
}
span {
  margin-right: 15px;
  font-size: 14px;
  color: #aaa;
}
img {
  width: 100%;
}
.video {
  padding: 20px 15px;
  border-bottom: 1px solid #ccc;
}
.cover {
  position: relative;
  padding: 15px 0;
  .van-icon {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    background-color: rgba(0,0,0,0.3);
    color: rgba(255,255,255,0.9);
    font-size: 36px;
    padding: 10px;
    border-radius: 28px;
  }
}
.mulpic {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 15px 0;
  img {
    width: 32%;
  }
}
</style>
