<template>
	<view class="img-area">
		<image class="img-area-logo" src="https://api.moeyouko.top/static/image/banner.jpg" mode="aspectFit"></image>
	</view>
	<view class="search-area">
		<uni-search-bar v-model="searchValue" @confirm="querySearchResult" radius="3" cancelButton="none" placeholder="原理/工程参数/标准解/科学效应" />
	</view>
	<view class="express-entrance-area">
		<view class="express-entrance-area-item" v-for="(item, index) in arrExpressEntrance" :href="item.route" :key="index" @click="navigateTo(item.route, index)">
			<image :src="item.imageSrc" mode="scaleToFill"></image>
			<text>{{item.name}}</text>
		</view>
	</view>
	<uni-title type="h4" title="TRIZ-小常识" align="center" color="#8a8a8a"></uni-title>
	<uni-collapse accordion>
		<uni-collapse-item v-for="(item, index) in arrTrizCommonSense" :key="index" :title="item.title">
				<!-- <template v-slot:title>
					<view class="coll-title-area">
						<uni-title type="h5" :title="item.title" color="#666"></uni-title>
					</view>
				</template> -->
				<view class="coll-content-area">
				<text style="color: #8a8a8a;" space="nbsp" class="coll-content-area-text">{{item.content}}</text>
				<view v-if="index === 4" class="img-area-footer">
					<image class="img-area-footer-logo" src="https://api.moeyouko.top/static/image/TRIZ.jpg" mode="aspectFit"></image>
				</view>
			</view>
		</uni-collapse-item>
	</uni-collapse>
</template>

<script>
	import arrTrizCommonSense from "/static/js/index.js"
	const arrExpressEntrance = [
		{
			'name': 'TRIZ',
			'imageSrc': '/static/images/triz.png',
			'route': '/subpackages/triz/outline/outline'
		},
		{
			'name': '工具',
			'imageSrc': '/static/images/tool_bl.png',
			'route': '/pages/tool/tool'
		},
		{
			'name': '原理',
			'imageSrc': '/static/images/principle_bl.png',
			'route': '/pages/principle/principle'
		},
		{
			'name': '我的',
			'imageSrc': '/static/images/me_bl.png',
			'route': '/pages/me/me'
		},
	]
	export default {
		data() {
			return {
				arrTrizCommonSense, 
				arrExpressEntrance,
				searchValue: '',
			};
		},
		methods: {
			navigateTo(route, index) {
				index === 0 ? uni.navigateTo({ url: route }) : uni.switchTab({ url: route })
			},
			querySearchResult(e) {
				const sqlExp = /(.*\=.*\-\-.*)|(.*(\+|\-).*)|(.*\w+(%|\$|#|&)\w+.*)|(.*\|\|.*)|(.*\s+(and|or)\s+.*)|(.*\b(select|update|union|and|or|delete|insert|trancate|char|into|substr|ascii|declare|exec|count|master|into|drop|execute)\b.*)/
				if(e?.value && sqlExp.test(e?.value?.toString())) {
					uni.showToast({
						title: '请输入合法字符',
						icon: 'error',
						duration: 3000
					})
					this.searchValue = ''
					return
				}
				uni.navigateTo({
					url: '/subpackages/search/search-result/search-result?keyword=' + e?.value
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.img-area {
		background-color: white;
		text-align: center;
		// margin-top: 60rpx;
		&-logo {
			width: 100%;
			height: 300rpx;
		}
	}
	
	.img-area-footer {
		background-color: white;
		text-align: center;
		// margin-top: 60rpx;
		&-logo {
			width: 100%;
			height: 450rpx;
		}
	}
	
	.search-area {
		text-align: center;
		padding: 0 80rpx;
	}
	
	.express-entrance-area {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		padding: 0 80rpx;
		
		&-item {
			width: 50rpx;
			text-align: center;
			
			image {
				width: 50rpx;
				height: 50rpx;
			}
			
			text {
				font-size: 12px;
				color: #8a8a8a;
			}
		}
	}
	
	.coll-content-area {
		padding: 0 15px;
		word-wrap: break-word;
		word-break: break-all;
	}
	
	.coll-title-area {
		padding-left: 15px;
	}
</style>
