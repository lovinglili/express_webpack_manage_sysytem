
const { UserModel }=require('./admin')
const mongoose  = require('../util/mongoose')
const UsersModel = mongoose.model('users',UserModel.UserModel)

const getUserDetailById = (id) => {
    return UsersModel
        .findById(id)
        .then(results => {
            console.log(results,"results");
            return results
        })
        
        .catch(err => {
            return false
        })
}

module.exports={
    getUserDetailById
}