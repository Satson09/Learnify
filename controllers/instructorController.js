const Course = require('../model/course');
const { sendError } = require('../utils/helper');

/**
 * Create a new course.
 * @param {Request} req - The request object containing instructorId, courseName, and description.
 * @param {Response} res - The response object to return the result.
 */
exports.createCourse = async (req, res) => {
  const { instructorId, title, description } = req.body;

  // Error handling: Check for missing fields
  if (!instructorId || !title) {
    return sendError(res, 'Missing instructorId or title!');
  }

  try {
    const newCourse = await Course.create({ instructorId, title, description });
    return res.status(201).json({
      success: true,
      message: 'Course created successfully',
      course: newCourse,
    });
  } catch (error) {
    return sendError(res, 'Failed to create course', error);
  }
};

/**
 * Update an existing course.
 * @param {Request} req - The request object containing courseId and updated fields.
 * @param {Response} res - The response object to return the result.
 */
exports.updateCourse = async (req, res) => {
  const { courseId, title, description } = req.body;

  // Error handling: Check for missing fields
  if (!courseId) {
    return sendError(res, 'Missing courseId!');
  }

  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { title, description, updatedAt: Date.now() },
      { new: true }
    );
    if (!updatedCourse) return sendError(res, 'Course not found!');
    return res.json({
      success: true,
      message: 'Course updated successfully',
      course: updatedCourse,
    });
  } catch (error) {
    return sendError(res, 'Failed to update course', error);
  }
};

/**
 * Delete a course.
 * @param {Request} req - The request object containing courseId.
 * @param {Response} res - The response object to confirm deletion.
 */
exports.deleteCourse = async (req, res) => {
  const { courseId } = req.params;

  // Error handling: Check for missing courseId
  if (!courseId) {
    return sendError(res, 'Missing courseId!');
  }

  try {
    const deletedCourse = await Course.findByIdAndDelete(courseId);
    if (!deletedCourse) return sendError(res, 'Course not found!');
    return res.json({
      success: true,
      message: `Course with ID ${courseId} has been deleted.`,
    });
  } catch (error) {
    return sendError(res, 'Failed to delete course', error);
  }
};

/**
 * View all students enrolled in a course.
 * (Assumes you have an Enrollment model linking courses and students.)
 * @param {Request} req - The request object containing courseId.
 * @param {Response} res - The response object returning the list of students.
 */
exports.viewEnrolledStudents = async (req, res) => {
  const { courseId } = req.params;

  // Error handling: Check for missing courseId
  if (!courseId) {
    return sendError(res, 'Missing courseId!');
  }

  try {
    // Example: Fetch students from an Enrollment model (to be defined)
    const enrolledStudents = await Enrollment.find({ courseId }).populate('studentId');
    return res.json({
      success: true,
      students: enrolledStudents,
    });
  } catch (error) {
    return sendError(res, 'Failed to fetch enrolled students', error);
  }
};

/**
 * Grade a student on an assignment or quiz.
 * @param {Request} req - The request object containing studentId, courseId, and grade.
 * @param {Response} res - The response object confirming the grading operation.
 */
exports.gradeStudent = (req, res) => {
  const { studentId, courseId, grade } = req.body;

  // Error handling: Check for missing fields
  if (!studentId || !courseId || grade === undefined) {
    return sendError(res, 'Missing studentId, courseId, or grade!');
  }

  // Simulate grading success
  return res.json({
    success: true,
    message: `Student ${studentId} in course ${courseId} has been graded.`,
    grade,
  });
};
