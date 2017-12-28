<template>
  <div class="cartcontrol">
    <transition name="trans">
      <div class="cart-decrease" v-show="food.count>0" @click="redCart">
        <span class="inner icon-remove_circle_outline">1</span>
      </div>
    </transition>
    
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click="addCart"></div>
  </div>
</template>

<script>
import Vue from 'vue';
export default {
  props:{
    food:{
      type:Object
    }
  },
  methods:{
    addCart(event){
      if(!event._constructed){
        return false;
      }
      if(!this.food.count){
        Vue.set(this.food,'count',1);
      }else{
        this.food.count++;
      }
      this.$emit('cartadd',event.target);
    },
    redCart(event){
      if(!event._constructed){
        return false;
      }
      if(this.food.count){
        this.food.count--;
      }
    }
  }
}
</script>

<style lang="stylus">
.cartcontrol
  font-size:0
  .cart-decrease
    display:inline-block
    opacity:1
    transform:translate3d(0,0,0)
    transition:all .3s linear
    .inner
      display:inline-block
      font-size:24px
      padding:6px
      line-height:24px
      color:rgb(0,160,220)
      transform:rotate(0)
      transition:all .3s linear
    &.trans-enter, &.trans-enter-active
      opacity: 0
      transform: translate3d(24px, 0, 0)
      .inner
        transform: rotate(180deg)
    &.trans-leave, &.trans-leave-active
      opacity: 0
      transform: translate3d(24px, 0, 0)
      .inner
        transform: rotate(180deg)
  .cart-count
    display:inline-block
    font-size:10px
    width:12px
    padding-top:6px
    line-height:24px
    text-align:center
    vertical-align:top
    color: rgb(147,153,159)
  .cart-add
    display:inline-block
    font-size:24px
    line-height:24px
    padding:6px
    color:rgb(0,160,220)
</style>
