<template>
	<div class="navbars">
		<b-navbar toggleable="lg" type="dark" variant="Light" class="navbarBg">
			<div class="toggle">
				<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
			</div>
			<b-collapse id="nav-collapse" is-nav :class="flag?'':'navCollapse'">
				<b-navbar-nav class="navbar">
					<b-nav-item href="#" id="item" v-for="(item,idx) in list" :key="idx" @click="changeStyle(idx)">
						<router-link :to="item.path"> <span :class="idx == idxNum?'changeStyle':''">{{item.name}}</span>
						</router-link>
					</b-nav-item>
				</b-navbar-nav>
			</b-collapse>
		</b-navbar>
	</div>
</template>

<script>
	export default {
		props: {
			idxNum: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				flag: false,
				list: "",
				num: this.idxNum
			}
		},
		mounted() {
			this.num = localStorage.getItem("idx")
			this.language();
			console.log(localStorage.getItem("idx"));
		},
		methods: {
			language(idx) {
				//判断是哪个语言
				if (this.$route.params.language == "en") {
					this.list = [{
							name: "Home",
							path: '/home/en'
						}, {
							name: "Product",
							path: '/Product/en'
						}, {
							name: "Security check",
							path: '/SecurityCheck/en'
						}, {
							name: "Brand introduction",
							path: '/BrandIntroduction/en'
						}, {
							name: "中文",
							path: '/home/cn'
						}

					]
					if (idx == this.list.length - 1) {
						window.location.href = '/home/en'
					}
				} else if (this.$route.params.language == "cn") {
					this.list = [{
						name: "首页",
						path: '/home/cn'
					}, {
						name: "产品中心",
						path: '/Product/cn'
					}, {
						name: "防伪查询",
						path: '/SecurityCheck/cn'
					}, {
						name: "品牌介绍",
						path: '/BrandIntroduction/cn'
					}, {
						name: "English",
						path: '/home/en'
					}, ]
					if (idx == this.list.length - 1) {
						window.location.href = '/home/cn'
					}
				}

				if (this._isMobilde()) {
					this.flag = true
				} else {
					this.flag = false
				}

			},
			changeStyle(idx) {
				this.language(idx);

				// 	if (idx == this.list.length - 1) {
				// 		this.num = 0
				// 		localStorage.setItem("idx",0)
				// 		return;
				// 	}
				// 	this.num = idx;
				// 	localStorage.setItem("idx",idx)
			}
		}
	};
</script>

<style scoped>
	.navbars{
		width: 100vw;
		position: fixed;
		top: 0;
		z-index: 999;
	}
	
	.navCollapse {
		margin: 0 15rem;
	}

	.navbar {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	span {
		text-align: center;
		color: black;
		font-size: 1.2rem;
	}
/* 
	#item {
		padding: 0 15%;
	}
 */
	span:hover {
		color: rgb(0, 110, 255);
	}

	.changeStyle {
		color: rgb(0, 110, 255);
	}

	.navbarBg {
		background: white !important;
	}

	.toggle {
		background: rgba(129, 129, 129, .5);
		border-radius: 10%;
	}
	@media screen and (max-width:720px) {
		.navbars{
			width: 100vw;
			position: fixed;
			top: 0;
			z-index: 999;
		}
	}
</style>
