<template>
	<div id="prodect">
		<van-tree-select height="130vw" :items="items" :main-active-index.sync="active" @click-nav="clickNav">
			<template #content>
				<div v-if="!detilsBool">
					<van-card v-for="(i,index) in productList" :key="index" @click='toDetils(i)' :price="i.price"
						:desc="i.text" :title="i.title" :thumb="i.url" currency='' />
				</div>
				<div v-if="detilsBool">
					<div v-if='productList.length != 0'>
						<div class="detilsTitle">
							{{detilsTitle}}
						</div>
						<van-image :src="detilsTitleImg" />
						<div style="text-align: center;color: #3A8EE6;margin: 20px;">{{detilsText}}</div>
						<van-image v-for="(item,index) in detileImgById" :key="index" :src="item" />
					</div>
				</div>

				<van-empty v-if='productList.length == 0' class="custom-image"
					image="https://img01.yzcdn.cn/vant/custom-empty-image.png" :description="dataNull" />
			</template>
		</van-tree-select>
	</div>

</template>

<script>
	import contaninerList from '../../dataList/ContaninerList.js'
	import detils from '../../dataList/detils.js'
	import contaninerListEn from '../../dataList/ContaninerListEn.js'
	import detilsEn from '../../dataList/detilsEn.js'
	export default {
		data() {
			return {
				active:0,
				items: [], //分类文字
				cardList: [], //分类商品数据
				detilsBool: false,
				detileImgById: [],
				detilsImg: [],//详情页图片数组
				detilsTitle: '',//详情页标题
				detilsTitleImg: '',//详情页第一张主图
				detilsText: '',//详情页文字
				dataNull:'',//商品为空时
				productList: []

			};
		},
		mounted() {
			if (this.$route.params.language == "en") {
				this.detilsImg = detilsEn
				this.cardList = contaninerListEn
				this.detilsText = 'Product introduction'
				this.dataNull = "No products"
				this.items = [{
					text: 'Essence'
				}, {
					text: 'Facial Cleanser'
				}, {
					text: 'Toner'
				}, {
					text: 'Emulsion cream'
				}, {
					text: 'Eye care'
				}, {
					text: 'Facial mask'
				}, {
					text: 'Suit'
				}]

			} else if (this.$route.params.language == "cn") {
				this.detilsImg = detils
				this.cardList = contaninerList
				this.detilsText = '商品简介'
				this.dataNull = "暂无商品"
				this.items = [{
					text: '产品中心'
				}, {
					text: '精华液'
				}, {
					text: '洗面奶'
				}, {
					text: '爽肤水'
				}, {
					text: '乳液面霜'
				}, {
					text: '眼部护理'
				}, {
					text: '面膜'
				}, {
					text: '套装'
				}, {
					text: '底妆隔离'
				}]
			}
			this.productList = this.cardList
			// 判断是否携带id
			if(this.$route.params.id){
				this.detilsTitle = this.$route.params.title
				this.detilsTitleImg = this.$route.params.url
				this.detilsBool = true
				this.detileImgById = this.detilsImg[this.$route.params.id]
			}
			if(this.$route.query.id){
				this.clickNav(this.$route.query.id  )
			}
		},
		methods: {
			// 点击显示商品详情
			toDetils(i) {
				this.detilsTitle = i.title
				this.detilsTitleImg = i.url
				this.detilsBool = true
				this.detileImgById = this.detilsImg[i.id]
				console.log(i);
			},
			// 点击左侧导航栏
			clickNav(index) {
				this.active = index;
				this.detilsBool = false;
				if (index != 0) {
					this.detilsBool = false
					let arr = []
					this.cardList.forEach((i) => {
						if (i.type === index - 1) {
							console.log(i.type);
							arr.push(i)
						}
					})
					this.productList = arr
				} else {
					this.productList = this.cardList
				}

			}
		}
	};
</script>

<style scoped>
	#prodect {
		margin-top: 30px;
	}

	.detilsTitle {
		text-align: center;
		border-bottom: 1px solid #999999;
		margin: 40px 0;
		padding: 40px;
		color: #666666;
		font-size: 22px;
	}
</style>
