<template>
	<uni-list>
		<uni-list-item 
			v-for="(principle, index) in principles" 
			:title="principle.id + '.' + principle.name" 
			:key="index"
			:to="'/subpackages/principles/detail/detail?id=' + (principle.id)"
			showArrow>
		</uni-list-item>
	</uni-list>
</template>

<script>
	import principle from '../../static/js/principle.js'
	export default {
		data() {
			return {
				principles: principle
			};
		}
	}
</script>

<style lang="scss">

</style>
