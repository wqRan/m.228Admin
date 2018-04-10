var express = require('express');
var router = express.Router();

const UserController = require('../controllers/UserController');
const Authenticata = require('../middlewares/authenticate');


/* GET users listing. */
router.route('/issignin')
	.get(Authenticata,UserController.issignin)

router.route('/signup')
	.post(UserController.signup)

router.route('/signin')
	.post(UserController.signin)

module.exports = router;
