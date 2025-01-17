const express = require('express');
const {
  createCourse,
  updateCourse,
  deleteCourse,
  viewEnrolledStudents,
  gradeStudent,
  getInstructorCourses,
} = require('../../controllers/instructorController');
const { authenticate } = require('../../middlewares/auth'); // Authentication middleware
const { requireRole } = require('../../middlewares/roleMiddleware'); // Role middleware

const router = express.Router();

// Ensure user is authenticated and has the 'instructor' role
router.use(authenticate);
router.use(requireRole('instructor'));

// Define instructor routes
router.post('/course', createCourse); // Create a course
router.put('/course', updateCourse); // Update a course
router.delete('/course/:courseId', deleteCourse); // Delete a course
router.get('/course/:courseId/students', viewEnrolledStudents); // View enrolled students
router.post('/course/grade', gradeStudent); // Grade students
router.get('/courses', getInstructorCourses); // Fetch courses created by the instructor


module.exports = router;
