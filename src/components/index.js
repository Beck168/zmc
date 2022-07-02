// 引入
import Font from './font.vue';
import BackTop from './backTop.vue';
import lbt from './Swipers.vue'
import NavBar from './NavBar.vue';
import swiperGrope from "./swiperGrope.vue"
export default {
  install(Vue) {
  // 注册全局组件
    Vue.component("lbt",lbt)
    Vue.component("NavBar",NavBar)
	Vue.component("swiperGrope",swiperGrope)
    Vue.component('Font', Font)
    Vue.component("BackTop",BackTop)
  }
}