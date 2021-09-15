'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	let {
		userName,
		password
	} = event;
	if (!userName && !password) return {
		code: 200,
		msg: "用户名或密码不能为空！"
	}
	
	let res = await db.collection("uni-user").add({
		userName,
		password
	})
	//event为客户端上传的参数
	console.log('event : ', event)

	//返回数据给客户端
	return {
		code:200,
		msg:"success"
	}
};
