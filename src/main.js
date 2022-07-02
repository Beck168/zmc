import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import components from './components'
import {
	BootstrapVue,
	BootstrapVueIcons
} from 'bootstrap-vue'
import globleMixin from './uitls/index.js'
import  './plugin/vant.js'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(components);
Vue.mixin(globleMixin)
Vue.use(ElementUI);

Vue.config.productionTip = false

//解决路由跳转不返回顶部问题
router.afterEach(() => {
	document.documentElement.scrollTop = 0;
})

new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App)
}).$mount('#app')
