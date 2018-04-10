var express = require('express');
var router = express.Router();

const SitelistController = require('../controllers/SitelistController');
const Fileupload = require('../middlewares/fileupload')


router.route('/add')
	.post(Fileupload('sitePic'),SitelistController.add)

router.route('/find')
	.get(SitelistController.find)
	
// router.route('/item/:id')
// 	.get(SitelistController.item)

// router.route('/edit/:id')
// 	.post(Fileupload('sitePic'),SitelistController.edit)

router.route('/remove/:id')
  .get(SitelistController.remove)


module.exports = router















