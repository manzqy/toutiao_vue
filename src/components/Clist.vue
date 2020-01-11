<template>
  <div class="clist">
    <slot name="left"></slot>
    <div class="right" @click="foo">
      <slot name="right"></slot>
      <van-icon name="arrow" />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    foo (e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style lang="less" scoped>
.clist {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 15px;
  font-size: 16px;
  border-bottom: 1px solid #ccc;
}
.right {
  display: flex;
  align-items: center;
  color: #41b883;
  font-size: 14px;
  .van-icon {
    margin-left: 10px;
  }
}
</style>
