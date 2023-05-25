<template>
	<!-- <scroll-view class="scroll-view-area" scroll-y="true" :scroll-into-view="'section-' + section">
		<view class="scroll-view-area-section" v-for="(item, index) in outline" :id="'section-' + (index + 1)" :key="index">
			<uni-title :title="item"></uni-title>
			<view class="scroll-view-area-section-content"  v-html="sections[index]">
			</view>
		</view>
		
	</scroll-view> -->
	<!-- <view class='typora-export os-windows' v-html="innerHtml"></view> -->
	<view class="scroll-view-area" scroll-y="true">
		<wemark :md="md[section]" link highlight type="wemark"></wemark>
	</view>
	
</template>

<script>
	import { md, outlines } from '../static/js/triz.js'
	export default {
		onLoad(option) {
			this.section = option.section
		},
		data() {
			return {
				section: -1,
				md,
			};
		},
		wacth(section) {
			
		}
	}
</script>

<style scoped lang="scss">
	.scroll-view-area{
		padding: 15px;
		height: calc(100vh - env(safe-area-inset-bottom)); 
	}
</style>
