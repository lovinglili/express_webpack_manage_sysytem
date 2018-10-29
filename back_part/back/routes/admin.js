const express=require('express');

var admin_controller = require('../controllers/admin')
const router=express.Router();

const resApplicationJson = (req, res, next) => {
    res.set('content-type', 'application/json; charset=utf8')
    next()
}
// 为/position中所有的路由都使用这个中间件
router.use(resApplicationJson)

router.post('/signin',admin_controller.signin);
router.post('/signup',admin_controller.signup);

module.exports = router;
