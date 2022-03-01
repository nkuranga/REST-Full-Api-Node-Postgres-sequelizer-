
const jwt = require('jsonwebtoken')
const User = require('../models').User
const { secret } = require('../config/auth.config')

verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"]
    if(!token){
        return res.status(403).send({
            message: "No Token Provided"
        })
    }
    jwt.verify(token, secret, (err,decoded)=>{
        if(err){
            return res.status(400).send({
                message: "unauthorized"
            })
        }
        req.userId = decoded.id
        next()
    }) 
}

isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user=>{
        user.getRoles().then(role=>{
            for (let i=0; i < role.length ; i++){
                if(role[i].name === "Admin"){
                    next()
                    return
                }
                res.status(403).send({
                    message: "Require AdminRole"
                })
                return 
            }
        })
    })
}

isModerator = (req, res, next)=> {
    User.findByPk(req.userId).then(user=>{
        user.getRoles().then(role=>{
            for(let i =0; i<role.length; i++){
                if(role[i] === "moderator"){
                    next()
                    return
                }
                res.status(403).send({
                    message : "Require User Role"
                })
                return
            }
        })
    })
}

isModeratorOrAdmin = (req, res, next) =>{
    User.findByPk(req.userId).then(user=>{
        user.getRoles().then(role=>{
            for(let i = 0; i < role.length; i++){
                if(role[i] === "admin"){
                    next()
                    return
                }
                if(role[i] === "moderator"){
                    next()
                    return
                }
            }
            return res.status(403).send({
                message: "Require Admin or Moderator Role"
            })
        })
    })
}

const authJwt = {
    verifyToken: verifyToken,
    isAdmin : isAdmin,
    isModerator: isModerator,
    isModeratorOrAdmin: isModeratorOrAdmin
}
module.exports = authJwt