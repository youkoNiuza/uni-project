<template>
	<uni-collapse accordion>
		<uni-collapse-item v-for="result in results" :title="result.id + '. ' + result.name" :key="result.id">
			<view class="coll-content-area">
				<text space="nbsp" class="coll-content-area-text">{{'    ' + result.desc}}</text>
			</view>
		</uni-collapse-item>
	</uni-collapse>
</template>

<script>
	export default {
		onLoad({ selected_task, selected_target, filter, id }) {
			let url = 'https://api.moeyouko.top/effect/'
			
			if(id === '1') {
				url += 'function'
			}else if(id === '2') {
				url += 'parameter'
			}else if(id === '3') {
				url += 'transform'
			}
			
			uni.showLoading({
				title: '正在加载'
			})
			
			uni.request({
				url: url,
				data: {
					selected_task: selected_task,
					selected_target: selected_target,
					filter: filter
				},
				method: "GET",
				success: (res) => {
					uni.hideLoading()
					if(res.statusCode === 200 || res.statusCode === 304) {
						this.results = res.data
						return
					}
					uni.showToast({
						title: '加载失败请重试',
						icon: 'error',
						duration: 3000,
					})
				},
				fail: () => {
					uni.hideLoading()
					uni.showToast({
						title: '加载失败请重试',
						icon: 'error',
						duration: 3000,
					})
				}
			})
		},
		data() {
			return {
				results: []
			};
		}
	}
</script>

<style lang="scss">
	.coll-content-area {
		color: dimgrey;
		padding: 0 15px 12px 15px;
		font-size: 12px;
		line-height: 14px;
	}
</style>
