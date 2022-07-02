<template>
	<div class="swiper-container">
		<div class="swiper-wrapper">
			<div class="swiper-slide" v-for="(item,idx) in imageList" :key="idx">
				<div style="width: 100%;height: 450px; " >
					<img  @click="toDetils(item)" style="width: 100%;height: 400px;" :src="item.url">
				</div>
				<h5>{{item.title}}</h5>
				<div style="text-align: center;">
					<span>{{item.text}}</span>
				</div>
				<div class="btn">
					<b-button-group class="btn1">
						<b-button>{{item.price}}</b-button>
						<b-button @click="toDetils(item)" variant="outline-primary">详情</b-button>
					</b-button-group>
				</div>
			</div>
		</div>
		<!-- 如果需要分页器 -->
		<!-- <div class="swiper-pagination"></div> -->

		<!-- 如果需要导航按钮 -->
		<!-- 	<div class="swiper-button-prev"></div>
		<div class="swiper-button-next"></div> -->

		<!-- 如果需要滚动条 -->
		<!-- <div class="swiper-scrollbar"></div> -->
	</div>
</template>

<script>
	import Swiper from 'swiper'
	import "swiper/css/swiper.min.css"
	import swiperList from '../dataList/swiperList.js'
	import swiperListEn from '../dataList/swiperListEn.js'
	export default {
		data() {
			return {
				imageList: []
			}
		},
		mounted() {
			if (this.$route.params.language == "en") {
				this.imageList = swiperListEn;
			} else if (this.$route.params.language == "cn") {
				this.imageList = swiperList;
			}
			
		},
		updated() {
			new Swiper('.swiper-container', {
				//可选选项，自动滑动
				autoplay: {
					disableOnInteraction: false,
				},
				effect: 'cube',
				speed: 2000,
				// loop: true, // 循环模式选项
				cubeEffect: {
					slideShadows: false,
					shadow: false,
					shadowOffset: 20,
					shadowScale: 1
				},
			})
		},
		methods:{
			toDetils(item) {
				if (this.$route.params.language == "en") {
					this.$router.push({
						name: 'Product',
						params: {
							id: item.id,
							title:item.title,
							url:item.url
						}
					})
				} else if (this.$route.params.language == "cn") {
					this.imageList = swiperList;
					this.$router.push({
						name: 'Product',
						params: {
							id: item.id,
							title:item.title,
							url:item.url
						}
					})
				}
			}
		}

	}
</script>

<style scoped="scoped">
	.swiper-container {
		padding-top: 30px;
		padding-bottom: 60px;
		width: 80%;
		height: 100%;
		margin: 0 auto;
	}

	.swiper-slide {
		height: 95%;
		background-color: rgba(46, 182, 255, 0.05);
		animation: mymove 5s infinite;
		-webkit-animation: mymove 5s infinite;
		/* Safari and Chrome */
	}

	@keyframes mymove {
		0% {
			top: 0px;
		}

		25% {
			top: 25px;
		}

		50% {
			top: -10px;
		}

		75% {
			top: 25px;
		}

		100% {
			top: 0px;
		}
	}

	@-webkit-keyframes mymove

	/* Safari and Chrome */
		{
		0% {
			top: 0px;
		}

		25% {
			top: 200px;
		}

		50% {
			top: 100px;
		}

		75% {
			top: 200px;
		}

		100% {
			top: 0px;
		}
	}


	.swiper-slide img {
		width: 100%;
	}

	.btn {
		width: 100%;
		height: 50%;
		margin: 0 auto;

	}

	.btn1 {
		width: 50%;
		height: 50%;
		margin: 0 auto;
	}

	h5 {
		text-align: center;
	}
</style>
