<template>
    <div id="login">
      <vue-particles
        class="login-bg"
      color="#39AFFD"
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
    </div>
 </template>

<!-- // 根据自己的情况设置样式(一般不需要写，看情况) -->
<style >
	.login{
    width: 100%;
    height: 100vh;
  }
.login-bg{
   width: 100%;
    height: 100%;
    background: #3E3E3E;
}
</style>
