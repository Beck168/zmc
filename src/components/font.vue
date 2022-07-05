<template>
	<div>
		<div id="font">
			<ul class="fontUl">
				<li class="titleTop">{{titleList[0]}}</li>
				<!-- <li class="titleList">{{ $route.params.language == "en"? 'Home':'首页' }}</li> -->
				<li class="titleList" @click="toBrandIntroduction()">{{ $route.params.language == "en"? 'history':'发展历程' }}
				</li>
		
			</ul>
			<ul class="fontUl">
				<li class="titleTop">{{titleList[1]}}</li>
				<li class="titleList" v-for="(i,idx) in text" :key="idx" @click="toDetils(idx)">{{i}}</li>
			</ul>
			<ul class="fontUl">
				<li class="titleTop">{{titleList[2]}}</li>
				<!-- <li><img src="../assets/ewm.jpg" alt=""></li> -->
			</ul>
		</div>
		<div style="text-align: center;background-color:#155083;color: #FFF;line-height: 30px;">
			&copy;2022 ZMC. All rights reserved
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				titleList: [],
				text: [],
			}
		},
		mounted() {
			if (this.$route.params.language == "en") {
				this.titleList = ['About us', "Product", "Pay attention to us"];
				this.text = ["Essence", "Facial Cleanser", "Toner", "Emulsion cream", "Eye care", "Facial mask",
					"Suit"
				];
			} else if (this.$route.params.language == "cn") {
				this.titleList = ['	关于', "产品中心", "关注我们"];
				this.text = ["精华液", "洗面奶", "爽肤水", "乳液面霜", "眼部护理", "面膜", "套装", "底妆隔离"];
			}
		},
		methods: {
			toDetils(idx) {
				// 判断手机端还是PC端
				let i;
				if (this._isMobilde()) {
					i = this.$route.params.language == 'cn' ? idx + 1 : idx
				}

				window.location.href = `/Product/${this.$route.params.language}?id=${i ? i : idx}`;
				// this.$router.push({
				// 	path: `/Product/${this.$route.params.language}`,
				// 	query: {
				// 		id: idx +1
				// 	}
				// })
			},
			toBrandIntroduction() {
				this.$router.push({
					path: `/BrandIntroduction/${this.$route.params.language}`,
				})
			}
		}

	}
</script>
<style scoped>
	#font {
		margin-top: 5%;
		padding: 3% 10%;
		box-sizing: border-box;
		display: flex;
		justify-content: space-around;
		background-color: #0F375A;
		color: #FFFFFF;
	}

	.titleTop {
		margin: 10% 0;
		font-size: 22px;
		text-align: center;
	}

	li {
		text-align: center;
		line-height: 28px;
		font-size: 16px;
	}

	.titleList {
		cursor: pointer;
	}

	.titleList:hover {
		color: #c6002e;
	}

	@media screen and (min-width:1280px) {
		.titleTop {
			border-bottom: #2792d9 solid 1px;
		}
	}

	@media screen and (max-width: 720px) {
		#font {
			flex-direction: column;
		}

		.titleList {
			line-height: 26px;
		}

		.titleTop {
			margin: 5% 0;
			font-size: 22px;
			text-align: center;
		}

		.fontUl {
			border-bottom: #2792d9 solid 2px;
			padding-bottom: 5%;
		}
	}
</style>
