<template>
	<uni-section v-if="!!effectQueryAction" :title="effectQueryAction.name" :sub-title="effectQueryAction.des" titleColor="#1165BA">
		<uni-row>
			<uni-col v-for="(action, index) in effectQueryAction.actions" :key="action.id" :span="(24 / effectQueryAction.actions.length)">
				<view style="padding: 5px 10px;">{{action.name}}</view>
				<radio-group @change="(e) => radioChange(e, index)">
					<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in action.list" :key="action.name + index">
						<view style="padding: 5px 10px;">
							<radio style="transform:scale(0.7)" color="#1165BA" :value="index" :checked="index === 0" />
							<view class="tag">{{item}}</view>
						</view>
					</label>
				</radio-group>
			</uni-col>
		</uni-row>
	</uni-section>
	<view class="footer">
		<button @click="queryEffects" type="default"><uni-icons size="16" color="#eee" type="search"></uni-icons>查询</button>
		<picker header-text="请选择结果类型:" mode="selector" :range="resultTypes" range-key="name" @change="resultTypeChange">
			<view>
				<uni-icons size="18" type="more-filled" color="#eee"></uni-icons>
			</view>
		</picker>
	</view>
	<view class="footer-placeholder"></view>
</template>

<script>
	import { getScientificEffectAction } from '/subpackages/tools/static/js/ScientificEffect.js'
	export default {
		onLoad({ id }) {
			if(id) {
				this.id = id
				this.effectQueryAction = getScientificEffectAction(id)
			}
		},
		data() {
			return {
				id: 4,
				effectQueryAction: null,
				resultTypes: [{id:0, name:'全部'}, {id:1, name:'影响'}, {id:2, name:'应用'}],
				selected_task: 0,
				selected_target: 0,
				filter: 0
			};
		},
		methods: {
			radioChange(e, type) {
				if(type === 0) {
					this.selected_task = e?.detail?.value || this.selected_task
					return
				}
				this.selected_target = e?.detail?.value || this.selected_target
			},
			resultTypeChange(e) {
				this.filter = e?.detail?.value || this.filter
			},
			queryEffects() {
				const baseUrl = "/subpackages/tools/effect-library/effect-library-query-result/effect-library-query-result"
				let url = baseUrl + '?selected_task=' + this.selected_task
				url += ('&selected_target=' + this.selected_target)
				url += ('&filter=' + this.filter)
				url += ('&id=' + this.id)
				uni.navigateTo({
					url: url
				})
			}
		},
		watch: {
			selected_target(n, o) {
				console.log(n, o);
			},
			selected_task(n, o) {
				console.log(n, o);
			},
			filter(n, o) {
				console.log(n, o);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tag {
		padding: 2px 3px;
		display: inline-block;
		background-color: #1165BA;
		color: #fff;
		border-radius: 3px;
	}
	
	.footer {
		height: 100rpx;
		position: fixed;
		bottom: 0;
		// left: 0;
		// right: 0;
		display: flex;
		flex-direction: row;
		
		&-placeholder {
			height: 250rpx;
			background-color: #fff;
		}
		
		button {
			height: 100%;
			width: 600rpx;
			color: #eee;
			background-color: #1165BA;
		}
		
		picker {
			height: 100%;
			width: 150rpx;
			text-align: center;
			line-height: 100rpx;
			background-color: #1165BA;
			border-radius: 5px;
		}
	}
</style>
