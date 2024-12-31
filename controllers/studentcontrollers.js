const Course = require('../model/course');
const Student = require('../model/student');
const { sendError } = require('../utils/helper');

// Enroll in a course
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
