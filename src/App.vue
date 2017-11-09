<template>
  <div id="app">
    <v-headers :seller="seller"></v-headers>
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
	data(){
		return {
			seller:{}
		};
	},
	created(){
		this.$http.get('/api/seller').then((response)=>{
			response = response.body;
			if(response.errno==0){
				this.seller = response.data;
				console.log(this.seller);
			}
		})
	},
  components:{
    'v-headers':header
  }
}
</script>

<style  lang="stylus" rel="stylesheet/stylus">
@import "./common/stylus/mixin.styl"
.tab
	display: flex
	width: 100%
	height: 40px
	line-height: 40px
	border-1px(rgba(7, 17, 27, 0.1))
	.tab_items
		flex: 1
		text-align: center
		& > a
			display: block
			font-size: 14px
			color: rgb(77, 85, 93)
			&.actives
				color: rgb(240, 20, 20)
</style>
