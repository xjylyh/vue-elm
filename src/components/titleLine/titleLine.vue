<template>
  <div class="title">
    <div class="line"></div>
    <div class="text">{{this.textString}}</div>
    <div class="line"></div>
  </div>
</template>

<script>
  export default {
    props:{
      textString:{
        type:String
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .detail_main>.title
    display:flex
    width: 80%
    margin:28px auto 24px auto
    .line
      flex: 1
      position:relative
      top: -6.5px
      border-bottom:1px solid rgba(255,255,255,0.2)
    .text
      padding:0 12px
      font-weight :700
      font-size: 14px
</style>
