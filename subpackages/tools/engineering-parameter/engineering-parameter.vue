<template>
	<uni-section title="相关概念" type="square">
		<uni-list>
			<uni-list-item title="运动物体" note="运动物体是指自身或借助于外力可在一定的空间内运动的物体"></uni-list-item>
			<uni-list-item title="静止物体" note="静止物体是指自身或借助于外力都不能使其在空间内运动的物体"></uni-list-item>
			<uni-list-item title="负向参数（Negative parameters）" note="指这些参数变大时,使系统或子系统的性能变差。如子系统为完成特定的功能所消耗的能量（第19,20条）越大,则设计越不合理。"></uni-list-item>
			<uni-list-item title="正向参数（Positive parameters）" note="指这些参数变大时,使系统或子系统的性能变好。如子系统可制造性（第32条）指标越高,子系统制造成本就越低。"></uni-list-item>
		</uni-list>
	</uni-section>
	<uni-section title="以下39个通用工程参数可分为如下3类：" type="square">
		<uni-list>
			<uni-list-item title="物理及几何参数" note="（1）～（12）,（17）～（18）,（21）条。"></uni-list-item>
			<uni-list-item title="技术负向参数" note="（15）～（16）,（19）～（20）,（22）～（26）,（30）～（31）条。"></uni-list-item>
			<uni-list-item title="技术正向参数" note="（13）～（14）,（27）～（29）,（32）～（39）条。"></uni-list-item>
		</uni-list>
	</uni-section>
	<uni-section title="39个工程参数及其解释" type="square">
		<uni-collapse accordion>
			<uni-collapse-item v-for="(item, index) in engineeringParametersDetail" :title="(index+1) + '.' + item.name" :key="index">
				<view class="coll-content-area">
					<text space="nbsp" class="coll-content-area-text">{{item.des}}</text>
				</view>
			</uni-collapse-item>
		</uni-collapse>
	</uni-section>
	<view class="foot-placeholder"></view>
</template>

<script>
	import { EngineeringParametersDetail } from '../static/js/contradictionAnalysis.js'
	export default {
		data() {
			return {
				engineeringParametersDetail: EngineeringParametersDetail
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.coll-content-area {
		color: dimgrey;
		padding: 0 15px;
		word-wrap: break-word;
		word-break: break-all;
	}
	.foot-placeholder {
		height: 150rpx;
	}
</style>
