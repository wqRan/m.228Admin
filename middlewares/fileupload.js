const multer = require('multer')
const path = require('path')

let fileName = ''
const storage = multer.diskStorage({
	destination:(req, file ,cb) => {
		cb(null, path.resolve(__dirname,'../public/uploads'))
	},
	filename:(req, file, cb) => {
		fileName = file.fieldname + '-' + new Date().getTime() + '.' +getExtention(file.originalname)
		cb(null, fileName)
	}
})

const fileFilter = (req, file, cb) => {
	if (file.originalname.match(/\.(png|jpg|jpeg|gif)$/i)) {
		cb(null, true)
	}else {
		cb(new Error('image only!!'))
	}
}

function getExtention(str){
	const result = str.split('.')
	return result[result.length - 1]
}

const Fileupoad = (fieldName) => {
	return (req, res, next) => {
		res.set('Content-Type','application/json; charset = utf8')
		const upload = multer({
			storage,fileFilter
		}).single(fieldName)
		upload(req, res, (err) => {
			if (err) {
				res.render('position/err.ejs', { errorMsg: err.message })
			}else {
				req.fileName = fileName
				next()
			}
		})
	}
}

module.exports = Fileupoad