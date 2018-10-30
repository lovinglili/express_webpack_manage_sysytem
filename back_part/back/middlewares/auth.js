const jwt = require('jsonwebtoken');

const userSigninAuth=(req,res,next)=>{
    try{
        
        var decoded=jwt.verify(req.body.token,'i');
        
        let _time = (Date.now()/1000)-decoded.italics;
        let _expires=30;
        if(_time>_expires){
            
            res.render('user',{
                code:403,
                data:JSON.stringify({msg:'登录过期，请重新登录'})
            })
        }else{
            req.token=decoded;
            next();
        }
    }catch(err){
      
        res.render('user',{
            code:403,
            data:JSON.stringify({msg:'请登录后操作'})
        })
    }
}
module.exports={
    userSigninAuth
}