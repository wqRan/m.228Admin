const userModel = require('../models/user.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require('fs')


// 是否登录
const issignin = (req,res,next) => {
	res.render('user/issignin.ejs',{
		issignin:true,
		username:req.username
	})
}


// 注册
const signup = (req,res,next) => {
	const username = req.body.username
	const password = req.body.password

	bcrypt.hash(password,10)
	.then((cryptPassword) => {
		userModel.signup({
			username,
			password:cryptPassword,
			cb:(result) =>{
				if (result) {
					res.render('user/signup.ejs',{success:result})
				}else {
					res.render('user/signup.ejs',{success:false})						
				}
			}})
	})
}

// 登录
const signin = (req,res,next) => {

	// res.set('Content-Type', 'application/json; charset=utf8')

	const username = req.body.username
	const password = req.body.password
	console.log(username,password)

	userModel.signin({username,password,cb:(result) => {
		if (result) {
			bcrypt.compare(password,result.password)
			.then((compareResult) => {
				if (compareResult) {
					res.render('user/signin.ejs',{
						success:true,
						token:genToken(result.username),
						username:result.username
					})
				}else {
					res.render('user/signin.ejs',{
						success:false,
						token:'',
						username:''
				})
				}
			})
		}else {
			res.render('user/signin.ejs',{
						success:false,
						token:'',
						username:''
				})
		}
	}})
}


const path = require('path')
function genToken(username){

	const payload = {
		username
	}
	
	// const privateKey = fs.readFileSync(path.resolve(__dirname,'/config/public.key'))
	// const privateKey = fs.readFileSync('./config/public.key')
	// console.log(privateKey)
	// const token = jwt.sign(payload, privateKey, { algorithm: 'RS256'})

	const secret = "yongle"
	const token = jwt.sign(payload,secret)
	return token
}
module.exports = {
	issignin,
	signup,
	signin
}