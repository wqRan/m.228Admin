const newslistModel = require('../models/newslist.js')


// 数据库中添加
const add = async (req, res, next) => {

	res.set('Content-Type', 'application/json; charset=utf8')
	const result = await newslistModel.add({
		// showName,showTime,showLocal,showPrice,
		...req.body,
		showPic:req.fileName
	})
	if (result) {
		res.render('position/succ.ejs',{
			data:JSON.stringify({
				message:'恭喜你:) 数据添加成功'
			})
		})
	}else {
		res.render('position/err.ejs',{
			errorMsg:'数据添加失败:('
		})
	}

}


const list = async(req, res, next) => {
	res.set('Content-Type', 'application/json; charset=utf8')
	const pagesize = 5 
	const pageno = parseInt(req.params.pageno, 10)
	const docs = await newslistModel.findAll() || 0
	newslistModel.list({
		limit:pagesize,
		skip:pageno * pagesize,
		cb:(result) => {
			if (result) {
				res.render('position/succ.ejs',{
					data:JSON.stringify({
						result,
						pageno,
						pagesize,
						total:docs.length
					})
				})
			}else {
				res.render('position/err.ejs',{
					errorMsg:'数据获取失败'
				})
			}
		}
	})
}



// 寻找单独的一项
const item = async (req, res, next) => {
	res.set('Content-Type', 'application/json; charset=utf8')
	const id = req.params.id
	const result = await newslistModel.findOne(id)
	if (result) {
		res.render('position/succ.ejs',{
			data:JSON.stringify(result)
		})
	}
}


// 编辑操作

const edit = async(req, res, next) => {
	res.set('Content-Type','application/json; charset=utf8')
	const id = req.params.id
	const result = await newslistModel.update({
		id,
		...req.body,
		showPic:req.fileName
	})
	if (result) {
		res.render('position/succ.ejs',{
			data:true
		})
	}else {
		res.render('position/err.ejs',{
			data:false
		})
	}
}

// 删除数据
const remove = async (req, res, next) => {
	res.set('Content-Type', 'application/json; charset=utf8')
	const id = req.params.id
	const result = await newslistModel.remove(id)
	if (result) {
		res.render('position/succ.ejs',{
			data:true
		})
	}else {
		res.render('position/err.ejs',{
			data:false
		})
	}
}

//模糊搜索功能
const search = async(req, res, next) => {
	res.set('Content-Type','application/json; charset=utf8')
	const keywords = req.params.find
	const result = await newslistModel.search(keywords)
	if (result) {
		res.render('position/succ.ejs',{
			data:JSON.stringify(result)
		})
	}else {
		res.render('position/err.ejs',{
			data:{
				message:'查询失败'
			}
		})
	}
}

// m站数据接口
const find = async(req, res, next)=>{

	res.set('Content-Type','application/json; charset=utf8')
	const {count, start} = req.query
	const result = await newslistModel.findlist({
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
				message:'演出信息查询失败'
			}
		})
	}
}


module.exports = {
	add,
	list,
	item,
	edit,
	remove,
	search,
	find
}