<template>
	<uni-section title="科学效应库" subTitle="从下列选项中选择效应查询类型:" titleColor="#1165BA" titleFontSize="16px">
		<uni-list>
			<uni-list-item 
				showArrow
				v-for="(effect) in effectTypes" 
				:title="effect.type" 
				:note="'例如：' + effect.example"
				:key="effect.id"
				:to="'/subpackages/tools/effect-library/effect-library-query/effect-library-query?id=' + effect.id"
			>
			</uni-list-item>
		</uni-list>
	</uni-section>
</template>

<script>
	export default {
		data() {
			return {
				effectTypes: [{
					id: 1,
					type: '功能（Function）',
					example: '移动液体'
				},{
					id: 2,
					type: '参数（Parameter）',
					example: '提高温度'
				},{
					id: 3,
					type: '转换（Transform）',
					example: '将机械能转化为热能'
				}],
				ifrContent: '在解决问题之初，首先抛开各种客观限制条件，通过理想化来定义问题的最终理想解（ideal final result IFR）以明确理想解所在的方向和位置，保证在问题解决过程中沿着此目标前进并获得最终理想解，从而避免了传统创新涉及方法中缺乏目标的弊端，提升了创新设计的效率。\n最终理想解(IFR)应该符合四个特点:'
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
	.ifr-wrapper {
		font-size: 14px;
		color: #3b4144;
		padding: 0 10px 0 10px;
		white-space: break-spaces;
	}
</style>
