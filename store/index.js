// 页面路径：store/index.js
import { createStore } from 'vuex'
const store = createStore({
	state: {//存放状态
		user: {
			"id": -1,
			"nickname": "未登录",
			"avatarUrl": "",
			"openid": ""
		}
	},
	mutations: {
		setUser(state, payload) {
			state.user = payload.user
		},
		removeUser(state) {
			state.user = {
				"id": -1,
				"nickname": "未登录",
				"avatarUrl": "",
				"openid": ""
			}
		}
	}
})

export default store

