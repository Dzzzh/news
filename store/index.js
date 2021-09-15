//Vuex 状态管理
import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

const store = new Vuex.Store({
		
	state:{
		historyLists:[]
	},
	mutations:{
		SET_HISTOREY_LISTS(state,history){
			console.log(history);
			state.historyLists = history
		}
	},
	actions:{
		set_history({commit,state},history){
			let list = state.historyLists
			list.unshift(history)
			commit("SET_HISTOREY_LISTS",list)
		}
	}
})
export default store