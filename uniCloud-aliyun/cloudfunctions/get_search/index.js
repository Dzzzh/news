'use strict';
//连接数据库
const db = uniCloud.database()
// 聚合操作符
const $ = db.command.aggregate
exports.main = async (event, context) => {
	//接受分类，通过分类筛选数据
	let {
		userId,
		name,
		value
	} = event;

	const userInfo = await db.collection("user").doc(userId).get()
	const article_likes_ids = userInfo.data[0].article_likes_ids

	//聚合：更精细化的去处理数据、求和、分组、指定字段
	const list = await db.collection("article")
		//获取数据库集合的聚合操作实例
		.aggregate()
		// 添加新字段到输出的记录。经过 addFields 聚合阶段，输出的所有记录中除了输入时带有的字段外，还将带有 addFields 指定的字段
		.addFields({
			is_like: $.in(["$_id", article_likes_ids]) //in P43 1.40
		})
		
		//把指定的字段传递给下一个流水线，指定的字段可以是某个已经存在的字段，也可以是计算出来的新字段。
		.project({
			content: 0 //指定需要返回的字段 true 只返回这个字段 false 不返回
		})
		//根据条件过滤文档，并且把符合条件的文档传递给下一个流水线阶段。
		.match({
			title:new RegExp(value)
		})
		//标志聚合操作定义完成，发起实际聚合操作
		.end()
	//返回数据给客户端
	return {
		code: 200,
		msg: "数据请求成功",
		data: list.data,
	}
};
