<template>
  <div>
    <NavBar :idxNum="4"></NavBar>

    <div id="bg">
      <vue-particles
        :class="loginBg"
        :color="Color"
        :particleOpacity="0.7"
        :particlesNumber="100"
        shapeType="circle"
        :particleSize="4"
        linesColor="#b9fbe8"
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
        class="bv-example-row "
        style="padding: 0 10%; box-sizing: border-box"
      >
      <b-row >
        <h2 style="width:100%;color: #fff;text-align: center">{{!bool?'授权代理商查询':"Authorized agent inquiry"}}</h2>
      </b-row>
        <!-- 查询按钮 -->
        <b-row v-if="flag" style="margin-top: 5vh">
          <b-input-group class="mt-3,Forminput">
            <b-form-input
              style="background-color: transparent; color: #fff"
              v-model="inputFwm"
              type="number"
              :placeholder="
                bool ? 'Please enter a  code' : '请输入手机号或者授权编号'
              "
            ></b-form-input>
            <b-input-group-append>
              <b-button variant="primary" @click="query(inputFwm)">{{
                bool ? "Query" : "查询"
              }}</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-row>
      </b-container>
    </div>

    <font></font>
  </div>
</template>

<script>

export default {
  data() {
    return {
      text:'',
      loginBg: "",
      Color: "#9effe2",
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
     if (this.$route.params.language == "en") {
      document.title = "Agent";
      this.bool = true;
    } else if (this.$route.params.language == "cn") {
      document.title = "代理查询";
      this.bool = false;
    }
    if (this._isMobilde()) {
      this.loginBg = "login-bg2";
    } else {
      this.loginBg = "login-bg";
    }
  },
  methods: {
   
    

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
      console.log(inputFwm);
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

/* // 如果是全屏展示 */
.login-bg {
  width: 100%;
  height: 100vh;
  background: rgb(255, 255, 255);
  background-image: url(../assets/dl1.png);
  background-size: 100% 100%;
}
.login-bg2 {
  width: 100%;
  height: 100vh;
  background: rgb(255, 255, 255);
  background-image: url(../assets/dl2.png);
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

/* chrome */ 
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button { 
    -webkit-appearance: none; 
}
/* 火狐浏览器 */
input[type="number"]{ 
    -moz-appearance: textfield; 
}
</style>
