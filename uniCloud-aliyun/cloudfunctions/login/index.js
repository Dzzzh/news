'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	let {
		userName,
		password
	} = event

	let res = await db.collection("uni-user").where({
		userName: userName
	}).get();
	if (res.data.length != 0) {

		if (res.data[0].password == password) {
			return {
				code: 200,
				data: res,
				msg: "数据请求成功！"
			}
		} else {
			return {
				code: 200,
				msg: "密码错误！"
			}
		}
	} else {
		return {
			code: 200,
			msg: "用户不存在！"
		}
	}

	//event为客户端上传的参数
	console.log('event : ', event)
}
