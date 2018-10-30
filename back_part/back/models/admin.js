const mongoose =require('../util/mongoose');
const bcrypy=require('bcrypt');
const { hash}=require('../util');

var UserModel=mongoose.model('users',new mongoose.Schema({
    username:String,
    password:String,
    nickname:String,
    signupTime:String
}));


const signup =async ({username,password,nickname})=>{
    console.log(username)
    // let _password= await hash(password);
    // console.log(_password)

    return new UserModel({
        username,
        nickname,
        password:password,
        signupTime:Date.now()
    }).save()
    .then((result)=>{
        let {_id,username,nickname}=result;
        return { _id,username,nickname }
    }).catch(()=>{
        return false;
    })
}

const signin=async (pwd,{ password })=>{
    // return bcrypy.compare(pwd,password);
    return pwd==password;

}

const judgeUserByUsername=(username)=>{
    return UserModel.find({username})
    .then((result)=>{
        return result;
    })
    .catch(()=>{
        return false;
    })
}

module.exports={
    signup,
    signin,
    judgeUserByUsername,
    UserModel
}