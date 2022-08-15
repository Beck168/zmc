<template>
	<div>
		<b-carousel id="carousel-1" v-model="slide" :interval="4000" controls indicators background="#ababab"
			img-width="1024" img-height="480" style="text-shadow: 1px 1px 2px #333;">
			<!-- Slides with image only -->
			<div @click="toDetlis()" >
				<b-carousel-slide  v-for="(item,index) in imglist" :key="index" :img-src="item" ></b-carousel-slide>
			</div>
		</b-carousel>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				slide: 0,
				sliding: null,
				imglist: [
					"http://zmcmall.com/Upload/5e86e89d8a22a.jpg",
					"http://zmcmall.com/Upload/62455ef9911c4.jpg",
					"http://zmcmall.com/Upload/5e265dd9d017f.jpg",

				]
			}
		},
		methods: {
			toDetlis(){
				console.log(1111);
				this.$router.push({path: `/Product/${this.$route.params.language}`})
			}

		}
	}
</script>
