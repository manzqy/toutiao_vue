<template>
  <div class="commet_c">
    <Ccomment v-if="parent.parent" :parent="parent.parent"></Ccomment>
    <div class="row">
      <div class="author">
        <h3>{{parent.user && parent.user.nickname}}</h3>
        <p>2小时前</p>
      </div>
      <span>回复</span>
    </div>
    <p class="article">{{parent.content}}</p>
  </div>
</template>

<script>
export default {
  name: 'Ccomment',
  props: ['parent']
}
</script>

<style lang="less" scoped>
.commet_c {
  padding: 5px;
  border: 1px solid #ccc;
  margin-bottom: 7px;
  .row {
    display: flex;
    justify-content: space-between;
    padding: 0 6px 10px 6px;
    .author {
      display: flex;
      align-items: center;
      h3 {
        font-weight: 700;
        margin-right: 10px;
      }
      p {
        font-size: 14px;
        color: #666;
      }
    }
  }
}
.article {
  padding: 5px;
  color: #51ca0b;
}
</style>
