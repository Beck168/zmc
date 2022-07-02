<template>
	<div>
		<NavBar :idxNum='2'></NavBar>


		<div id="bg">
			<b-container class="bv-example-row container" style='padding: 0 10%; box-sizing: border-box;'>
				<b-row v-if="spinner">
					<div style="margin-bottom: 10%;">
						<b-spinner class="spinner" variant="primary" label="Text Centered"></b-spinner>
					</div>

				</b-row>
				<!-- 查询结果 -->
				<b-row v-if="alertboll">
					<!-- 查询结果显示框 -->
					<div id="fwmAlert" :class="fwmClass">
						<div>
							<b-alert show :variant="alertTitle" class="b-alert">{{alertTitle}}
								<b-icon :icon="alertNum==1?'check-circle':'exclamation-circle-fill'"></b-icon>
							</b-alert>
						</div>
						<!-- 结果 -->
						<b-card-text class="msg">{{Emsg}}</b-card-text>
					</div>
				</b-row>
				<!-- 查询按钮 -->
				<b-row v-if="flag">
					<b-input-group class="mt-3">
						<b-form-input v-model="inputFwm"
							:placeholder="bool?'Please enter a verification code':'请输入验证码'"></b-form-input>
						<b-input-group-append>
							<b-button variant="primary" @click="query(inputFwm)">{{bool?'Query':'查询'}}</b-button>
						</b-input-group-append>
					</b-input-group>
				</b-row>
				<!-- 手动输入按钮 -->
				<b-row v-if="ManualBool">
					<b-button style="margin: 5% auto;" variant="primary" @click="change()">{{bool?'Manual input':'手动输入'}}</b-button>
				</b-row>
			</b-container>

		</div>

		<font></font>
	</div>
</template>

<script>
	import axios from "axios";
	import md5 from "js-md5";

	export default {
		data() {
			return {
				variantType: '',
				fwmClass: '',
				alertboll: false,
				bool: true,
				Status: '',
				flag: true,//输入框显示
				inputFwm: '', //输入框内容
				spinner: false, //请求等待指示
				alertTitle: '',
				alertNum: '',
				ManualBool:false,//手动输入按钮
			}
		},
		mounted() {
			// this.makeToast();
			if (this.$route.params.language == "en") {
				document.title = "SecurityCheck";
				this.bool = true;
			} else if (this.$route.params.language == "cn") {
				document.title = "防伪查询";
				this.bool = false;
			}
			// 检测是否是扫码验证
			if (this.$route.query.fwm) {
				this.flag = false;
				this.query(this.$route.query.fwm);
				this.ManualBool = true;
			}
		},
		methods: {
			/**
			 * 自动查询时点击手动查询显示输入框
			 */
			change(){
				this.flag = true;
				this.ManualBool = false;
				this.alertboll = false;
			},
			// 点击查询按钮
			query(inputFwm) {
				let text;
				if(inputFwm == '' || inputFwm == null){
					this.$route.params.language == "cn" ? text = "验证码不能为空！" : text = 'CAPTCHA cannot be empty!';
					this.makeToast("danger",text)
					this.inputFwm = ''
					return;
				}else if((/[\u4e00-\u9fa5]/g).test(inputFwm)){
					this.$route.params.language == "cn" ? text = "验证码请勿携带汉字！" : text = 'CAPTCHA cannot be empty!';
					this.makeToast("danger",text)
					this.inputFwm = ''
					return;
				}else if(!(/^[0-9]*$/g.test(inputFwm))){
					this.$route.params.language == "cn" ? text = "请输入数字！" : text = 'CAPTCHA cannot be empty!';
					this.makeToast("danger",text)
					this.inputFwm = ''
					return;
				}
				this.queryFw(inputFwm);
			},

			// 弹窗触发方法
			makeToast(variant,text) {
				const h = this.$createElement
				const vNodesMsg = h(
					'p', {
						class: ['text-center', 'mb-0']
					},
					[
						h('b-spinner', {
							props: {
								type: 'grow',
								small: true
							}
						}),
						text?text:variant,
						h('b-spinner', {
							props: {
								type: 'grow',
								small: true
							}
						})
					]
				)
				this.$bvToast.toast([vNodesMsg], {
					title: variant,
					toaster: 'b-toaster-top-center',
					variant: variant,
					// solid: true,
					Emsg: ''
				})
			},

			// 查询防伪方法
			queryFw(fw) {
				this.spinner = true;
				this.alertboll = false
				let fwm = fw;
				let code = "LELZSHS27";
				let Key = "66WFrRWaKK";
				let ip = "192.168.1.115";
				let sign = md5(fwm + Key).toUpperCase();

				axios
					.get(" http://tyfwjk.ty-315.com/api/tyfw/QueryA", {
						params: {
							fwm,
							code,
							sign,
							ip,
						},
					})
					.then((res) => {
						this.spinner = false;
						this.alertboll = true;
						if (res.data.Result == "0") {
							this.alertNum = 1
							this.fwmClass = "fwmClassSuccess";
							this.Emsg =
								`The item you inquired is genuine, and the security code is ${res.data.FWCode}, please feel free to use it`;
							// this.Cmsg = `您好,您所查询的是正品,防伪码为${res.data.FWCode}请放心使用!`;
						} else if (res.data.Result == "1" || res.data.Result == "2") {
							this.alertNum = 2
							this.fwmClass = "fwmClassWarning";
							this.Emsg =
								`The security code you inquired is ${res.data.FWCode}, the security code has been queried in${res.data.FirstSearchTime}, beware of fake!`;
							// this.Cmsg = `您好,您所查询的防伪码为${res.data.FWCode},该防伪码在${res.data.FirstSearchTime}已被查询,谨防假冒!`
						} else if (
							res.data.Result == "9" ||
							res.data.Result == "4" ||
							res.data.Result == "10" ||
							res.data.Result == "11"
						) {
							this.alertNum = 3
							this.fwmClass = "fwmClassError";
							//  this.Cmsg = res.data.ResultMsg
							this.Emsg = `The security code you inquired does not exist!`;
						} else if (res.data.Result == "20") {
							this.alertNum = 3
							this.fwmClass = "fwmClassError";
							// this.Cmsg = res.data.ResultMsg
							this.Emsg = `Your query is too frequent, please try again later!`;
						} else if (res.data.Result == "8") {
							this.alertNum = 3
							this.fwmClass = "fwmClassError";
							//  this.Cmsg = res.data.ResultMsg
							this.Emsg = `Security code can not be empty!`;
						}
						this.alertTitle = this.alertNum == 1 ? 'success' : (this.alertNum == 2 ? 'warning' : 'danger')
						this.alertboll = true
						this.makeToast(this.alertTitle)
					});
			},
		}
	}
</script>

<style scoped>
	#bg {

		width: 100%;
		height: 100vh;
		background-image: url(../assets/wallhaven-k7q9m7_1920x1080.png);
	}

	.container {
		position: relative;
		top: 20%;

	}

	#fwmAlert {
		width: 100%;
		text-align: center;
		border-radius: 0.5rem;
		padding: 0.5rem;

	}

	.fwmClassSuccess {
		/* background: #caeed2; */
		background-color: rgb(202, 238, 210);

	}

	.fwmClassWarning {
		background: rgb(255, 229, 156);

	}

	.fwmClassError {
		/* background: rgb(255, 152, 152); */
		background-color: rgb(255, 152, 152);
		;

	}

	.b-alert {
		box-shadow: 0px 0px 1px 0.5px rgb(0, 0, 0) inset
	}

	.spinner {
		position: absolute;
		left: 50%;
	}
</style>
