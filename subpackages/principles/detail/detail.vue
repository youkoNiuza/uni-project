<template>
	<uni-section v-if="!!detail" :title="detail.id+'.'+detail.name" titleFontSize='16px'>
		<view class="principle-title">图解：</view>
		<view class="principle-image">
			<image :src="'https://api.moeyouko.top/static/image/principle/'+detail.id+'.jpg'" mode="aspectFit"></image>
		</view>
		<view class="principle-title">说明：</view>
		<uni-list>
			<uni-list-item v-for="(item, index) in guide" :key="index" :title="getLetter(index) + '.' + item"></uni-list-item>
		</uni-list>
	</uni-section>
	<uni-section v-if="!!detail" title="实例列表" titleFontSize='16px'>
		<uni-collapse>
			<uni-collapse-item v-for="(item, index) in detail.cases" :title="(index+1) + '.' + item.name" :key="item.id">
				<view class="coll-content-area">
					<image :src="`https://api.moeyouko.top/static/image/principle/${id}_${index+1}.jpg`" mode="aspectFit"></image>
				</view>
			</uni-collapse-item>
		</uni-collapse>
	</uni-section>
	<view class="foot-placeholder"></view>
</template>

<script>
	export default {
		onLoad(option) {
			console.log('detail load');
			this.id = option.id
		},
		onShow() {
			if(!this.detail) {
				uni.request({
					url: "https://api.moeyouko.top/principle/detail",
					method: "GET",
					data: {
						id: this.id
					},
					success: (res) => {
						console.log(res);
						if(res.statusCode === 200 || res.statusCode === 304) {
							this.detail = res.data
						}
					}
				})
			}
		},
		data() {
			return {
				id: 0,
				detail: null,
				instances: ['实例1', '实例2', '实例3', '实例4']
			}
		},
		methods: {
			getLetter(index) {
				return String.fromCharCode(index + 65)
			}
		},
		computed: {
			guide() {
				if(!this.detail) {
					return ['网络错误，请重试']
				}
				return this.detail?.guide.split('&')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.principle-title {
		color: #3b3b3b;
		padding-left: 15px;
	}
	.principle-image {
		margin: 0 15px;
		// border: 1px solid grey;
		text-align: center;
		
		image: {
			width: calc(750rpx - 30px);
			height: calc(375rpx - 15px);
		}
	}
	.coll-content-area {
		text-align: center;
		image {
			height: 200rpx;
			width: 400rpx;
		}
	}
	.foot-placeholder {
		background-color: #fff;
		width: 100vw;
		height: 250rpx;
	}
</style>
