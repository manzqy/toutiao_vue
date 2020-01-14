<template>
  <div class="ctitle">
    <div class="left" @click="foo">
      <van-icon name="arrow-left" />
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
      {{title}}
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    }
  },
  methods: {
    foo (e) {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
.ctitle {
  display: flex;
  position: relative;
  padding: 20px 10px;
}
.left {
  flex: 1;
  font-size: 17px;
}
.center {
  text-align: center;
  font-size: 17px;
  font-weight: 700;
  flex: 3;
}
.right {
  position: relative;
  z-index: 9999;
  flex: 1;
  margin-top: 2px;
  text-align: center;
  color: #007acc;
  font-size: 15px;
  font-weight: 700;
}
</style>
