

const users_model = require('../models/users');

const isSign = (req, res, next) => {
    //判断是否登录 对token进行解密 在middleware创建一个中间件，调用该函数之前调用
 
        res.render('user', {
            code: 200,
            data: JSON.stringify({ msg: '用户已登录' })
        })
 
}
const Detail = async (req, res, next) => {
    let _result = await users_model.getUserDetailById(req.token.userid);
    res.render('user', {
        code: 200,
        data: JSON.stringify({
            userid: _result._id,
            username: _result.username,
            nickname: _result.nickname,
        })
    })

}


module.exports = {
    isSign,
    Detail
}