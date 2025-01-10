/**
const express = require('express');
const {
  enrollCourse,
  getEnrolledCourses,
  updateProgress,
} = require('../../controllers/studentcontrollers');

const router = express.Router();

// Enroll in a course
router.post('/enroll', enrollCourse);

// Get all enrolled courses
router.get('/:userId/courses', getEnrolledCourses);

// Update course progress
router.post('/progress', updateProgress);

module.exports = router;
*/

const express = require('express');
const {
  enrollCourse,
  getEnrolledCourses,
  updateProgress,
  getAvailableCourses,
} = require('../../controllers/studentcontrollers');
const { authenticate } = require('../../middlewares/auth'); // Authentication middleware
const { requireRole } = require('../../middlewares/roleMiddleware'); // Role middleware

const router = express.Router();

// Ensure user is authenticated and has the 'student' role
router.use(authenticate);
router.use(requireRole('student'));

// Enroll in a course
router.post('/enroll', enrollCourse);

// Get all enrolled courses
router.get('/:userId/courses', getEnrolledCourses);

// Update course progress
router.post('/progress', updateProgress);

// Get available courses
router.get('/courses', getAvailableCourses); // Fetch all available courses for students

module.exports = router;

