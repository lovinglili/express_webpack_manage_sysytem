

const admin_model=require('../models/admin');
const { errorData } = require('../util')

const signin=async (req,res, next)=>{

    //先判断该用户是否存在
    //不存在则返回该用户不存在
    //存在了，判断密码，然后正确则返回成功标志使前端跳转

    let _judge_result= await admin_model.judgeUserByUsername(req.body.username);
    if(!!_judge_result.length){//如果有这个用户
        let _data=await admin_model.signin(req.body.password, _judge_result[0]);

        if(_data){
            res.render('admin',{
                code:200,
                data:JSON.stringify('success')
            })
        }else{
            res.render('admin',{
                code:202,
                data:JSON.stringify('用户名不存在')
            })
        }
    }
}

const signup=async (req,res,next)=>{
    //先判断该用户是否存在
    //不存在就注册，注册成功之后跳转到sigin界面；
    //存在了就提示用户该账号已存在，
   
    let _judge_result=await admin_model.judgeUserByUsername(req.body.username);
   
    if(!_judge_result.length){//如果没有这个用户
        if(!req.body.nickname) req.body.nickname=req.body.username;

        //注册
        console.log(req.body)
        let _data =await admin_model.signup(req.body);
        console.log(_data)
        let _err=errorData(_data,res,'admin');
        
        if( _err )res.render('admin',{
            code:200,
            data:JSON.stringify(_data)
        })
        
    }
}

module.exports={
    signin,
    signup
}

