import Vue from 'vue'
import Router from 'vue-router'
import goods from '../components/goods/goods'
import evaluate from '../components/evaluate/evaluate'
import seller from '../components/seller/seller'
Vue.use(Router)

var router = new Router({
  mode:'history',
  linkActiveClass: 'actives',
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
router.push('/goods');
export default router
