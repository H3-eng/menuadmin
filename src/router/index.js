import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Index from '@/components/Index'
import Powerlist from '@/components/admin/Powerlist'
import Adminlist from '@/components/admin/Adminlist'
import Menusort from '@/components/menu/Menusort'
import Menulist from '@/components/menu/Menulist'
import Menupic from '@/components/menu/Menupic'
/**服务管理 */
import Servesort from '@/components/serve/Servesort'
import Servelist from '@/components/serve/Servelist'
/**添加数据 */
import Insertproct from '@/components/insertdata/Insertproct'
import Insertstore from '@/components/insertdata/Insertstore'
/**数据管理 */
import Storelist from '@/components/data/Storelist'


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Index',
      name: 'Index',
      component: Index,
      children: [
        { path: 'Powerlist', component: Powerlist },
        { path: 'Adminlist', component: Adminlist},
        { path: 'Menusort', component: Menusort},
        { path: 'Menulist', component: Menulist},
        { path: 'Menupic', component: Menupic},
        { path: 'Servesort', component: Servesort},
        { path: 'Servelist', component: Servelist},
        { path: 'Insertstore', component: Insertstore},
        { path: 'Insertproct', component: Insertproct},
        { path: 'Storelist', component: Storelist},
      ]
    },
    {
      path: '/',
      name: 'Login',
      component: Login
    },
  ]
})
