<script>
import { mapMutations } from 'vuex'
	export default {
		onLaunch: function() {
			const _this = this
			uni.getStorage({
				key: 'expire',
				success: function(res) {
					const expire = res.data
					if(expire && expire > new Date().getTime()) {
						uni.getStorage({
							key: 'user',
							success: function(res) {
								const user = res.data
								if(user) {
									console.log('onLaunchGetUserFromStorage', user);
									_this.setUser({
										user
									})
									uni.setStorageSync('expire', new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
								}
							}
						})
					}else {
						uni.setStorageSync('user', {})
					}
				}
			});
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			...mapMutations(['setUser'])
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	/* #ifndef APP-NVUE */
	@import '@/static/customicons.css';
	// 设置整个项目的背景色
	page {
		background-color: #eee;
		font-family: Arial, Helvetica, sans-serif;
	}
	
	
	:deep(uni-nav-bar .uni-navbar-btn-text text) {
		font-size: 30rpx !important;
	}
	
	/* #endif */
	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}
</style>
