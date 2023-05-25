<template>
	<uni-section v-for="(sublevel, index) in sublevels" :title="'子级：' + sublevel.id + ' ' + sublevel.name" type="square" :key="sublevel.id">
		<uni-collapse accordion>
			<uni-collapse-item v-for="(solution) in sublevel.solutions" :title="solution.id + ' ' + solution.name" :key="solution.id">
				<view v-if="solution.imageUrl" class="coll-content-image">
					<image :src="'https://api.moeyouko.top/static/image/solution/'+solution.imageUrl+'.jpg'" mode="aspectFit"></image>
				</view>
				<view class="coll-content-title">说明：</view>
				<view class="coll-content-area">
					<text space="nbsp" class="coll-content-area-text">{{'    ' + (solution.des?.replaceAll('\\n', '\n    ') ?? "无")}}</text>
				</view>
				<view class="coll-content-title">案例：</view>
				<view class="coll-content-area">
					<text space="nbsp" class="coll-content-area-text">{{'    ' + (solution.case?.replaceAll('\\n', '\n    ') ?? "无")}}</text>
				</view>
			</uni-collapse-item>
		</uni-collapse>
	</uni-section>
	<view class="foot-placeholder"></view>
</template>

<script>
	export default {
		onLoad(option) {
			const _this = this
			const { id, name } = option
			uni.setNavigationBarTitle({
				title: name
			})
			_this.id = id
			uni.request({
				url: ('https://api.moeyouko.top/solution/sublevel?id=' + _this.id),
				success: (res) => {
					console.log(res);
					if(res.statusCode === 200 || res.statusCode === 304) {
						_this.sublevels = res.data
					}
				}
			})
		},
		data() {
			return {
				id: 0,
				sublevels: []
			};
		}
	}
</script>

<style lang="scss" scoped>
	.coll-content-image {
		text-align: center;
		image {
			height: 200rpx;
			width: 400rpx;
		}
	}
	
	.coll-content-area {
		color: dimgrey;
		padding: 0 15px 12px 15px;
		font-size: 12px;
		line-height: 16px;
	}
	.coll-content-title {
		padding: 5px 0 5px 15px;
		font-size: 14px;
		line-height: 16px;
		font-weight: 700;
		color: #1165BA;
	}
	.foot-placeholder {
		width: 100vw;
		height: 150rpx;
	}
</style>
