<template>
	<view class="text-block">
		<view class="text-block-title">关于“工程创新”小程序</view>
		<view class="text-block-content">
			工程创新工具，可以辅助创新从业或研究者快速掌握发明原理、标准解、科学效应库等创新工具的理论。
		</view>
	</view>
	<view class="text-block">
		<view class="text-block-title">免责声明</view>
		<view class="text-block-content">
		小程序内容部分来源包括但不限于文献、著作、互联网，仅用于学习交流，不用于商业用途。如有侵权请联系：
		<uni-link color="#1165BA" href="yaoyueliuli@outlook.com" text="yaoyueliuli@outlook.com"></uni-link>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	.text-block {
		
		&-title {
			font-weight: 700;
			font-size: 16px;
			line-height: 16px;
			padding: 10px 15px;
			color: #1165BA;
			background-color: rgba(17, 101, 186, .2);
		}
		
		&-content {
			padding: 10px 15px;
			color: dimgrey;
			font-size: 14px;
			line-height: 20px;
		}
	}
</style>
