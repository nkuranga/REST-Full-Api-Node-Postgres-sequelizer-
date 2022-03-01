
const User = require('../models').User
const Role= require('../models').Role
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Op = require('../models').Op
const {secret} = require('../config/auth.config')

module.exports ={
    signUp(req, res){
        return User.create({
            username:req.body.username,
            password: bcrypt.hashSync(req.body.password, 8)
        }).then((user)=> {
            if(req.body.roles){
                Role.findAll({
                    where:{
                        name:{
                            [Op.or]: req.body.roles
                        }
                    }
                }).then(roles=>{
                    user.getRoles(roles).then(()=>{
                        return res.send({
                            message: "User was registered Successfully"
                        })
                    })
                })
            }else{
                //user = 1
                //set user to index 1 ["user"] as role
                user.setRoles([1]).then(()=>{
                    return res.send({
                        message: "User was registered Successfully"
                    })
                })

            }
        }).catch((err)=> res.status(500).send({message: err.message}))
    },
    //sign in function 

    signIn (req, res){
        User.findOne({
                where:{
                    username: req.body.username
                }
            }).then(user=>{
                if(!user){
                    return res.status(404).send({
                        message: "User Not Found"
                    })
                }
                let passwordIsValid = bcrypt.compareSync(
                    req.body.password, user.password
                )
                if(!passwordIsValid){
                    return res.status(404).send({
                        accessToken: null,
                        message: "Password Invalid"
                    })
                }
                let token = jwt.sign({id: user.id}, secret,{
                    expiresIn: 86400 //expire in 24 hours
                })
                var authorities = []
                user.getRoles().then(roles=>{
                    for( let i = 0; i<roles.length; i++){
                        authorities.push("ROLE_" +roles[i].name.toUpperCase())
                    }
                    res.status(200).send({
                        id: user.id,
                        username: user.username,
                        roles: authorities,
                        accessToken: token
                    })
                })
            }).catch((err)=>{
                res.status(400).send({message: err.message})
            })

    }
}
