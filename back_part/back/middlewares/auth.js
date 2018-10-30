const jwt = require('jsonwebtoken');
const fs=require('fs');
const PATH=require('path')

const userSigninAuth=(req,res,next)=>{
    try{
        let _public = fs.readFileSync(PATH.resolve(__dirname, '../keys/public.key'))
        let decoded = jwt.verify(req.body.token, _public, { algorithms: 'RS256' })
        
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
      alert("df")      
        res.render('user',{
            code:403,
            data:JSON.stringify({msg:'请登录后操作'})
        })
    }
}
module.exports={
    userSigninAuth
}