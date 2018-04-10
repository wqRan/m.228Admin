const siteModel = require('../models/site.js')

// 数据库中添加场馆信息
const add = async (req, res, next)=>{

	res.set('Content-Type','application/json; charset=utf8')
	const result = await siteModel.add({
		...req.body,
		sitePic:req.fileName
	})
	if (result) {
		res.render('position/succ.ejs',{
			data:JSON.stringify({
				message:'恭喜你:)场馆信息添加成功'
			})
		})
	}else {
		res.render('position/err.ejs',{
			errorMsg:'场馆信息添加成功:('
		})
	}

}

const find = async(req, res, next)=>{

	res.set('Content-Type','application/json; charset=utf8')
	const result = await siteModel.findAll()
	if (result) {
		res.render('position/succ.ejs',{
			data:JSON.stringify(result)
		})
	}else {
		res.render('position/err.ejs',{
			data:{
				message:'查询场馆信息失败'
			}
		})
	}

}

const remove = async(req, res, next) =>{

	res.set('Content-Type','application/json; charset=utf8')
	const id = req.params.id
	const result = await siteModel.remove(id)
	if (result) {
		res.render('position/succ.ejs',{
			data:JSON.stringify(result)			
		})
	}else {
		res.render('position/err.ejs',{
			data:{
				message:'场馆信息删除失败'
			}
		})
	}

}



module.exports = {
	add,
	find,
	remove
}