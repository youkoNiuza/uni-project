<template>
	<view class="search-area">
		<uni-search-bar v-model="searchValue" @confirm="querySearchResult" radius="3" cancelButton="none" placeholder="搜索原理/工程参数/标准解" />
	</view>
	<uni-section title="搜索结果:" titleColor="#1165BA">
		<view v-if="this?.result?.principles?.length" class="result-area">
			<view class="result-area-title">发明原理：</view>
			<uni-list>
				<uni-list-item
					v-for="(principle, index) in this.result.principles" 
					:title="principle.id + '.' + principle.name" 
					:key="index"
					:to="'/subpackages/principles/detail/detail?id=' + (principle.id)"
					showArrow>
				</uni-list-item>
			</uni-list>
		</view>
		<view v-if="this?.result?.engineer_params?.length" class="result-area">
			<view class="result-area-title">工程参数：</view>
			<uni-collapse accordion>
				<uni-collapse-item v-for="(item, index) in this.result.engineer_params" :title="(item.id) + '.' + item.name" :key="item.id">
					<view class="coll-content-area">
						<text space="nbsp" class="coll-content-area-text">{{item.des}}</text>
					</view>
				</uni-collapse-item>
			</uni-collapse>
		</view>
		<view v-if="this?.result?.solutions?.length" class="result-area">
			<view class="result-area-title">标准解：</view>
			<uni-collapse accordion>
				<uni-collapse-item v-for="(solution) in this.result.solutions" :title="solution.id + ' ' + solution.name" :key="solution.id">
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
		</view>
	</uni-section>
	<view class="foot-placeholder"></view>
</template>

<script>
	export default {
		onLoad({ keyword }) {
			this.searchValue = keyword ? keyword : ''
			if(!!this.searchValue) {
				uni.request({
					url: 'https://api.moeyouko.top/search',
					data: {
						keyword: this.searchValue
					},
					method:'GET',
					success: (res) => {
						console.log(res);
						if(res.statusCode === 200 || res.statusCode === 304) {
							this.result = res.data
							this.oldSearchData.keyword = this.searchValue
							this.oldSearchData.data = res.data
						}
					}
				})
			}
		},
		data() {
			return {
				searchValue: '',
				result: null,
				oldSearchData: {}
			};
		},
		methods: {
			querySearchResult(e) {
				const sqlExp = /(.*\=.*\-\-.*)|(.*(\+|\-).*)|(.*\w+(%|\$|#|&)\w+.*)|(.*\|\|.*)|(.*\s+(and|or)\s+.*)|(.*\b(select|update|union|and|or|delete|insert|trancate|char|into|substr|ascii|declare|exec|count|master|into|drop|execute)\b.*)/
				if(!e?.value) {
					this.searchValue = ''
					return
				}
				if(e?.value && sqlExp.test(e?.value?.toString())) {
					uni.showToast({
						title: '请输入合法字符',
						icon: 'error',
						duration: 3000
					})
					this.searchValue = ''
					return
				}
				if(this.searchValue === this.oldSearchData.keyword) {
					this.result = this.oldSearchData.data
					return
				}
				uni.request({
					url: 'https://api.moeyouko.top/search',
					data: {
						keyword: this.searchValue
					},
					method:'GET',
					success: (res) => {
						if(res.statusCode === 200 || res.statusCode === 304) {
							this.result = res.data
							this.oldSearchData.keyword = this.searchValue
							this.oldSearchData.data = res.data
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search-area {
		text-align: center;
		padding: 0 80rpx;
	}
	.result-area{
		background-color: rgba(17, 101, 186, .2);
		
		&-title {
			color: #1165BA;
			padding: 10px 0;
			padding-left: 15px;
			font-weight: 700;
		}
	}
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
		height: 150rpx;
	}
</style>
