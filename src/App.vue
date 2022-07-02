<template>
  <div class="app" >
      <router-view >
      </router-view>
  
    
  </div>
  
</template>
<script>

export default {
  
};
</script>

<style scoped>
body {
  width: 100%;
  height: 100%;
  background-color: rgba(226, 226, 226, 0.3) !important;
}
.b-spinner {
  position: absolute;
  top: 50%;
  left: 50%;
}
@media screen and (max-width:720px) {
	.app{
		margin-top: 8vh;
	}
}
</style>
