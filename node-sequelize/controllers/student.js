const Student = require('../models').Student
const Course = require('../models').Course
const Classroom = require('../models').Classroom


module.exports={
    addStudents(req, res){
        const studentDetails = req.body
        return Student.create(studentDetails)
        .then(()=> res.status(200).send({
            message: 'Student Saved'
        })).catch((error)=> res.status(400).send(error))
    },
    addStudentWithCurse(req, res){
        return Student.create({
            student_name: req.body.student_name,
            course: req.body
        },{
            include:[{
                model: Course,
                as : 'course'
            },{
                model: Classroom,
                as : "classroom"
            }]
        }).then((student)=> res.status(200).send({
            message: "Student Added with Course"
        }))
        .catch((error)=> res.status(400).send(error))
    },

    getAllStudent(req, res){
        return Student.findAll({
            include:[{
                model: Course,
                as : 'course'
            },{
                model: Classroom,
                as : "classroom"
            }],
            order :[
                ["createdAt", "DESC"],
                [{model: Course, as:'course'}, "createdAt", "DESC"]
            ]
        }).then((student)=> res.status(200).send(student))
        .catch((error)=> res.status(400).send(error))
    },
    getSingleStudent(req, res){
        return Student.findByPk(req.params.id,{
            include:[{
                model: Course,
                as : "course"
            },{
                model: Classroom,
                as : "classroom"
            }]
        }).then((student)=> res.status(200).send(student))
            .catch((error)=> res.status(400).send(error))
    },
    updateStudent(req,res){
        const studentId = req.params.id
        return Student.findByPk(studentId)
                .then((student)=>{
                    if(!student){
                        res.status(404).send({
                            message: "Student Not Found"
                        })
                    }
                    return student.update({
                        student_name : req.body.student_name || student.student_name
                    }).then((student)=>res.status(200).send(student))
                    .catch((error)=> res.status(400).send(error))
                }).catch((error)=> res.status(400).send(error))

    },
    deleteStudent(req, res){
        const studentId = req.params.id
        return Student.findByPk(studentId, {
            include:[{
                model: Course,
                as : "course"
            }]
        }).then((student)=>{
            if(!student){
                res.status(404).send({
                    message: "Student Not Found"
                })
            }
            return student.destroy().then((student)=> res.status(200).send(student))
                    .catch((error)=> res.status(400).send(error))
        })
    }
}