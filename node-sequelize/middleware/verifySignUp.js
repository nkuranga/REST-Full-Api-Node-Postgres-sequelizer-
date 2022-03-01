
const User = require('../models').User
const ROLES = require('../models').ROLES

checkDuplicateUsername = (req, res, next) => {

    User.findOne({
        where:{username: req.body.username}
    }).then(user=>{
        if(user){
            res.status(400).send({
                message: "Username Exist"
            })
        }
        next()
    })
}

checkRoleExisted = (req, res, next) => {
    const role = req.body.roles 
    if(role){
        for(let i = 0; i < role.lenght; i++){
            if(!ROLES.includes(role[i])){
                res.status(400).send({
                    message: "Role Does not Exist!!"
                })
            }
        }
    }
    next()

}

const verifySignUp = {
    checkDuplicateUsername : checkDuplicateUsername,
    checkRoleExisted : checkRoleExisted
}
module.exports = verifySignUp


