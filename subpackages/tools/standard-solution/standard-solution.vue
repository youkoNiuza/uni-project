<template>
	<uni-collapse>
		<uni-collapse-item :show-animation='false' border="none" title="应用标准解的步骤" thumb="/subpackages/tools/static/images/help.png">
			<image src="https://api.moeyouko.top/static/image/standard-solution.jpg" mode="aspectFill"></image>
		</uni-collapse-item>
	</uni-collapse>
	<uni-section title="概念: 物-场模型" type="circle">
		<view class="coll-content-area">
			<text space="nbsp">{{modelDes}}</text>		
		</view>
	</uni-section>
	<uni-section title="概念: 标准解" type="square">
		<view class="coll-content-area" style="padding-bottom: 12px;">
			<text space="nbsp">{{solutionDes}}</text>	
		</view>
	</uni-section>
	<uni-section title="76个标准解及分类" type="line">
		<uni-list>
			<uni-list-item 
				showArrow 
				v-for="item in solutionsOutline" 
				:title="item.name" 
				:note="item.des" 
				:key="item.id"
				:to="'/subpackages/tools/standard-solution/standard-solution-detail/standard-solution-detail?id=' + (item.id) + '&name=' + (item.name)"
			>
			</uni-list-item>
		</uni-list>
	</uni-section>
</template>

<script>
	const SolutionsOutline = [
		{ id: 1, name: '建立或拆解物场模型', des: '基本物场模型的标准解' },
		{ id: 2, name: '增强物-场模型', des: '增强物场模型的标准解' },
		{ id: 3, name: '向超系统或微观级转化', des: '向双、多级系统或微观级系统进化的标准解' },
		{ id: 4, name: '检测和测量问题', des: '测量与检测的标准解' },
		{ id: 5, name: '简化与改善的策略', des: '简化与改善策略标准解' },
	]
	export default {
		data() {
			return {
				modelDes: `  阿奇舒勒认为每一个技术系统都可由许多功能不同的子系统所组成，因此每一个系统都有它的子系统，而每个子系统都可以再进一步地细分直到分子、原子、质子与电子等微观层次。无论大系统、子系统、还是微观层次都具有功能，所有的功能都可分解为2种物质和1种场(即二元素组成)。
						\n  在物质-场模型的定义中，物质是指某种物体或过程，可以是整个系统，也可以是系统内的子系统或单个的物体，甚至可以是环境，取决于实际情况。场是指完成某种功能所需的手法或手段，通常是一些能量形式如：磁场、重力场、电能、热能、化学能、机械能、声能、光能等等。
						\n  物-场分析是TRIZ理论中的一种分析工具，用于建立与已存在的系统或新技术系统问题相联系的功能模型。`,
				solutionDes: `  标准创造性解决方案的目标与发明原理的目标一样，是解决在TRIZ方法论的问题识别阶段发现的关键问题。依据Altshuller发现的规律:
						\n  如果问题的物场模型是相同的，那么解决方案的物场模型也是一样的，和这个问题所属的领域无关。理解和掌握物场模型可以有效的将具体问题转换为标准问题，通过标准解，可以快速的找到问题的标准解决方案，其后通过实际验证即可快速解决实际问题，从而提高问题解决的效率降低试错成本。`,
				solutionsOutline: SolutionsOutline
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	image {
		height: 350rpx;
	}
	uni-collapse-item {
		text-align: center;
	}
	.coll-content-area {
		color: dimgrey;
		padding: 0 15px;
		font-size: 12px;
		line-height: 14px;
		word-wrap: break-word;
		word-break: break-all;
	}
</style>
