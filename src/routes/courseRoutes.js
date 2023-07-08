// get all courses by single creator
// get all courses by all creators
// create a courses
// delete a courses
// update a courses

const express = require('express');
const prisma = require('../Database');
const {
  courseGet,
  courseSearch,
  singleCourse,
  courseDelete,
  coursePatch,
  coursePost,
} = require('../controllers/courseController');
const auth = require('../middlewares/auth');

const courseRouter = express.Router();
courseRouter.get('/categories', courseSearch);
courseRouter.get('/showcourse', courseGet);
courseRouter.get('/singlecourse/:id', singleCourse);
courseRouter.patch('/courseupdate/:id', coursePatch);
courseRouter.delete('/coursedelete', auth, courseDelete);
courseRouter.post('/coursepost', auth, coursePost);

module.exports = courseRouter;
