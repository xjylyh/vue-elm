<template>
<div class="goods" id="goods">
    <div class="menu-wrapper" ref="menuWrapper">
        <ul>
            <li v-for="(items,index) in goods" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
                <span class="text">
                    <span v-show="items.type>0" class="icon" :class="classMap[items.type]"></span>{{items.name}}
                </span>
            </li>
        </ul>
    </div>
    <div class="foods-wrapper" ref="foodWrapper">
        <ul>
            <li v-for="items in goods" class="food-list food-list-hook">
                <h1 class="title">{{items.name}}</h1>
                <ul>
                    <li @click="selectFood(foods,$event)" v-for="foods in items.foods" class="food-item">
                        <div class="icon">
                            <img width="57" height="57" :src="foods.icon" alt="">
                        </div>
                        <div class="content">
                            <h2 class="name">{{foods.name}}</h2>
                            <p class="desc">{{foods.description}}</p>
                            <div class="extra">
                                <span class="count">月售{{foods.sellCount}}份</span><span>好评率{{foods.rating}}%</span>
                            </div>
                            <div class="price">
                                <span class="now">￥{{foods.price}}</span>
                                <span class="old" v-show="foods.oldPrice">￥{{foods.oldPrice}}</span>
                            </div>
                            <div class="cartcontrol-wrapper">
                                <cartcontrol @cartadd="_drop" :food="foods"></cartcontrol>
                            </div>
                        </div>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
    <shopcart ref="shopcart" :selectFoods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
    <food :food="selectedFood" ref="food"></food>
</div>
</template>

<script>
import Vue from 'vue';
import BScroll from "better-scroll"
import shopcart from "@/components/shopcart/shopcart.vue"
import cartcontrol from "@/components/cartcontrol/cartcontrol.vue"
import food from "@/components/food/food.vue"
const ERR_OK = 0;
    export default {
        props:{
            seller:{
                type:Object
            }
        },
        data(){
            return {
                goods:[],
                listHeight:[],
                scrollY:0,
                selectedFood:{}
            }
        },
        created(){
            this.classMap = ['decrease','discount','special','invoice','guarantee'];
            this.$http.get('/api/goods').then((response)=>{
                response = response.body;
                if(response.errno === ERR_OK){
                    this.goods = response.data;
                    this.$nextTick(()=>{
                        this._initScroll();
                        this._calculateHeight();
                    })
                }
            })
        },
        mounted(){
            this.$on('mabi',function(el){
                console.log(el);
            })
        },
        computed: {
            currentIndex() {
                for (let i = 0; i < this.listHeight.length; i++) {
                    let height1 = this.listHeight[i];
                    let height2 = this.listHeight[i + 1];
                    if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
                        return i;
                    }
                }
                return 0;
            },
            selectFoods(){
                let foods = [];
                this.goods.forEach((good)=>{
                    good.foods.forEach((food)=>{
                        if(food.count){
                            foods.push(food);
                        }
                    })
                }) 
                return foods;
            } 
        },
        methods:{
            selectFood(food,event){
                if(!event._constructed){
                    return;
                }
                console.log(food);
                this.selectedFood = food;
                this.$refs.food.show();
            },
            _drop(target){
                //体验优化，异步执行下落动画
                this.$nextTick(()=>{
                    this.$refs.shopcart.drop(target);
                })
            },
            selectMenu(index,event){
                if(!event._constructed){
                    return;
                }
                let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
                let ele = foodList[index];
                this.foodsScroll.scrollToElement(ele);
            },
            _initScroll(){
                this.menuScroll = new BScroll(this.$refs.menuWrapper,{
                    click:true
                });
                this.foodsScroll = new BScroll(this.$refs.foodWrapper,{
                    click:true,
                    probeType:3
                });
                this.foodsScroll.on('scroll',(pos)=>{
                    this.scrollY = Math.abs(Math.round(pos.y));
                })
            },
            _calculateHeight() {
                let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
                let height = 0;
                this.listHeight.push(height);
                for (let i = 0; i < foodList.length; i++) {
                    let item = foodList[i];
                    height += item.clientHeight;
                    this.listHeight.push(height);
                }
            }
        },
        components:{
            shopcart,cartcontrol,food
        }
    }
</script>

<style lang="stylus">
@import "../../common/stylus/mixin.styl"
.goods
    position:absolute
    width:100%
    top:174px
    bottom:46px
    display:flex
    overflow: hidden
    .menu-wrapper
        flex:0 0 80px
        width:80px
        background:#f3f5f7
        .current
            position:relative
            z-index:10
            margin-top:-1px
            background-color:#fff
            font-weight:700
            .text
                border-none()
        .menu-item
            display:table
            width:56px
            height:54px
            line-height:14px
            padding:0 12px       
            .text
                display:table-cell
                font-size:12px
                width:56px
                border-1px(reba(7,17,27,0.1))
                vertical-align:middle
                .icon
                    display: inline-block
                    width: 12px
                    height :12px
                    margin-right :2px
                    background-size:12px
                    vertical-align :top
                    background-repeat:no-repeat
                    &.decrease
                        bg-image('decrease_3')
                    &.discount
                        bg-image('discount_3')
                    &.guarantee
                        bg-image('guarantee_3')
                    &.invoice
                        bg-image('invoice_3')
                    &.special
                        bg-image('special_3')
    .foods-wrapper
        flex:1
        background:#fff
        .title
            padding-left:14px
            height:26px
            line-height :26px
            border-left:2px solid #d9dde1
            font-size:12px
            color:rgb(147,153,159)
            background-color:#f3f5f7
        .food-item
            display:flex
            margin:18px 18px 0 18px
            padding-bottom:18px
            border-1px(rgba(7,17,27,0.1))
            &:last-child
                border-none()  
            .icon
                flex:0 0 57px
                margin-right:10px
            .content
                flex:1
                .name
                    margin:2px 0 8px 0
                    height:14px
                    line-height:14px
                    font-size:14px
                    color:rgb(7,17,27)
                .desc,.extra
                    line-height :10px
                    font-size:10px
                    color:rgb(147,153,159)
                .desc
                    line-height :12px
                    margin-bottom:8px    
                .extra
                    .count
                        margin-right:12px
                .price
                    font-weight:700
                    line-height :24px
                    .now
                        margin-right:8px
                        font-size:14px
                        color:rgb(240,20,20)
                    .old
                        text-decoration:line-through
                        font-size:10px
                        color:rgb(147,153,159)
                .cartcontrol-wrapper
                    position:absolute
                    right:0
                    bottom:12px
                        

</style>