const topicModel = require('../models/topic.js')

// 添加精彩专题
const add = async(req, res, next) => {

	res.set('Content-Type','application/json; charset=utf8')
	const result = await topicModel.add({
		...req.body,
		topicPic:req.fileName
	})
	if (result) {
		res.render('position/succ.ejs',{
			data:JSON.stringify({
				message:'恭喜你:)专题添加成功'
			})
		})
	}else {
		res.render('position/err.ejs',{
			errorMsg:'专题信息添加失败:('
		})
	}
}

const find = async(req, res, next)=>{

	res.set('Content-Type','application/json; charset=utf8')
	const {count, start} = req.query
	const result = await topicModel.findlist({
		count,
		start
	})
	if (result) {
		res.render('position/succ.ejs',{
			data:JSON.stringify(result)
		})
	}else {
		res.render('position/err.ejs',{
			data:{
				message:'专题查询场馆信息失败'
			}
		})
	}
}

const remove = async(req, res, next) =>{

	res.set('Content-Type','application/json; charset=utf8')
	const id = req.params.id
	const result = await topicModel.remove(id)
	if (result) {
		res.render('position/succ.ejs',{
			data:JSON.stringify(result)			
		})
	}else {
		res.render('position/err.ejs',{
			data:{
				message:'专题信息删除失败'
			}
		})
	}
}

module.exports = {
	add,
	find,
	remove
}