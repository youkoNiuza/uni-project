<template>
	<view v-if="!user.openid">
		请先登录后再编辑个人信息
		<button type="default" @click="back()">去登录</button>
	</view>
	<view v-else class="form-container">
		<uni-section title="个人信息" sub-title="提供个人信息以获得更好的服务">
			<uni-group title="头像昵称">
				<uni-forms-item label="头像" name="avatarUrl">
					<button class="avatar-choose-btn" type="default" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
						<image class="avatar-image" :src="avatarUrl" mode="aspectFit" webp></image>
					</button>
				</uni-forms-item>
				<uni-forms-item label="昵称" name="nickname">
					<uni-easyinput @blur="getNickname" type="nickname" maxlength="20" class="nickname-input" :value="nickname" placeholder="请输入昵称"/>
				</uni-forms-item>
			</uni-group>
			<uni-group title="真实信息">
				<uni-forms ref="form" :modelValue="formData">
					<uni-forms-item label="姓名" name="username">
						<uni-easyinput type="text" v-model="formData.username" placeholder="请输入姓名" />
					</uni-forms-item>
					<uni-forms-item label="年龄" name="age">
						<uni-easyinput type="text" v-model="formData.age" placeholder="请输入年龄" />
					</uni-forms-item>
					<uni-forms-item label="手机号" name="phonenumber">
						<uni-easyinput type="text" v-model="formData.phonenumber" placeholder="请输入手机号" />
					</uni-forms-item>
					<uni-forms-item label="邮箱" name="email">
						<uni-easyinput type="text" v-model="formData.email" placeholder="请输入邮箱" />
					</uni-forms-item>
					<uni-forms-item name="usertype" label="用户性质">
						<uni-data-checkbox v-model="formData.usertype" :localdata="usertype"/>
					</uni-forms-item>
					<uni-forms-item label="单位" name="unit">
						<uni-easyinput type="text" v-model="formData.unit" placeholder="请输入单位" />
					</uni-forms-item>
				</uni-forms>
			</uni-group>
		</uni-section>
		<button @click="submitForm">提交</button>
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
	const defaultAvatarUrl = 'https://api.moeyouko.top/static/image/logo.jpg'
	export default {
		onLoad() {
			const _this = this
			this.avatarUrl = this.user.avatarUrl
			this.nickname = this.user.nickname
			uni.request({
				url: `https://api.moeyouko.top/user/info?openid=${_this.user.openid}&random=${new Date().getTime()}`,
				method: "GET",
				success(res) {
					console.log(res);
					const data = res.data
					_this.formData = {...data}
				}
			})
		},
		data() {
			return {
				avatarUrl: defaultAvatarUrl,
				nickname: '微信用户',
				choosenFile: null,
				formData: {
					username: "",
					age: null,
					phonenumber: null,
					email: '',
					usertype: '0',
					unit: ''
				},
				usertype: [
					{
						text: '个人',
						value: '0'
					},
					{
						text: '企业',
						value: '1'
					}
				]
			};
		},
		computed: mapState([
			'user'
		]),
		methods: {
			...mapMutations(['setUser']),
			getNickname: function(e) { 
				// return new Promise((resolve, reject) => {
				// 	uni.createSelectorQuery().in(this) // 注意这里要加上 in(this)
				// 		.select(`uni-easyinput[type="nickname"]`)  
				// 		.fields({  
				// 			properties: ["value"],  
				// 		})  
				// 		.exec((res) => {
				// 			console.log(res);
				// 			const nickName = res?.[0]?.value || this.nickname
				// 			resolve(nickName)
				// 		})
				// })
				this.nickname = e?.target?.value || this.nickname
			},
			submitForm() {
				const _this = this
				const fileUrl = this.avatarUrl
				const openid = this.user.openid
				uni.showLoading({
					title: '正在上传...',
					mask: true
				})
				const phoneReg = /^1[3-9]\d{9}$/
				const emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/

				if(!!_this.formData.phonenumber && !phoneReg.test(_this.formData.phonenumber)) {
					uni.hideLoading()
					_this.formData.phonenumber = ''
					uni.showToast({
						title: '非法的手机号码',
						icon: 'error',
						duration: 3000
					})
					return
				}
				
				if(!!_this.formData.email && !emailReg.test(_this.formData.email)) {
					uni.hideLoading()
					_this.formData.email = ''
					uni.showToast({
						title: '非法的电子邮箱',
						icon: 'error',
						duration: 3000
					})
					return
				}
				
				const postData = {
					..._this.user,
					..._this.formData,
					"nickname": _this.nickname,
					"avatarUrl": _this.avatarUrl
				}
				console.log('postdata', postData);
				if(this.choosenFile) {
					uni.uploadFile({
						url: 'https://api.moeyouko.top/user/upload',
						filePath: fileUrl,
						name: 'avatar',
						formData: postData,
						success: (res) => _this.updateSuccessHandler(res, 'file'),
						complete() {
							uni.hideLoading()
						}
					});
				}else {
					uni.request({
						url: 'https://api.moeyouko.top/user/update',
						method:"POST",
						data: postData,
						success: (res) => _this.updateSuccessHandler(res, 'post'),
						complete() {
							uni.hideLoading()
						}
					})
				}
			},
			back() {
				uni.navigateBack()
			},
			onChooseAvatar(e) {
			    const { avatarUrl } = e.detail
				console.log(e);
			    this.avatarUrl = avatarUrl
				this.choosenFile = avatarUrl
			},
			updateSuccessHandler(res, source) {
				uni.hideLoading()
				const _this = this
				let resData = null
				if(source === 'file') {
					resData = JSON.parse(res.data)
				}else{
					resData = {...res.data}
				}
				console.log(resData);
				if(resData.status === 500) {
					uni.showToast({
						title: '上传失败！',
						icon:'error',
						duration: 3000,
					})
					return
				}
				_this.setUser({
					user: {
						...resData.user
					}
				})
				this.formData = resData.userinfo
				uni.setStorage({
					key: 'user',
					data: {
						..._this.user
					},
					success: function() {
						uni.setStorage({
							key: 'expire',
							data: new Date().getTime() + 7 * 24 * 60 * 60 * 1000
						})
					}
				})
				uni.showToast({
					title: '上传成功！',
					icon:'success',
					duration: 3000,
				});
			}
		},
		watch: {
			avatarUrl(newUrl, oldUrl) {
				console.log(newUrl, oldUrl);
			},
			nickname(n, o) {
				console.log(n, o);
			}
		}
	}
</script>

<style lang="scss" scoped>
	:deep(.uni-forms-item:last-child) {
		margin-bottom: 0;
	}
	.form-container {
		height: 100vh;
		
		.avatar-choose-btn {
			height: 100rpx;
			width: 100rpx;
			padding: 0;
			border-radius: 20%;
		}
		
		.avatar-image {
			height: 100rpx;
			width: 100rpx;
			border-radius: 20%;
		}
		
		.nickname-input-wrapper {
			label {
				width: 65px;
				color: #666;
				font-size: 14px;
				line-height: 37px;
				padding-right: 12px;
			}
			display: flex;
			flex-direction: row;
			padding-top: 12px;
		}
		
		.nickname-input {
			border:0;
			outline:0;
			height: 75rpx;
			border:solid 1px red;
		}
	}
</style>
