<template>
  <div class="btn" :class="[size,type]">
    <span class="iconfont" :class="icon"></span>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: 'large'
    },
    icon: {
      type: String
    },
    type: {
      type: String,
      default: 'primary'
    }
  }
}
</script>

<style lang="less" scoped>
.btn {
  margin: 0 auto;
  text-align: center;
  color: #fff;
}
.large {
  width: 260/360*100vw;
  height: 40px;
  line-height: 40px;
  border-radius: 20px;
}
.small {
  width: 75/360*100vw;
  height: 30px;
  line-height: 30px;
  border-radius: 15px;
}
.primary {
  background-color: #1989fa;
}
</style>
