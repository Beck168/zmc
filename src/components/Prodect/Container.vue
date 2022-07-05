<template>
	<div>
		<el-container style=" border: 1px solid #ffffff;margin: 30px 150px 0 150px ;">
			<el-aside width="200px" style="background-color: rgb(247, 251, 255)">

				<el-menu :default-openeds="['1', '3']" :default-active="defaultActive.toString()">
					<el-menu-item index="-1" @click='switchClassTitle()'>
						<i class="el-icon-menu"></i>
						<span slot="title">{{title}}</span>
					</el-menu-item>
					<el-menu-item v-for="(item,index) in optionsList" :key='index' :index="index.toString()"
						@click='switchClass(index)'>
						{{item}}
					</el-menu-item>

				</el-menu>
			</el-aside>

			<el-container>
				<el-header style="text-align: left; font-size: 18px">
					{{text}}
				</el-header>
				<el-main style="overflow: visible;">
					<!-- 商品数据为空时显示 -->
					<el-empty v-if='productList.length === 0' :description="dataNull"></el-empty>
					<!-- 商品数据为空时显示 -->

					<!-- 商品展示 -->
					<el-row v-if='!detilsBool'>
						<div style='margin-left:150px ;'>
							<el-col :span="8" v-for="(i, index) in productList" :key="index"
								style='width:300px; height: 450px; margin: 10px 10px 10px 30px;'>
								<el-card :body-style="{ padding: '0px' }" shadow="hover" style='height: 100%;'>
									<a style="cursor:pointer">
										<img :src="i.url" style="width: 100%; height: 300px;" class="image"
											@click='toDetils(i)'>
									</a>
									<div style="padding: 14px; ">
										<span class="spanTitle" @click='toDetils(i)'>{{i.title}}</span><br>
										<span id="sc">{{$route.params.language =='cn'? '市场价':'Price'}}：</span>
										<span id="priceStyle">{{i.price}}</span><br><br>
										<span id="text">
											{{i.text}}
										</span>
									</div>
								</el-card>
							</el-col>
						</div>
					</el-row>
					<!-- 商品展示 -->

					<!-- 商品详情 -->
					<el-row v-if='detilsBool'>
						<div id="detils">
							<!-- 商品标题 -->
							<div class="detilsTitle">
								{{detilsTitle}}
							</div>
							<img :src="detilsTitleImg">
							<div style="text-align: center;color: #3A8EE6;margin: 20px;">{{detilsText}}</div>
							<!-- 商品详情图 -->
							<div class="detilsImage">
								<img v-for="(i,idx) in detileImgById " :key="idx" :src="i">
							</div>
						</div>
					</el-row>
					<!-- 商品详情 -->


					<!-- 分页 -->
					<el-row v-if='productList.length != 0'>
						<div class="block" style=' margin: 50px 0 0 500px ;' v-if='!detilsBool'>
							<el-pagination @current-change="handleCurrentChange" :page-size='9'
								:current-page="currentPage" layout="total,  prev, pager, next,jumper " :total="lengths">
							</el-pagination>
						</div>
					</el-row>
					<!-- 分页 -->
				</el-main>
			</el-container>
		</el-container>

		<!-- 返回顶部-->
		<BackTop></BackTop>
	</div>
</template>



<script>
	import container from '../../dataList/ContaninerList.js'
	import detils from '../../dataList/detils.js'
	import containerEn from '../../dataList/ContaninerListEn.js'
	import detilsEn from '../../dataList/detilsEn.js'
	export default {
		data() {
			return {
				defaultActive: "-1", //选中的分类
				title: '', //标题文字
				text: '', //商品分类标题文字
				optionsList: [], //选项文字
				productList: [], //分类商品数据
				currentPage: 1, //当前页数
				lengths: 0, //总商品数
				arrList: [], //展示的商品数
				dataNull: "", //判断是否为空
				detilsImg: [], //详情图片
				detileImgById: [], //某一个商品的详情图
				detilsBool: false, //详情页面是否显示
				detilsTitle: '', //某一个商品的详情标题
				detilsText: '',
				detilsTitleImg: '',
			}
		},
		mounted() {
			// 判断语言
			if (this.$route.params.language == "en") {
				this.detilsImg = detilsEn
				this.arrList = containerEn
				this.title = 'Product';
				this.text = 'Product';
				this.detilsText = 'Product introduction'
				this.dataNull = "No products"
				this.optionsList = ["Essence", "Facial Cleanser", "Toner", "Emulsion cream", "Eye care", "Facial mask",
					"Suit"
				];
			} else if (this.$route.params.language == "cn") {
				this.detilsImg = detils
				this.arrList = container
				this.detilsText = '商品简介'
				this.title = '产品中心'
				this.text = '产品中心';
				this.dataNull = "暂无商品"
				this.optionsList = ["精华液", "洗面奶", "爽肤水", "乳液面霜", "眼部护理", "面膜", "套装", "底妆隔离"];
			}

			this.productList = this.arrList.slice(0, 9)
			this.lengths = this.arrList.length;


			// 判断是否携带id
			if (this.$route.params.id) {
				console.log(this.$route.params.id);
				this.detilsTitle = this.$route.params.title
				this.detilsTitleImg = this.$route.params.url
				this.detilsBool = true
				this.detileImgById = this.detilsImg[this.$route.params.id]
			}
			if (this.$route.query.id) {
				this.switchClass(this.$route.query.id)
			}

		},
		methods: {
			// 计算分页数据
			handleCurrentChange(val) {
				this.productList = this.arrList.slice((val - 1) * 9, 9 * val)
				this.currentPage = val
			},
			// 获取分类商品
			switchClass(idx) {
				this.defaultActive = idx;
				this.detilsBool = false
				let arr = []
				this.arrList.forEach((i) => {
					if (i.type == String(idx)) {
						arr.push(i)
					}
				})
				this.lengths = arr.length
				this.productList = arr.splice(0, 9)
				this.text = this.optionsList[idx]
			},
			// 点击更换分类标题
			switchClassTitle() {
				this.detilsBool = false
				this.lengths = this.arrList.length;
				this.productList = this.arrList.slice(0, 9)

			},
			// 点击显示商品详情
			toDetils(i) {
				this.detilsTitle = i.title
				this.detilsTitleImg = i.url
				this.detilsBool = true
				this.detileImgById = this.detilsImg[i.id]
			},
				
			
		}
	};
</script>

<style>
	.el-header {
		background-color: #B3C0D1;
		color: #333;
		line-height: 60px;
	}

	.el-aside {
		color: #333;
	}

	.time {
		font-size: 13px;
		color: #999;
	}

	.bottom {
		margin-top: 13px;
		line-height: 12px;
	}

	.button {
		padding: 0;
		float: right;
	}

	.image {
		width: 100%;
		display: block;
	}

	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}

	.clearfix:after {
		clear: both
	}

	#priceStyle {
		color: red;
		font-size: 18px;
		font-weight: 700;
	}

	#sc,
	#text {
		color: #999999;
		font-size: 14px;
	}

	#detils {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	.detilsTitle {
		text-align: center;
		border-bottom: 1px solid #999999;
		margin: 40px 0;
		padding: 40px;
		color: #666666;
		font-size: 22px;
	}

	.detilsImage {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	.spanTitle {
		cursor: pointer;
	}

	.spanTitle:hover {

		color: #00aeff;
	}
</style>
