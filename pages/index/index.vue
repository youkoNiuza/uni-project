<template>
	<uni-nav-bar statusBar="true" color="#fff" backgroundColor="#1165BA" left-text="首页"></uni-nav-bar>
	<view class="container">
		<view class="intro">本项目已包含uni ui组件，无需import和注册，可直接使用。在代码区键入字母u，即可通过代码助手列出所有可用组件。光标置于组件名称处按F1，即可查看组件文档。</view>
		<text class="intro">详见：</text>
		<uni-link :href="href" :text="href"></uni-link>
		<button @click="jump">我的</button>
		<page-foot />
	</view>
</template>

<script setup>
	import { ref } from "vue"
	const href = ref('https://uniapp.dcloud.io/component/README?id=uniui')
	
	function jump() {
		uni.switchTab({
			url: '/pages/me/me'
		});
	}
</script>

<style>
	.nav-placeholder {
		height: var(--status-bar-height);
	}
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}
</style>
