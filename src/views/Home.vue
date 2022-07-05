<template>
	<div>
		<!-- 导航栏 -->
		<nav-bar :idxNum='0'></nav-bar>
		<!-- 轮播图 -->
		<lbt></lbt>
		<b-container class="bv-example-row">
			<!-- 分区标题 -->
			<b-row class="row" align-v="center" align-h="center">
				<div class="horizontal"></div>
				<h3 style="color:rgb(31, 128, 255)">{{starText}}</h3>
				<div class="horizontal"></div>
			</b-row>

		</b-container>
		<!-- 明星产品轮播图 -->
		<swiperGrope v-if="!flag"></swiperGrope>
		<swiperPhone v-if="flag"></swiperPhone>

		<b-container class="bv-example-row">
			<!-- 分区标题 -->
			<b-row class="row" align-v="center" align-h="center">
				<div class="horizontal"></div>
				<h3 style="color:rgb(31, 128, 255)">{{popularText}}</h3>
				<div class="horizontal"></div>
			</b-row>
			<b-row align-v="center" align-h="center">
				<Popular></Popular>
			</b-row>
		</b-container>
		<!-- 过度图 -->
		<b-img-lazy src="http://zmcmall.com/Upload/5e86e89d8a22a.jpg" fluid alt="Responsive image"></b-img-lazy>

		<BackTop></BackTop>
		<font></font>
	</div>
</template>

<script>
	import Popular from '../components/home/Popular.vue'
	import swiperPhone from '../components/swiperPhone.vue'

	export default {
		data() {
			return {
				flag: false,
				starText: '',
				popularText: ''
			}
		},
		components: {
			Popular,
			swiperPhone,
		},

		mounted() {
			if (this.$route.query.fwm) {
				this.$router.push({
					path: `/SecurityCheck/${this.$route.params.language}`,
					query: {
						fwm: this.$route.query.fwm
					},
				});
			}
			// 判断手机端还是PC端
			if (this._isMobilde()) {
				this.flag = true
			} else {
				this.flag = false
			}
			//判断语言
			if (this.$route.params.language == "en") {
				document.title = "Home";
				this.starText = 'Star products'
				this.popularText = 'Popular products'
			} else if (this.$route.params.language == "cn") {
				document.title = "首页";
				this.starText = '明星单品'
				this.popularText = '人气单品'
			}
		}
	};
</script>

<style scoped>
	.row {
		margin: 2rem 0;
		text-align: center;
	}

	.horizontal {
		margin: 0 2rem;
		width: 18rem;
		border: 1px solid rgb(31, 128, 255);
	}
</style>
