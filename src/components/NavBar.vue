<template>
  <div class="navbars">
    <b-navbar type="dark" variant="Light" class="navbarBg" :fixed="fixed">
      <div class="toggle">
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      </div>
      <b-collapse id="nav-collapse" is-nav :class="flag ? '' : 'navCollapse'">
        <b-navbar-nav class="navbar">
          <b-nav-item
            href="#"
            id="item"
            v-for="(item, idx) in list"
            :key="idx"
            @click="changeStyle(idx)"
          >
            <router-link :to="item.path">
              <span :class="idx == idxNum ? 'changeStyle' : ''">{{
                item.name
              }}</span>
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
      default: 0,
    },
  },
  data() {
    return {
      flag: false,
      list: "",
      num: this.idxNum,
			fixed:null,
    };
  },
  mounted() {
    this.num = localStorage.getItem("idx");
    this.language();
  },
  methods: {
    language(idx) {
      //判断是哪个语言
      if (this.$route.params.language == "en") {
        this.list = [
          {
              name: "Home",
              path: "/home/en",
            },
            {
              name: "PD",
              path: "/Product/en",
            },
            {
              name: "SC",
              path: "/SecurityCheck/en",
            },
            {
              name: "BI",
              path: "/BrandIntroduction/en",
            },
            {
              name: "AG",
              path: "/Agent/en",
            },
            {
              name: "中文",
              path: "/home/cn",
            },
        ];
        if (idx == this.list.length - 1) {
          window.location.href = "/home/en";
        }
      } else if (this.$route.params.language == "cn") {
        this.list = [
         {
              name: "首页",
              path: "/home/cn",
            },
            {
              name: "产品",
              path: "/Product/cn",
            },
            {
              name: "防伪",
              path: "/SecurityCheck/cn",
            },
            {
              name: "品牌",
              path: "/BrandIntroduction/cn",
            },
             {
              name: "代理",
              path: "/Agent/cn",
            },
            {
              name: "En",
              path: "/home/en",
            },
        ];
        if (idx == this.list.length - 1) {
          window.location.href = "/home/cn";
        }
      }

      if (this._isMobilde()) {
        this.flag = true;
				this.fixed = "bottom"
        if (this.$route.params.language == "en") {
          this.list = [
            {
              name: "Home",
              path: "/home/en",
            },
            {
              name: "PD",
              path: "/Product/en",
            },
            {
              name: "SC",
              path: "/SecurityCheck/en",
            },
            {
              name: "BI",
              path: "/BrandIntroduction/en",
            },
            {
              name: "AG",
              path: "/Agent/en",
            },
            {
              name: "中文",
              path: "/home/cn",
            },
          ];
          if (idx == this.list.length - 1) {
            window.location.href = "/home/en";
          }
        } else if (this.$route.params.language == "cn") {
          this.list = [
            {
              name: "首页",
              path: "/home/cn",
            },
            {
              name: "产品",
              path: "/Product/cn",
            },
            {
              name: "防伪",
              path: "/SecurityCheck/cn",
            },
            {
              name: "品牌",
              path: "/BrandIntroduction/cn",
            },
             {
              name: "代理",
              path: "/Agent/cn",
            },
            {
              name: "En",
              path: "/home/en",
            },
          ];
          if (idx == this.list.length - 1) {
            window.location.href = "/home/cn";
          }
        } else {
          this.flag = false;
        }
      }
    },
    changeStyle(idx) {
      this.language(idx);
    },
  },
};
</script>

<style scoped>
.navbars {
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
  background: rgba(129, 129, 129, 0.5);
  border-radius: 10%;
}
@media screen and (max-width: 720px) {
  .navbars {
    width: 100vw;
    position: fixed;
    top: 0;
    z-index: 999;
  }
}
</style>
