var express = require('express');
var router = express.Router();
const classroomController = require('../controllers').classroom
const lecturerController = require('../controllers').lecturer
const studentController = require('../controllers').student
const courseController = require('../controllers').course
const userController = require('../controllers/user.controller')
const controller = require('../controllers/auth.controller')
const {authJwt,verifySignUp} = require('../middleware')
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.post('/api/v1/auth/signUp',
    [
      verifySignUp.checkDuplicateUsername,
      verifySignUp.checkRoleExisted
    ],
    controller.signUp
    )
    router.post('/api/v1/auth/signIn', controller.signIn)
  
  //signin routes 
  
    router.get("/api/v1/test/all", userController.allAccess)
    router.get("/api/v1/test/user",
          [authJwt.verifyToken],
          userController.userBoard
    )
    router.get("/api/v1/test/moderator", 
          [authJwt.verifyToken, authJwt.isModerator],
          userController.userModerator
    )
    router.get("/api/v1/test/admin", 
          [authJwt.verifyToken, authJwt.isAdmin],
          userController.adminBoard
    )




// classrom Routes

router.post('/api/v1/classroom', classroomController.add)
router.get('/api/v1/classroom', classroomController.list)
router.get('/api/v1/classroom/:id', classroomController.getById)
router.put('/api/v1/classroom/:id', classroomController.update)
router.delete('/api/v1/classroom/:id', classroomController.delete)

//Lecturer Routes

router.post('/api/v1/lecturer', lecturerController.addLecturer)
router.get('/api/v1/lecturer', lecturerController.listOfLecturer)
router.get('/api/v1/lecturer/:id', lecturerController.getSingleLecturer)
router.put('/api/v1/lecturer/:id', lecturerController.updateLecturer)
router.delete('/api/v1/lecturer/:id', lecturerController.deleteLecturer)

//Student Routes
router.post('/api/v1/student', studentController.addStudents)
router.get('/api/v1/student', studentController.getAllStudent)
router.get('/api/v1/student/:id', studentController.getSingleStudent)
router.put('/api/v1/student/:id', studentController.updateStudent)
router.delete('/api/v1/student/:id', studentController.deleteStudent)

//cousrses
router.post('/api/v1/course', courseController.addCourse)
router.get('/api/v1/course', courseController.getCourses)
router.get('/api/v1/course/:id', courseController.singleCourse)
router.put('/api/v1/course/:id', courseController.updateCourse)
router.delete('/api/v1/course/:id', courseController.deleteCourse)

module.exports = router;
