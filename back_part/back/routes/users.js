var express = require('express');
var router = express.Router();
var auth = require('../middlewares/auth')
var users_controller =require('../controllers/users')
/* GET users listing. */

const resApplicationJson = (req, res, next) => {
    res.set('content-type', 'application/json; charset=utf8')
    next()
}
// 为/position中所有的路由都使用这个中间件
router.use(resApplicationJson)

router.post('/isSign',auth.userSigninAuth, users_controller.isSign);
router.post('/Detail', auth.userSigninAuth,users_controller.Detail);


module.exports = router;
