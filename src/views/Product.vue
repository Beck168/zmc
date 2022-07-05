<template>
	<div>
		<!-- 导航栏 -->
		<NavBar :idxNum='1'></NavBar>
		<b-img src="https://s2.loli.net/2022/06/28/GoKWR3kq4iuEzd9.png" fluid ></b-img>
		<!-- 分类商品与详情 -->
		<Container v-if='!flag'></Container>
		<ContainerPhone v-if="flag"></ContainerPhone>
		
		<BackTop></BackTop>
		<font></font>
	</div>
</template>

<script>
	import Container from '../components/Prodect/Container.vue'
	import ContainerPhone from '../components/Prodect/ContaninerPhone.vue'
	export default {
		data() {
			return {
				flag: '',
			}
		},
		components:{
			Container,
			ContainerPhone
		},

		mounted() {
			document.documentElement.scrollTop = 0;
			// 判断手机端还是PC端
			if (this._isMobilde()) {
				this.flag = true
			} else {
				this.flag = false
			}
			if (this.$route.params.language == "en") {
				document.title = "Product";

			} else if (this.$route.params.language == "cn") {
				
				document.title = "产品中心";
			}
		}
	}
</script>

<style>

</style>
