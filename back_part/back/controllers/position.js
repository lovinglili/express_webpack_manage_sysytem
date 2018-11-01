
const { errorData } = require('../util')
var position_model=require('../models/data')

const list= async (req,res)=>{
    res.set('content-type', 'application/json; charset=utf8');
    let _data=await position_model.list(req.query);
    let _err=errorData(_data,res,'position');
    if( _err )res.render('position',{
        code:200,
        data:JSON.stringify(_data)
    })
}

const save= async (req,res)=>{
    res.set('content-type', 'application/json; charset=utf8');
    if(req.body.companyLogo==""){
        req.body.companyLogo="/uploads/logos/bg.jpg";
    }
    let _data=await position_model.save(req.body);
    let _err=errorData(_data,res,'position');
    if( _err )res.render('position',{
        code:201,
        data:JSON.stringify('用户名已经存在')
    })
    

}

const remove= async (req,res)=>{
    res.set('content-type', 'application/json; charset=utf8');
   
    let _data=await position_model.remove(req.body);
    let _err=errorData(_data,res,'position');
    if( _err )res.render('position',{
        code:200,
        data:JSON.stringify(_data)
    })
    
}
const getone= async (req,res)=>{
    res.set('content-type', 'application/json; charset=utf8');

    let _data=await position_model.getone(req.body);
    let _err=errorData(_data,res,'position');
    if( _err )res.render('position',{
        code:200,
        data:JSON.stringify(_data)
    })
    
}

const update= async (req,res)=>{
    res.set('content-type', 'application/json; charset=utf8');
    let _data=await position_model.update(req.body);
    let _err=errorData(_data,res,'position');
    if( _err )res.render('position',{
        code:200,
        data:JSON.stringify(_data)
    })
    
}

module.exports={
    save,
    remove,
    getone,
    update,
    list
}