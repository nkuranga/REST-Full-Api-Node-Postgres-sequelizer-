
// const Lecturer = require('../models/lecturer').Lecturer
const Lecturer = require('../models').Lecturer
const Course = require('../models').Course

module.exports= {
    listOfLecturer(req, res){
        return Lecturer.findAll({
            include:[{
                model: Course,
                as : 'course'
            }]
        }).then((lecturer)=> res.status(200).send(lecturer))
        .catch((error)=> {
            res.status(400).send(error)
            console.log(error)
        })
    },
    
    async getSingleLecturer(req, res){
        return await Lecturer
        .findByPk(req.params.id, {
            include:[{
                model: Course,
                as : 'course'
            }]
        }).then((lecturer)=> {
            if(!lecturer){
                message: "not found"
            }
            res.status(200).send(lecturer)
        })
        .catch((error)=> res.status(400).send(error))
    },
    updateLecturer(req, res){
        return Lecturer.findByPk(req.params.id).then(
            (lecturer)=>{
                if(!lecturer){
                   return res.status(404).send({
                        mesaage: 'Lecturer NoT Found!'
                    })
                }
                return lecturer.update({
                    lecturer_name:req.body.lecture_name || lecturer.lecture_name
                }).then((lecturer)=> res.status(200).send(lecturer))
                .catch((error)=>{
                    res.status(200).send(error)
                    console.log(error)
                })
            }
        ).catch((error)=> res.status(200).send(error))
    },

    addLecturer(req, res) {

        return Lecturer.create({
            lecturer_name: req.body.lecturer_name
        })
            .then((lecturer)=> res.status(201).send(lecturer))
            .catch((error)=> res.status(400).send(error))
    },
    deleteLecturer(req, res){
        return Lecturer.findByPk(req.params.id,{
            include:[{
                model: Course,
                as : 'course'
            }]
        }).then((lecturer)=>{
            if(!lecturer){
                return res.status(404).send({
                    message: 'Lecturer Not Found'
                })
            }
            return lecturer.destroy().then(
                (lecture)=> res.status(201).send(lecture)
            ).catch((error)=> res.status(400).send(error))
        }).catch((error)=> res.status(400).send(error))
    }
}
