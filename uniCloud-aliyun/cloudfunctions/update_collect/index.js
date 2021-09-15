'use strict';
// 收藏
const db = uniCloud.database()
/*
数据库操作符 db.command （操作数据库 Arr String ...)
*/
const dbCmd = db.command
exports.main = async (event, context) => {
	let {
		userId,
		articleId
	} = event
	// doc 
	let userInfo = await db.collection("user").doc(userId).get();
	let article_likes_ids = userInfo.data[0].article_likes_ids;
	
	let dbCmdFn = null;
	if (article_likes_ids.includes(articleId)) {
		dbCmdFn = dbCmd.pull(articleId)
	} else {
		dbCmdFn = dbCmd.addToSet(articleId)
	}
	// 没有await 添加不上
	await db.collection("user").doc(userId).update({
		article_likes_ids: dbCmdFn
	})

	//event为客户端上传的参数
	console.log('event : ', event)

	//返回数据给客户端
	return {
		code: 200,
		msg: "数据请求成功！",
		data: userInfo.data[0]
	}
};
