const Student = require('../model/student');
const Course = require('../model/course');
const { sendError } = require('../utils/helper');

/**
 * Enroll in a course.
 * @param {Request} req - The request object containing courseId in the body.
 * @param {Response} res - The response object to return the result.
 */
exports.enrollCourse = async (req, res) => {
  try {
    const userId = req.user.id; // Extract userId from token
    const { courseId } = req.body;

    // Find the student's profile by userId
    const student = await Student.findOne({ userId });
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student profile not found!' });
    }

    // Check if the course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found!' });
    }

    // Check if the student is already enrolled
    if (student.enrolledCourses.includes(courseId)) {
      return res.status(400).json({ success: false, message: 'You are already enrolled in this course.' });
    }

    // Enroll the student in the course
    student.enrolledCourses.push(courseId);
    await student.save();

    res.status(200).json({
      success: true,
      message: `Successfully enrolled in ${course.title}!`,
    });
  } catch (error) {
    console.error('Error during enrollment:', error);
    res.status(500).json({ success: false, message: 'Failed to enroll in course.' });
  }
};

/**
 * Fetch all available courses for students.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object returning the list of available courses.
 */
exports.getAvailableCourses = async (req, res) => {
  try {
    console.log('Fetching available courses...');
    const courses = await Course.find(); // Fetch all courses
    res.status(200).json({
      success: true,
      courses,
    });
  } catch (error) {
    console.error('Error fetching available courses:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch courses.' });
  }
};

/**
 * Get all enrolled courses for a student.
 * @param {Request} req - The request object containing the userId in params.
 * @param {Response} res - The response object returning the enrolled courses.
 */
exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id; // Extract userId from token

    // Find the student's profile by userId
    const student = await Student.findOne({ userId }).populate('enrolledCourses');
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student profile not found!' });
    }

    res.status(200).json({
      success: true,
      enrolledCourses: student.enrolledCourses,
    });
  } catch (error) {
    console.error('Error fetching enrolled courses:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch enrolled courses.' });
  }
};

/**
 * Update course progress for a student.
 * @param {Request} req - The request object containing courseId and progress in the body.
 * @param {Response} res - The response object confirming the update operation.
 */
exports.updateProgress = async (req, res) => {
  try {
    const userId = req.user.id; // Extract userId from token
    const { courseId, progress } = req.body;

    // Find the student's profile by userId
    const student = await Student.findOne({ userId });
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student profile not found!' });
    }

    // Check if the student is enrolled in the course
    if (!student.enrolledCourses.includes(courseId)) {
      return res.status(400).json({ success: false, message: 'You are not enrolled in this course.' });
    }

    // Update progress
    student.progress.set(courseId, progress); // Using a Map field in MongoDB schema
    await student.save();

    res.status(200).json({
      success: true,
      message: `Progress for course ${courseId} updated to ${progress}%!`,
    });
  } catch (error) {
    console.error('Error updating course progress:', error);
    res.status(500).json({ success: false, message: 'Failed to update progress.' });
  }
};


/**
const Student = require('../model/student');
const Course = require('../model/course');
const { sendError } = require('../utils/helper');


 * Enroll in a course.
 * @param {Request} req - The request object containing courseId in the body.
 * @param {Response} res - The response object to return the result.
 *
exports.enrollCourse = async (req, res) => {
  const { userId, courseId } = req.body;

  try {
    const student = await Student.findOne({ userId });
    if (!student) {
      return sendError(res, 'Student profile not found!');
    }

    if (student.enrolledCourses.includes(courseId)) {
      return sendError(res, 'Already enrolled in this course!');
    }

    student.enrolledCourses.push(courseId);
    await student.save();

    res.json({ success: true, message: 'Successfully enrolled in the course!' });
  } catch (err) {
    console.error(err);
    sendError(res, 'An error occurred while enrolling.');
  }
};

// Get enrolled courses
exports.getEnrolledCourses = async (req, res) => {
  const { userId } = req.params;

  try {
    console.log('Finding student with userId:', userId);
    const student = await Student.findOne({ userId }).populate('enrolledCourses');
    console.log('Student found:', student);

    if (!student) {
      return sendError(res, 'Student profile not found!');
    }

    console.log('Enrolled Courses:', student.enrolledCourses);
    res.json(student.enrolledCourses);
  } catch (err) {
    console.error('Error occurred:', err);
    sendError(res, 'An error occurred while fetching courses.');
  }
};

// Update course progress
exports.updateProgress = async (req, res) => {
  const { userId, courseId, progress } = req.body;

  try {
    const student = await Student.findOne({ userId });
    if (!student) {
      return sendError(res, 'Student profile not found!');
    }

    student.progress.set(courseId, progress);
    await student.save();

    res.json({ success: true, message: 'Progress updated successfully!' });
  } catch (err) {
    console.error(err);
    sendError(res, 'An error occurred while updating progress.');
  }
};


/**
 * Fetch all available courses for students.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object returning the list of available courses.
 *

exports.getAvailableCourses = async (req, res) => {
  try {
    const courses = await Course.find(); // Fetch all courses
    res.json({
      success: true,
      courses,
    });
  } catch (error) {
    console.error('Error fetching available courses:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch courses.' });
  }
};
*/

/**
const mongoose = require('mongoose');
const Student = require('../model/student');
const { sendError } = require('../utils/helper');

// Enroll in a course
exports.enrollCourse = async (req, res) => {
  const { userId, courseId } = req.body;

  // Validate and convert userId and courseId to ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(courseId)) {
    return sendError(res, 'Invalid userId or courseId format!');
  }

  try {
    // Find student by userId (convert to ObjectId)
    const student = await Student.findOne({ userId: mongoose.Types.ObjectId(userId) });
    if (!student) {
      return sendError(res, 'Student profile not found!');
    }

    // Check if the student is already enrolled in the course
    if (student.enrolledCourses.includes(courseId)) {
      return sendError(res, 'Already enrolled in this course!');
    }

    // Enroll the student in the course
    student.enrolledCourses.push(mongoose.Types.ObjectId(courseId)); // Convert courseId to ObjectId
    await student.save();

    res.json({ success: true, message: 'Successfully enrolled in the course!' });
  } catch (err) {
    console.error(err);
    sendError(res, 'An error occurred while enrolling.');
  }
};
*/
