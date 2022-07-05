<template>
	<div class="swiper-container">
		<div class="swiper-wrapper">
			<div class="swiper-slide" v-for="(item,idx) in imageList" :key="idx">
				<div style="width: 100%; ">
					<b-img-lazy  style="width: 100%;height: 500px;cursor: pointer;" :src="item.url" @click="toDetils(item)"></b-img-lazy>
				</div>
				<h5 class="titleText">{{item.title}}</h5>
				<div style="text-align: center;">
					<span>{{item.text}}</span>
				</div>
				<div class="btn">
					<b-button-group class="btn1">
						<b-button>{{item.price}}</b-button>
						<b-button variant="outline-primary" @click="toDetils(item)">{{btnText}}</b-button>
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
				imageList: [],
				btnText:''
			}
		},
		mounted() {


			if (this.$route.params.language == "en") {
				this.btnText = 'Instant';
				this.imageList = swiperListEn;
			} else if (this.$route.params.language == "cn") {
				this.btnText = '了解详情';
				this.imageList = swiperList;
			}
		},
		updated() {
			// 轮播图初始化
			new Swiper('.swiper-container', {
				// freeMode: true,//自由模式
				slideToClickedSlide: true,
				effect: 'coverflow',
				slidesPerView: 3,
				centeredSlides: true,
				//可选选项，自动滑动
				autoplay: {
					disableOnInteraction: false,
				},
				// loop: true, // 循环模式选项
				coverflowEffect: {
					rotate: 0,
					stretch: -150,
					depth: 300,
					modifier: 1,
					slideShadows: false
				},
				// 如果需要分页器
				pagination: {
					el: '.swiper-pagination',
				},

				// 如果需要前进后退按钮
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},

				// 如果需要滚动条
				// scrollbar: {
				// 	el: '.swiper-scrollbar',
				// },
			})

		},
		methods: {
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

<style scoped>
	.swiper-container {
		padding-top: 30px;
		padding-bottom: 30px;
		width: 1200px;
		height: 700px;
		margin: 0 auto;
	}

	.swiper-slide {
		width: 360px;
		height: 100%;
		box-shadow: 0px 0px 10px 1px #c6c6c6;
	}

	.swiper-slide img {
		width: 100%;
		margin: 0 auto;
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
		cursor: pointer;
		
	}
	.titleText:hover{
		color: #00aeff;
	}
</style>
