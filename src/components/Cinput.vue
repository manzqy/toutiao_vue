<template>
  <input type="text" :value="value" @input="foo" @blur="verify" :class="isColor">
</template>

<script>
export default {
  data () {
    return {
      isColor: 'success'
    }
  },
  props: {
    value: String,
    msg: {
      type: String
    },
    rules: {
      type: RegExp
    }
  },
  methods: {
    foo (e) {
      let bvalue = e.target.value
      if (this.rules && !this.rules.test(bvalue)) {
        this.isColor = 'danger'
      } else {
        this.isColor = 'success'
      }
      this.$emit('input', bvalue)
    },
    verify (e) {
      let cvalue = e.target.value
      if (this.rules && !this.rules.test(cvalue)) {
        this.$toast.fail(this.msg)
        this.isColor = 'danger'
      } else {
        this.isColor = 'success'
      }
    }
  }
}
</script>

<style lang="less" scoped>
input {
  display: block;
  width: 300/360*100vw;
  outline: none;
  margin: auto;
  border: none;
  outline: none;
  font-size: 20px;
  border-bottom: 2px solid #666;
}
.success {
  border-bottom: 2px solid #6bd10e;
}
.danger {
  border-bottom: 2px solid #f4acb5;
}
</style>
