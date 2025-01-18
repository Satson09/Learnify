const express = require('express');
const {
  createCourse,
  updateCourse,
  deleteCourse,
  viewEnrolledStudents,
  gradeStudent,
  getInstructorCourses,
} = require('../../controllers/instructorController'); // Ensure all functions are properly imported
const { authenticate } = require('../../middlewares/auth'); // Authentication middleware
const { requireRole } = require('../../middlewares/roleMiddleware'); // Role middleware
const upload = require('../../middlewares/upload'); // Middleware for file uploads

const router = express.Router();

// Ensure user is authenticated and has the 'instructor' role
router.use(authenticate);
router.use(requireRole('instructor'));

// Define instructor routes
router.post('/course', upload.array('files', 5), createCourse); // Create a course with file uploads
router.put('/course', upload.array('files', 5), updateCourse); // Update a course with optional file uploads
router.delete('/course/:courseId', deleteCourse); // Delete a course
router.get('/course/:courseId/students', viewEnrolledStudents); // View enrolled students
router.post('/course/grade', gradeStudent); // Grade students
router.get('/courses', getInstructorCourses); // Fetch courses created by the instructor

module.exports = router;

