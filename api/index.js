//批量导出文件
const requireApi = require.context(
	//api 目录的相对路径
	".",
	//是否查询子目录
	false,
	//查询文件的后缀
	/.js$/
)
let module = {}
requireApi.keys().forEach(item=>{
	if(item ==="./index.js")return;
	Object.assign(module,requireApi(item))
})
console.log(module);
export default module.default