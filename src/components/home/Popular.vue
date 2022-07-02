<template>
	<div>
		<b-card no-body class="overflow-hidden" id="bcard" style="max-width: 1280px;" v-for="(item,index) in list" :key="index">
			<b-row no-gutters align-v="center" align-h="center">
				<b-col md="6">
					<b-card-img  style="cursor: pointer;" :src="item.url" class="rounded-0" @click="toDetils(item)"></b-card-img>
				</b-col>
				<b-col md="6">
					<b-card-body :title="item.title">
						<b-card-text>
							{{item.text}}
						</b-card-text>
						<b-button variant="outline-primary" @click="toDetils(item)">{{btnText}}</b-button>
					</b-card-body>
				</b-col>
			</b-row>
		</b-card>
	</div>
</template>

<script>
	import PopularProductsEn from '../../dataList/PopularProductsEn.js'
	import PopularProducts from '../../dataList/PopularProducts.js'
	export default{
		data(){
			return{
				list:[],
				btnText:''
			}
		},
		mounted() {
			if (this.$route.params.language == "en") {
				this.list = PopularProductsEn;
				this.btnText = 'Instant'
			}else if(this.$route.params.language == "cn"){
				this.list = PopularProducts;
				this.btnText = "即刻拥有"
			}
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

<style scoped >
	#bcard{
		margin: 5% 0 5% 0;
	}
</style>
