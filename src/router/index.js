import Vue from 'vue'
import Router from 'vue-router'
import goods from '../components/goods/goods'
import evaluate from '../components/evaluate/evaluate'
import seller from '../components/seller/seller'
Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
        path:'/goods',
        component:goods
    },
    {
        path:'/evaluate',
        component:evaluate
    },
    {
        path:'/seller',
        component:seller
    }
  ]
})
