

const users_model = require('../models/users');

const isSign = (req, res, next) => {
    console.log(req.session.userInfo,"isSigin")
    if (req.session.userInfo) {
        
        res.render('user', {
            code: 200,
            data: JSON.stringify({ msg: '用户已登录' })
        })
    } else {
        res.render('user', {
            code: 201,
            data: JSON.stringify({ msg: '用户未登录' })
        })
    }
}
const Detail = async (req, res, next) => {
    let _result = await users_model.getUserDetailById(req.session.userInfo.userid)

    res.render('user', {
        code: 200,
        data: JSON.stringify({
            userid: _result._id,
            username: _result.username,
            nickname: _result.nickname,
        })
    })

}
const exit = (req, res, next) => {
    req.session.userinfo = null;
    res.render('user', { code: 200, data: JSON.stringify({ msg: '删除成功' }) })
}


module.exports = {
    isSign,
    Detail,
    exit
}