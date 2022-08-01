<template>
  <div>
    <NavBar :idxNum="2"></NavBar>

    <div id="bg">
      <vue-particles
        :class="loginBg"
        :color="Color"
        :particleOpacity="0.7"
        :particlesNumber="100"
        shapeType="circle"
        :particleSize="4"
        linesColor="#8DD1FE"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
      >
      </vue-particles>
      <b-container
        class="bv-example-row container"
        style="padding: 0 10%; box-sizing: border-box"
      >
        <b-row v-if="spinner">
          <div style="margin-bottom: 10%">
            <b-spinner
              class="spinner"
              variant="primary"
              label="Text Centered"
            ></b-spinner>
          </div>
        </b-row>
        <!-- 查询结果 -->
        <b-row v-if="alertboll">
          <!-- 查询结果显示框 -->
          <div
            id="fwmAlert"
            :class="fwmClass"
            style="height: 40vh; font-size: 18px"
          >
            <div>
              <b-alert show :variant="alertTitle" class="b-alert"
                >{{
                  alertTitle == "success"
                    ? "成功"
                    : alertTitle == "warning"
                    ? "注意"
                    : "错误"
                }}
                <b-icon
                  :icon="
                    alertNum == 1 ? 'check-circle' : 'exclamation-circle-fill'
                  "
                ></b-icon>
              </b-alert>
            </div>
            <!-- 结果 -->
            <b-card-text class="msg">{{ bool ? Emsg : Cmsg }}</b-card-text>
          </div>
        </b-row>
        <!-- 查询按钮 -->
        <b-row v-if="flag" style="margin-top: 5vh">
          <b-input-group class="mt-3,Forminput">
            <b-form-input
              style="background-color: transparent; color: #fff"
              v-model="inputFwm"
              :placeholder="
                bool ? 'Please enter a verification code' : '请输入防伪验证码'
              "
            ></b-form-input>
            <b-input-group-append>
              <b-button variant="outline-primary" @click="query(inputFwm)">{{
                bool ? "Query" : "查询"
              }}</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-row>
        <!-- 调用微信扫一扫 -->
        <!-- <b-row v-if="flag">
					<b-button class="scanCodeBtn" variant="primary" @click="scanCode()">
					</b-button>
				</b-row> -->
        <!-- 手动输入按钮 -->
        <!-- <b-row v-if="ManualBool">
					<b-button style="margin: 5% auto;" variant="primary" @click="change()">
						{{bool?'Manual input':'手动输入'}}
					</b-button>
				</b-row> -->
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
			loginBg:"",
			Color:"#39AFFD",
      variantType: "",
      fwmClass: "",
      alertboll: false,
      bool: true,
      Status: "",
      flag: true, //输入框显示
      inputFwm: "", //输入框内容
      spinner: false, //请求等待指示
      alertTitle: "",
      alertNum: "",
      ManualBool: false, //手动输入按钮
      Emsg: "",
      Cmsg: "",
    };
  },
  mounted() {
    this.initData();
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
		if (this._isMobilde()) {
			this.loginBg = "login-bg2";
		}else{
			this.loginBg = "login-bg";
		}
  },
  methods: {
    /**
     * 调用微信扫一扫
     */
    initData() {
      let isInSerach = sessionStorage.getItem("isInSerach");
      let href;
      if (isInSerach) {
        let reg = new RegExp("\\b" + name + "=([^&]*)");
        let r = location.href.match(reg);
        if (r != null) {
          href = unescape(r[1]);
        } else {
          //没有扫码成功
          alert("二维码内容格式不对，请扫描正确的二维码");
        }
        sessionStorage.removeItem("isInSerach");
        // alert(href)
        location.href = href;
      }
    },
    is_weixn() {
      return navigator.userAgent.toLowerCase().indexOf("micromessenger") !== -1;
    },
    scanCode() {
      if (
        !(navigator.userAgent.toLowerCase().indexOf("micromessenger") !== -1)
      ) {
        alert("请用微信打开页面，扫码功能仅支持微信页面");
        return;
      }
      sessionStorage.setItem("isInSerach", "1");
      let hrefStr = location.href;
      let href = hrefStr;
      if (hrefStr.indexOf("?") !== -1) {
        href = hrefStr.split("?")[0];
      }
      location.href = `http://sao315.com/w/api/saoyisao?redirect_uri=${encodeURIComponent(
        href
      )}`;
    },
    //调用微信扫一扫

    /**
     * 自动查询时点击手动查询显示输入框
     */
    change() {
      this.flag = true;
      this.ManualBool = false;
      this.alertboll = false;
    },
    // 点击查询按钮
    query(inputFwm) {
      let text;
      if (inputFwm == "" || inputFwm == null) {
        this.$route.params.language == "cn"
          ? (text = "验证码不能为空！")
          : (text = "CAPTCHA cannot be empty!");
        this.makeToast("danger", text);
        this.inputFwm = "";
        this.alertboll = false;
        return;
      } else if (/[\u4e00-\u9fa5]/g.test(inputFwm)) {
        this.$route.params.language == "cn"
          ? (text = "验证码请勿携带汉字！")
          : (text = "Please do not carry Chinese characters with CAPTCHA!");
        this.makeToast("danger", text);
        this.alertboll = false;
        this.inputFwm = "";
        return;
      } else if (!/^[0-9]*$/g.test(inputFwm)) {
        this.$route.params.language == "cn"
          ? (text = "请输入纯数字组合！")
          : (text = "Please enter a number!");
        this.makeToast("danger", text);
        this.alertboll = false;
        this.inputFwm = "";
        return;
      }
      this.queryFw(inputFwm);
    },

    // 弹窗触发方法
    makeToast(variant, text) {
      const h = this.$createElement;
      const vNodesMsg = h(
        "p",
        {
          class: ["text-center", "mb-0"],
        },
        [
          // h('b-spinner', {
          // 	props: {
          // 		type: 'grow',
          // 		small: true
          // 	}
          // }),
          text
            ? text
            : variant == "success"
            ? "正品"
            : variant == "warning"
            ? "注意"
            : "错误",
          // h('b-spinner', {
          // 	props: {
          // 		type: 'grow',
          // 		small: true
          // 	}
          // })
        ]
      );
      this.$bvToast.toast([vNodesMsg], {
        title:
          variant == "success"
            ? "正品"
            : variant == "warning"
            ? "注意"
            : "错误",
        toaster: "b-toaster-top-center",
        variant: variant,
        // solid: true,
        Emsg: "",
      });
    },

    // 查询防伪方法
    queryFw(fw) {
			
      this.spinner = true;
      this.alertboll = false;
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
            this.alertNum = 1;
            this.fwmClass = "fwmClassSuccess";
						this.Color = '#a8c4ae';
						console.log(this.Color);
            this.Emsg = `The item you inquired is genuine, and the security code is ${res.data.FWCode}, please feel free to use it`;
            this.Cmsg = `您好,您所查询的是正品,防伪码为${res.data.FWCode}请放心使用!`;
          } else if (res.data.Result == "1" || res.data.Result == "2") {
            this.alertNum = 2;
            this.fwmClass = "fwmClassWarning";
						this.Color = '#d2bd83';
						console.log(this.Color);
            this.Emsg = `The security code you inquired is ${res.data.FWCode}, the security code has been queried in${res.data.FirstSearchTime}, beware of fake!`;
            this.Cmsg = `您好,您所查询的防伪码为${res.data.FWCode},该防伪码在${res.data.FirstSearchTime}已被查询,谨防假冒!`;
          } else if (
            res.data.Result == "9" ||
            res.data.Result == "4" ||
            res.data.Result == "10" ||
            res.data.Result == "11"
          ) {
            this.alertNum = 3;
            this.fwmClass = "fwmClassError";
						this.Color = "#d29090";
            this.Cmsg = res.data.ResultMsg;
            this.Emsg = `The security code you inquired does not exist!`;
          } else if (res.data.Result == "20") {
            this.alertNum = 3;
            this.fwmClass = "fwmClassError";
						this.Color = "#d29090";
            this.Cmsg = res.data.ResultMsg;
            this.Emsg = `Your query is too frequent, please try again later!`;
          } else if (res.data.Result == "8") {
            this.alertNum = 3;
            this.fwmClass = "fwmClassError";
						this.Color = "#d29090";
            this.Cmsg = res.data.ResultMsg;
            this.Emsg = `Security code can not be empty!`;
          }

          this.alertTitle =
            this.alertNum == 1
              ? "success"
              : this.alertNum == 2
              ? "warning"
              : "danger";
          this.alertboll = true;
          this.makeToast(this.alertTitle);
        });
    },
  },
};
</script>

