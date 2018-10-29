
const bcrypt = require('bcrypt');
const errorData = (data, res, template) => {
    if ( !data ) {
        res.render(template, {
            code: 500,
            data: '发生了不可预知的错误'
        })
        return false
    }
    return true
}

const hash = (textplain) => {  
    const saltRounds = 10; // 加密强度 10
    return new Promise((resolve) => {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(textplain, salt, function(err, hash) {
                // Store hash in your password DB.
                resolve(hash)
            });
        });
    })
    
}


module.exports = {
    errorData,
    hash
}