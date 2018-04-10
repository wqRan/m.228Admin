const mongoose = require('./config')

const SiteSchema = new mongoose.Schema({
	sitePic:{
		type:String,
		require:true
	},
	siteTitle:{
		type:String,
		require:true
	},
	siteLocal:{
		type:String,
		require:true
	},
	sitePre:{
		type:String,
		require:true
	}
})

const Sitelist = mongoose.model('Sitelist',SiteSchema)

const add = ({sitePic,siteTitle,siteLocal,sitePre}) => {
	return new Sitelist({
		sitePic,
		siteTitle,
		siteLocal,
		sitePre
	})
	.save()
	.then((result) => {
		return result
	})
	.catch((err) => {
		return false
	})
}

const findAll = () => {
	return Sitelist.find()
	.then((result) => {
		return result
	})
	.catch(() => {
		return false
	})
}

const remove = (id) => {
	return Sitelist.findByIdAndRemove(id)
	.then(() => {
		return true
	})
	.catch(() => {
		return false
	})
}

module.exports = {
	add,
	findAll,
	remove
} 