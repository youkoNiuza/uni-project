<template>
	<button @click="jump">首页</button>
	<view>
		我的
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			jump: function() {
				uni.switchTab({
					url: '/pages/index/index'
				});
			}
		}
	}
</script>

<style>

</style>
