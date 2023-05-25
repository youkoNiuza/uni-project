<template>
	<view class="tool-wrapper">
		<!-- <uni-list>
			<uni-list-item 
				v-for="(tool, index) in tools" 
				:title="tool.name" 
				:note="tool.description" 
				:key="index" 
				:thumb="tool.imageSrc"
				:to="tool.to"
				showArrow>
			</uni-list-item>
		</uni-list> -->
		<view>
			<view class="tool-item" v-for="(tool, index) in tools" :key="index" @click="() => navigateTo(tool.to)">
				<view class="tool-item-content">
					<image class="tool-item-content-image" :src="tool.imageSrc" mode="aspectFit"></image>
					<view class="tool-item-content-des">
						<view class="tool-item-content-des-title">{{tool.name}}</view>
						<view class="tool-item-content-des-note">{{tool.description}}</view>
					</view>
				</view>
				<uni-icons type="right" size="20" color="#999"></uni-icons>
			</view>
		</view>
		<view class="tool-foot">
			<!-- <view class="tool-foot-shadow"></view> -->
			<image class="tool-foot-image" src="https://api.moeyouko.top/static/image/tool_foot_image.jpg" mode="scaleToFill"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tools: [
					{
						name: '矛盾分析',
						description: '解决技术、物理矛盾的创新工具资源库',
						imageSrc: '/static/images/contradiction_analysis.png',
						to: '/subpackages/tools/contradiction-analysis/contradiction-analysis',
					},
					{
						name: '39个工程参数',
						description: '技术系统中元素的特征通用参数库',
						imageSrc: '/static/images/engineering_parameter.png',
						to: '/subpackages/tools/engineering-parameter/engineering-parameter',
					},
					{
						name: '76个标准解',
						description: '应用标准创造性解决方案的算法',
						imageSrc: '/static/images/standard_solution.png',
						to: '/subpackages/tools/standard-solution/standard-solution',
					},
					{
						name: '科学效应库',
						description: 'TRIZ创新的武器库',
						imageSrc: '/static/images/effect_library.png',
						to: '/subpackages/tools/effect-library/effect-library',
					}
				]
			};
		},
		methods: {
			navigateTo(to){
				uni.navigateTo({
					url: to
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tool-wrapper {
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}
	.tool-item {
		height: 49px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 12px 15px;
		background-color: #fff;
		border-bottom: 1px #ccc solid;
		
		&-content {
			height: 26px;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			
			&-image {
				height: 30px;
				width: 30px;
			}
			
			&-des {
				padding-left: 20px;
				&-title {
					color: #444;
				}
				&-note {
					margin-top: 5px;
					font-size: 12px;
					color: #999;
				}
			}
		}
	}
	.tool-item:last-of-type {
		border:none;
	}
	.tool-foot {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 350rpx;
		
		&-image {
			width: 100%;
			height: 350rpx;
		}
		
		&:after {
			position: absolute;
			content: '';
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			box-shadow:0 0 20px 20px #eee inset;
		}
	}
</style>
