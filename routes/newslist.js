var express = require('express');
var router = express.Router();

const NewslistController = require('../controllers/NewslistController');
const Fileupload = require('../middlewares/fileupload')



router.route('/add')
	.post(Fileupload('showPic'),NewslistController.add)

router.route('/item/:id')
	.get(NewslistController.item)

router.route('/edit/:id')
	.post(Fileupload('showPic'),NewslistController.edit)

router.route('/remove/:id')
  .get(NewslistController.remove)

router.route('/list/:pageno')
  .get(NewslistController.list)

router.route('/find')
  .get(NewslistController.find)

router.route('/search/:find')
  .post(NewslistController.search)
  
module.exports = router