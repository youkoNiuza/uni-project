<template>
	<uni-collapse>
		<uni-collapse-item :show-animation='false' border="none" title="应用阿奇舒勒矛盾矩阵的步骤" thumb="/subpackages/tools/static/images/help.png">
			<view class="coll-content-area">
				<view v-for="(item, index) in usageGuide" :key="index">
					<text space="nbsp" class="coll-content-area-text">{{item}}</text>
				</view>
			</view>
		</uni-collapse-item>
	</uni-collapse>
	<uni-section title="请选择改善的参数" type="square" padding="0 0 12px 0">
		<picker-view :indicator-style="indicatorStyle" :value="[parameter[0]]" @change="(e) => bindChange(e, 'improve')" class="picker-view">
			<picker-view-column>
				<view class="item" v-for="(item,index) in engineeringParameters" :key="index">{{index+1}}.{{item}}</view>
			</picker-view-column>
		</picker-view>
	</uni-section>
	<uni-section title="请选择恶化的参数" type="circle" padding="0 0 12px 0">
		<picker-view :indicator-style="indicatorStyle" :value="[parameter[1]]" @change="(e) => bindChange(e, 'deterioration')" class="picker-view">
			<picker-view-column>
				<view class="item" v-for="(item,index) in engineeringParameters" :key="index">{{index+1}}.{{item}}</view>
			</picker-view-column>
		</picker-view>
	</uni-section>
	<button @click="queryContradictionAnalysisResult" class="query-button" type="default">
		<view class="query-button-content">
			<uni-icons color="#eee" type="search" size="24"></uni-icons>查询
		</view>
	</button>
</template>

<script>
	import { EngineeringParameters, UsageGuide } from '../static/js/contradictionAnalysis.js'
	export default {
		data() {
			return {
				parameter: [2, 2],
				indicatorStyle: `height: 50px; background-color: #333; opacity: 0.15`,
				engineeringParameters: EngineeringParameters,
				usageGuide: UsageGuide
			}
		},
		methods: {
			bindChange: function (e, type) {
				const val = e.detail.value
				if(type === 'improve') {
					this.parameter[0] = val?.[0] || 2
					return
				}
				this.parameter[1] = val?.[0] || 2
			},
			queryContradictionAnalysisResult() {
				const url = `/subpackages/tools/contradiction-analysis/contradiction-analysis-result/contradiction-analysis-result?improve=${this.parameter[0]}&deterioration=${this.parameter[1]}`
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.picker-view {
		width: 750rpx;
		height: 400rpx;
	}
	.item {
		line-height: 100rpx;
		text-align: center;
	}
	.query-button {
		height: 100rpx;
		line-height: 100rpx;
		margin-top: 12px;
		color: #eee;
		background-color: #1165BA;
		text-align: center;
		
		&-content {
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
	.coll-content-area {
		color: dimgrey;
		padding: 0 15px 12px 15px;
		word-wrap: break-word;
		word-break: break-all;
		view {
			margin-top: 3px;
			text {
				line-height: 14px;
			}
		}
	}
</style>
