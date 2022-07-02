<template>
  <div class="hello_world">
    <p class="h2 mb-2">
      <b-icon-arrow-up
        class="top"
        v-if="btnFlag"
        @click="backTop"
        variant="secondary"
      ></b-icon-arrow-up>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      btnFlag: false,
    };
  },

  mounted() {
    window.addEventListener("scroll", this.scrollToTop);
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollToTop);
  },
  methods: {
    // 点击图片回到顶部方法，加计时器是为了过渡顺滑
    backTop() {
      const that = this;
      let timer = setInterval(() => {
        let ispeed = Math.floor(-that.scrollTop / 15);
        document.documentElement.scrollTop = document.body.scrollTop =
          that.scrollTop + ispeed;
        if (that.scrollTop === 0) {
          clearInterval(timer);
        }
      }, 16);
    },

    // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
    scrollToTop() {
      const that = this;
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      that.scrollTop = scrollTop;
      if (that.scrollTop > 150) {
        that.btnFlag = true;
      } else {
        that.btnFlag = false;
      }
    },
  },
};
</script>

<style>
.top {
  position: fixed;
  bottom: 70px;
  right: 20px;
  border:3px solid #75aea5;
  border-radius: 25%;
}
</style>
