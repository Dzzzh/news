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
		page = 1,
		size = 10
	} = event;
	let matchData = {}
	if (name !== "全部") {
		matchData = {
			classify: name
		}
	}

	const userInfo = await db.collection("user").doc(userId).get()
	const article_likes_ids = userInfo.data[0].article_likes_ids

	//聚合：更精细化的去处理数据、求和、分组、指定字段
	const list = await db.collection("article")
		//获取数据库集合的聚合操作实例
		.aggregate()
		// 添加新字段到输出的记录。经过 addFields 聚合阶段，输出的所有记录中除了输入时带有的字段外，还将带有 addFields 指定的字段
		.addFields({
			is_like: $.in(["$_id",article_likes_ids]) //in P43 1.40
		})
		//根据条件过滤文档，并且把符合条件的文档传递给下一个流水线阶段。 
		.match(matchData)
		//把指定的字段传递给下一个流水线，指定的字段可以是某个已经存在的字段，也可以是计算出来的新字段。
		.project({
			content: 0 //指定需要返回的字段 true 只返回这个字段 false 不返回
		})
		/*
		skip 指定一个正整数，跳过对应数量的文档，输出剩下的文档。，常用于分页 
		size*(page-1)  要跳过多少数据
		*/
		.skip(size * (page - 1))
		/*
		limit 聚合阶段。限制输出到下一阶段的记录数 （限制输出多少条数据）
		*/
		.limit(size)
		//标志聚合操作定义完成，发起实际聚合操作
		.end()

	// const list = await db.collection("article")
	// 	.field({ // field	指定需要返回的字段 true 只返回这个字段 false 不返回
	// 		content: false
	// 	}).get()

	//返回数据给客户端
	return {
		code: 200,
		msg: "数据请求成功",
		data: list.data,
	}
};