<style scoped>
#bg {
  width: 100%;
	height: 100vh;
}

.container {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
}

#fwmAlert {
  width: 100%;
  margin: 0 auto;
  text-align: center;
  border-radius: 0.5rem;
  padding: 0.5rem;
  color: #222;
}

.fwmClassSuccess {
  /* background: #caeed2; */
  background-color: rgba(202, 238, 210, 0.8);
}

.fwmClassWarning {
  background: rgba(255, 229, 156, 0.8);
}

.fwmClassError {
  /* background: rgb(255, 152, 152); */

  background-color: rgba(255, 172, 172, 0.8);
  /* background-image: url("../assets/1.png");
	background-size: 100% 100%; */
}

.b-alert {
  opacity: 0.8;
  box-shadow: 0px 0px 1px 0.5px rgb(40, 40, 40) inset;
}

.spinner {
  position: absolute;
  left: 50%;
}

.scanCodeBtn {
  width: 48px;
  height: 48px;
  background-color: rgba(255, 255, 255, 0);
  border: none;
  margin: 5% auto;
  background-image: url(../assets/SaoMa.png);
}
/* 查询结果文字 */
.msg{
	position: relative;
	top: 30%;
	left: 50%;
	transform: translate(-50%, -50%);
}
/* // 如果是全屏展示 */
.login-bg {
  width: 100%;
  height: 100%;
	background: rgb(255, 255, 255);
	background-image: url('../assets/111.png');
	background-size: 100% 100%;
}
.login-bg2{
	width: 100%;
  height: 100vh;
	background: rgb(255, 255, 255);
	background-image: url(../assets/222.png);
	background-size: 100% 100%;
}

/* 修改输入框提示文字颜色 */
input:-moz-placeholder,
textarea:-moz-placeholder {
  color: #fff;
}

input:-ms-input-placeholder,
textarea:-ms-input-placeholder {
  color: #fff;
}

input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
  color: #fff;
}
/* 修改输入框提示文字颜色 */
</style>
