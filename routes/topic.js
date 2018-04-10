const express = require('express')
const router = express.Router();

const TopicController = require('../controllers/TopicController')
const Fileupload = require('../middlewares/fileupload')

router.route('/add')
	.post(Fileupload('topicPic'),TopicController.add)

router.route('/find')
	.get(TopicController.find)

router.route('/remove')
	.get(TopicController.remove)

module.exports = router