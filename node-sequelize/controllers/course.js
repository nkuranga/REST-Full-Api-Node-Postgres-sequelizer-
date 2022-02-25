

const Course = require('../models').Course
const Student = require('../models').Student
const Lecturer= require('../models').Lecturer

module.exports={
    addCourse(req, res){
        const courseDetails = req.body
        return Course.create(courseDetails)
               .then((course)=> res.status(200).send({
                   message: "Course Added"
               })).catch((error)=> res.status(400).send(error))
    },
    getCourses(req, res){
        return Course.findAll({
            include:[{
                model: Student,
                as : "student"
            },{
                model: Lecturer,
                as : "lecturer"
            }], order:[
                ["createdAt", "DESC"],
                [{model:Student, as: "student"}, "createdAt", "DESC"],
                [{model:Lecturer, as: "lecturer"}, "createdAt", "DESC"]
            ],

        }).then((course)=> res.status(200).send(course))
          .catch((error)=> res.status(400).send(error))

    },
    singleCourse(req, res){
        return Course.findByPk(req.params.id).then((course)=> res.status(200).send(course))
          .catch((error)=> res.status(400).send(error))
    },
    updateCourse(req, res){
        return Course.findByPk(req.params.id)
            .then((course)=>{
                if(!course){
                    res.status(404).send({
                        message: "Course Not Found"
                    })
                }
                return course.update({
                    course_name : req.body.course_name || course.course_name
                }).then((course)=> res.status(200).send({
                    message: "Updated",
                    courseName: course.course_name
                })).catch((error)=> res.status(400).send(error))
            })
    },
    deleteCourse(req, res){
        return Course.findByPk(req.params.id)
                .then((course)=> {
                    if(!course){
                        res.status(404).send({
                            message: "Course Not Found"
                        })
                    }
                    return course.destroy().then((course)=> res.status(200).send({
                        message: "Deleted!!"
                    }))
                        .catch((error)=> res.status(400).send(error))
                })
    }
    
}
