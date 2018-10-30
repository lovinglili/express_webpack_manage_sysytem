var express = require('express');
var router = express.Router();
var users_controller =require('../controllers/users')
/* GET users listing. */

const resApplicationJson = (req, res, next) => {
    res.set('content-type', 'application/json; charset=utf8')
    next()
}
// 为/position中所有的路由都使用这个中间件
router.use(resApplicationJson)

router.post('/isSign', users_controller.isSign);
router.post('/Detail', users_controller.Detail);
router.post('/exit',users_controller.exit);


module.exports = router;
