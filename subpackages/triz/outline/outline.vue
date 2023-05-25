<template>
	<uni-list>
		<uni-list-item 
			showArrow 
			v-for="(item, index) in outline" 
			:title="item" 
			:key="index" 
			:to="`/subpackages/triz/detail/detail?section=${index}`"
		>
		</uni-list-item>
	</uni-list>
</template>

<script>
	import { sections, outlines } from '../static/js/triz.js'
	export default {
		data() {
			return {
				outline: outlines
			};
		},
		methods: {
			toChinese: (index) => sections(index),
		}
	}
</script>

<style lang="scss">

</style>
