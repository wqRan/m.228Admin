const jwt = require('jsonwebtoken')


// const fs = require('fs')
// const path = require('path')
// const publicKey = fs.readFileSync(path.resolve(__dirname,'../controllers/config/public.key'))


const Authenticate = (req,res,next) => {
	const token = req.header('X-Access-Token')

	jwt.verify(token,'yongle',(err,decoded) =>{
		if (err) {
			res.render('user/issignin.ejs',{
				username:'',
				issignin:false
			})
		}else {
			req.username = decoded.username
			next()
		}
	})
}

module.exports = Authenticate
