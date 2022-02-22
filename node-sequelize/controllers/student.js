const Student = require('../models').Student
const Course = require('../models').Course


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
            }],
            order :[
                ["createdAt", "DESC"],
                [{model: Course, as:'course'}, "createdAt", "DESC"]
            ]
        }).then((student)=> res.status(200).send(student))
        .catch((error)=> res.status(400).send(error))
    }
}