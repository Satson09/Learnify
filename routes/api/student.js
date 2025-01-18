
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

// Fetch enrolled courses
router.get('/enrolled-courses', getEnrolledCourses);

// Update course progress
router.post('/progress', updateProgress);

// Get available courses
router.get('/courses', getAvailableCourses); // Fetch all available courses for students

module.exports = router;

