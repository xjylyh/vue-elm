<template>
    <div class="ratings">
        <div class="ratings-content">
            <div class="overview">
                <div class="overview-left">
                    <h1 class="score">{{seller.score}}</h1>
                    <div class="title">综合评分</div>
                    <div class="rank">高于周边商家{{seller.rankRate}}%</div>
                </div>
                <div class="overview-right"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            seller:{
                type:Object
            }
        }
    }
</script>

<style lang="stylus">
.ratings
    position:absolute
    top:174px
    bottom:0
    width:100%
    left:0
    overflow:hidden
    .overview
        display:flex
        padding:18px 0
        .overview-left
            flex:0 0 130px
            width:130px
            border-right:1px solid rgba(7,17,27,0.1)
        .overview-right
            flex:1
            padding-left:24px
</style>