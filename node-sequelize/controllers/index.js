const classroom = require('./classroom')
const lecturer = require('./lecturer')
const student = require('./student')
const course = require('./course')
const roles = require('./roles')
const signUp= require('./auth.controller')

module.exports ={
    classroom,
    lecturer,
    student,
    course,
    roles,
    signUp
}