

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

const check=async(req,res)=>{

console.log(req.token,"tokens");
//判断权限，前端哪个地方判断权限直接调用前端的allow函数，根据返回的代码来判断是渲染还是提示用户没有权限；
if(req.token.level>7){
    res.send("200");
}
else{
    res.send("304");
}
}

//权限处理还可以在后端调用controller里面position.js里面的函数之前做判断（这个判断可以做一个中间件，谁需要谁调用),判断之前需要解析token，需要前端请求的时候
//将token带过来。
module.exports = {
    isSign,
    Detail,
    check
}