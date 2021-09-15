import Vue from 'vue'
import App from './App'
import store from './store'
// 引入全局uView
import uView from 'uview-ui'
Vue.use(uView)

//引入api
import api from 'api/index.js'
Vue.prototype.$api = api;

Vue.config.productionTip = false

App.mpType = 'app'
const app = new Vue({
	store,
	...App
})
app.$mount()
