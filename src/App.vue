<template>
  <div id="app">
    <v-headers></v-headers>
    <div class="tab">
      <div class="tab_items">
        <router-link to="/goods">
          商品
        </router-link>
      </div>
      <div class="tab_items">
        <router-link to="/evaluate">
          评价
        </router-link>
      </div>
      <div class="tab_items">
        <router-link to="/seller">
          商家
        </router-link>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import header from './components/header/header'
require('../static/csspub/reset.css');
export default {
  components:{
    'v-headers':header
  }
}
</script>

<style>
#app {
  width: 100%;
  overflow: hidden;
}
.tab{width:100%;display: flex;height: 40px;border-bottom: 1px solid rgba(7,17,27,0.1);}
.tab_items{flex:1;text-align: center;line-height: 40px;}
.tab_items>a{display: block;width:100%;height:100%;font-size: 14px;color:rgb(77,85,93);}
a.actives{color:rgb(240,20,20);}
</style>
