<template>
	<view v-if="!!result" class="result-wrapper">
		<uni-section :title="'矛盾：' + result.des" type="line">
			<view v-if="result.type === 0" class="result-unfound">
				{{result.payload}}
			</view>
			<uni-list v-else>
				<uni-list-item 
					showArrow
					v-for="item in result.payload" 
					:title="item.id + '.' + item.name" 
					:key="item.id"
					:to="'/subpackages/principles/detail/detail?id=' + item.id"
				>
				</uni-list-item>
			</uni-list>
		</uni-section>
	</view>
</template>

<script>
	import { getContradictionAnalysisResult } from '../../static/js/contradictionAnalysis.js'
	export default {
		onLoad(option) {
			const { improve, deterioration } = option
			this.result = getContradictionAnalysisResult(Number(improve), Number(deterioration))
		},
		data() {
			return {
				result: null
			};
		}
	}
</script>

<style lang="scss">
	.result-wrapper {
		height: 100vh;
		width: 100vw;
	}
	.result-unfound {
		font-size: 16px;
		font-weight: 700;
		color: #1165BA;
		padding: 10px 12px;
	}
</style>
