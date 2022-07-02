<template>
	<div>
		<NavBar :idxNum='3'></NavBar>
		<!-- 过度图 -->
		<b-img src="http://zmcmall.com/Upload/5e86e89d8a22a.jpg" fluid alt="Responsive image"></b-img>

		<div id="steps">
				<h6>发展历程</h6>
				<div style="padding-left:10px ; box-sizing: border-box;" >
					<el-steps direction="vertical" :active="index" >
						<el-step v-for="(item,index) in StepsList" :key="index" :title="item.time" >
							<div slot="description" style="font-size: 14px;" v-for="(i,idx) in item.text" :key="idx">{{i}}</div>
						</el-step>
					</el-steps>
				</div>
		</div>
		
		<font></font>
		<BackTop></BackTop>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				index:0,
				StepsList: [],
			}
		},
		mounted() {
			//判断语言
			if (this.$route.params.language == "cn") {
				document.title = "品牌介绍";
				this.StepsList = [
					{
					time: "2000年",
					text:["前身公司美植集团在天津成立。","创立植美村品牌。"]
					},
					{
					time: "2003年",
					text:[" 植美村被评为中国美容界十大专业美容院最受欢迎品牌。",]
					},
					{
						time:'2004年',
						text:["创立泉润品牌。","植美村提出黄金单品战略，在激烈竞争中快速抢占市场。"]
					},
					{
						time:'2006年',
						text:["签约香港著名影星杨恭如小姐作为泉润形象大使。"]
					},
					{
						time:'2007年',
						text:[" 重金签约当红一线的翁虹小姐代言植美村。"]
					},
					{
						time:'2008年',
						text:["泉润签约著名影视明星陈红女士为形象代言人。"]
					},
					{
						time:'2009年',
						text:["获“三年免检企业”光荣称号。"]
					},
					{
						time:'2010年 ',
						text:["植美村提出极致大单品战略1.0，以分龄眼霜开启分龄护肤时代，引发行业模仿。","大额广告投入《浙江卫视》、《我是大美人》等媒体助力植美村品牌。"]
					},
					{
						time:'2011年',
						text:["子公司广州通盛达化妆品有限公司正式成立。"]
					},
					{
						time:'2012年',
						text:["成功签约知名主持人何炅先生为泉润品牌形象代言人。","幸美股份获得广东省高新技术企业称号。"]
					},
					{
						time:'2013年',
						text:["黄圣依小姐签约正式成为植美村代言人。"," 被授予“中国著名品牌”称号。"]
					},
					{
						time:'2014年',
						text:["广东幸美化妆品股份有限公司在新三板上市，股票代码：830929。"," 幸美股份正式成立717幸美股份消费者日。","植美村提出极致大单品战略2.0，聚焦品类，推出7小时不脱妆BB霜成为底妆品类销量TOP 1。"," 投放浙江卫视好声音钻石级广告，荣获年度“标王”称号。"]
					},
					{
						time:'2016年 ',
						text:["植美村签约国民人气女神关晓彤，品牌开启年轻化战略。","邀约演艺影视当红港台大咖王祖蓝，出席植美村新品发布会。","七迹懒人素颜霜成为面霜类目TOP3，7小时不脱妆BB霜成为底妆类目TOP2。","矿泉温和卸妆喷雾成为卸妆类目TOP5，告别瑕疵气垫修颜霜全网销售TOP3。","子公司广州爱洛生物科技有限公司成立。"]
					},
					{
						time:'2017年',
						text:[" 签约Lady Gaga成为泉润新形象代表。","签约人气影星宋妍霏成为植美村新形象代言人。"," 法蕊商标获得法国认证，品牌布局全球化，其高端轻奢香氛系列——女神的权杖上市。"]
					},
					{
						time:'2018年',
						text:[" 植美村极致大单品战略3.0时代开启，品牌全新升级，通过“天然植物力+现代科技力”的融合","为消费者提供最好的不脱妆底妆产品和具有科技研发的天然护肤功效的护肤产品。"]
					},
					{
						time:'2019年',
						text:["幸美提出“品牌化”“数字化”“资本化”三大战略，全面实现用户生命周期管理数字化。"]
					},
				]
			} else if (this.$route.params.language == "en") {
				document.title = "BrandIntroduction";
				this.StepsList = [
					{
					time: "Year 2000",
					text:["Meishi Group, the predecessor company, was established in Tianjin.。","Establish the brand of Zhi Mei Cun。"]
					},
					{
					time: "Year 2003",
					text:[" Zhi Mei Village was rated as the most popular brand of ten professional beauty salons in China's beauty industry.。",]
					},
					{
						time:'Year 2004',
						text:["Establish Quanrun brand。","Zhi Mei Village put forward the gold single product strategy to quickly seize the market in the fierce competition."]
					},
					{
						time:'Year 2006',
						text:["Signed Miss Yang Gongru, a famous Hong Kong movie star, as the ambassador of Quanrun.。"]
					},
					{
						time:'Year 2007',
						text:[" Miss Weng Hong, who signed with a lot of money, spoke on behalf of Zhi Mei Village.。"]
					},
					{
						time:'Year 2008',
						text:["Quanrun signed the famous film and television star Ms. Chen Hong as the image spokesman.。"]
					},
					{
						time:'Year 2009',
						text:["Won the honorable title of 'enterprise exempted from inspection for three years'."]
					},
					{
						time:'Year 2010 ',
						text:["Zhi Mei Village put forward the extreme large single product strategy 1.0, using age-based eye cream to start the age-specific skin care era, causing the industry to imitate.","Large-scale advertisements are invested in media such as 'Zhejiang Satellite TV' and 'I am a Beauty' to help plant the brand of Mei Village."]
					},
					{
						time:'Year 2011',
						text:["Guangzhou Tongshengda Cosmetics Co., Ltd., a subsidiary, was officially established.。"]
					},
					{
						time:'Year 2012',
						text:["He Jiong, a well-known host, was successfully signed as the spokesman of Quanrun brand image.","Xingmei won the title of High-tech Enterprise in Guangdong Province"]
					},
					{
						time:'Year 2013',
						text:["Miss Huang Shengyi signed a contract to become the spokesperson of Zhi Mei Village."," Was awarded the title of 'famous Brand in China'."]
					},
					{
						time:'Year 2014',
						text:["Guangdong Xingmei Cosmetics Co., Ltd. is listed on the new third board, stock code: 830929."," Xingmei shares officially established 717 Xingmei shares Consumer Day.","Zhi Mei Village put forward the extreme large item strategy 2.0, focusing on the category, launching 7-hour makeup-free BB cream to become the sales volume of TOP 1 in the base makeup category."," Put Zhejiang Satellite TV Haosheng Diamond ads and won the title of 'Standard King' of the year."]
					},
					{
						time:'Year 2016 ',
						text:["Zhi Mei Village signed Guan Xiaotong, the goddess of national popularity, and the brand started the strategy of rejuvenation.","Wang Zulan, a popular Hong Kong and Taiwan mogul, was invited to attend the press conference of new products in Zhi Mei Village.。","Seven traces of lazyman makeup cream has become a category of face cream TOP3,7 hour non-makeup BB cream has become a basic makeup category TOP2.","Mineral spring mild makeup remover spray has become a makeup remover category TOP5, farewell to defective air cushion makeup cream network-wide sales TOP3.","Subsidiary Guangzhou Ailuo Biotechnology Co., Ltd established"]
					},
					{
						time:'Year 2017',
						text:[" Sign Lady Gaga to become the representative of Quanrun's new image.","Signed popular movie star Song Yanfei has become the new image spokesperson of Zhi Mei Village."," The French trademark has been certified in France, the brand layout is global, and its high-end light luxury fragrance series-the goddess's scepter is on the market."]
					},
					{
						time:'Year 2018',
						text:[" Zhi Mei Village extreme large single product strategy 3.0 era opened, brand new upgrade, through the integration of 'natural plant power + modern science and technology power'","To provide consumers with the best makeup-free products and skin care products with natural skin care efficacy developed by science and technology."]
					},
					{
						time:'Year 2019',
						text:["Xingmei put forward three strategies of 'branding', 'digitization' and 'capitalization' to realize the digitization of user life cycle management in an all-round way."]
					},
				]
			}
			this.index = this.StepsList.length;
		}
	}
</script>

<style scoped>
	#steps {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		
	
	}

</style>
