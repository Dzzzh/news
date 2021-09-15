import http from '../common/http.js';

export default {
	/*------------------------API----------------------*/
	getLabel: data => http({name:'get_label',data}),
	getList: data => http({name:'get_list',data}),
	updateCollect: data => http({name:'update_collect',data}),
	getSearch: data => http({name:'get_search',data}),
}
