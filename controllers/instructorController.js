const Student = require("../model/student");
const Course = require('../model/course');
const User = require("../model/user");
const { sendError } = require('../utils/helper');

/**
 * Create a new course with file uploads.
 * @param {Request} req - The request object containing instructorId, title, description, and uploaded files.
 * @param {Response} res - The response object to return the result.
 */
exports.createCourse = async (req, res) => {
  console.log('Authenticated user:', req.user);

  const { title, description, duration } = req.body;
  const website = req.body.website || null;
  const instructorId = req.user.id;

  if (!instructorId || !title) {
    return sendError(res, 'Missing instructorId or title!', 400);
  }

  try {
    if (!req.files || req.files.length === 0) {
      return sendError(res, 'No files uploaded!', 400);
    }

    const files = req.files.map((file) => ({
      name: file.originalname,
      url: `/uploads/${file.filename}`,
      type: file.mimetype,
    }));

    const newCourse = await Course.create({
      instructorId,
      title,
      description,
      duration,
      website,
      files,
    });

    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      course: newCourse,
    });
  } catch (error) {
    if (error instanceof multer.MulterError) {
      // Handle file size or upload-specific errors
      return sendError(res, 'File upload error', 400, error);
    }

    console.error('Error creating course:', error.message || error);
    return sendError(res, 'Failed to create course. Please try again later.', 500, error);
  }
};


/**
 * Update an existing course with optional file uploads.
 * @param {Request} req - The request object containing courseId, updated fields, and uploaded files.
 * @param {Response} res - The response object to return the result.
 */
exports.updateCourse = async (req, res) => {
  const { courseId, title, description, duration } = req.body;

  if (!courseId) {
    return sendError(res, 'Missing courseId!');
  }

  try {
    // Map new uploaded files to metadata
    const newFiles = req.files?.map((file) => ({
      name: file.originalname,
      url: `/uploads/${file.filename}`, // File path (or URL if using cloud storage)
      type: file.mimetype,
    })) || [];

    // Find and update the course
    const updatedCourse = await Course.findById(courseId);
    if (!updatedCourse) return sendError(res, 'Course not found!');

    // Update fields
    if (title) updatedCourse.title = title;
    if (description) updatedCourse.description = description;
    if (duration) updatedCourse.duration = duration;

    // Append new files to existing files
    updatedCourse.files = [...updatedCourse.files, ...newFiles];
    updatedCourse.updatedAt = Date.now();

    await updatedCourse.save();

    return res.json({
      success: true,
      message: 'Course updated successfully',
      course: updatedCourse,
    });
  } catch (error) {
    console.error('Error updating course:', error);
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
 * @param {Request} req - The request object containing courseId in the params.
 * @param {Response} res - The response object returning the list of students.
 */
exports.viewEnrolledStudents = async (req, res) => {
  const { courseId } = req.params;

  if (!courseId) {
    return res.status(400).json({ success: false, message: "Missing courseId!" });
  }

  try {
    // Verify the course exists and belongs to the instructor
    const course = await Course.findOne({ _id: courseId, instructorId: req.user.id });
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found or not owned by you." });
    }

    // Find students enrolled in the course
    const students = await Student.find({ enrolledCourses: courseId }).populate("userId", "name email");

    // Format the response to include student details
    const enrolledStudents = students.map((student) => ({
      id: student.userId._id,
      name: student.userId.name,
      email: student.userId.email,
    }));

    res.status(200).json({
      success: true,
      students: enrolledStudents,
    });
  } catch (error) {
    console.error("Error fetching enrolled students:", error);
    res.status(500).json({ success: false, message: "Failed to fetch enrolled students." });
  }
};

/**
 * Fetch courses created by the instructor.
 * @param {Request} req - The request object containing instructor ID.
 * @param {Response} res - The response object returning the list of courses.
 */
exports.getInstructorCourses = async (req, res) => {
  try {
    const instructorId = req.user.id; // Extract instructor ID from token

    // Fetch courses created by this instructor
    const courses = await Course.find({ instructorId });

    res.json({
      success: true,
      courses,
    });
  } catch (error) {
    console.error('Error fetching instructor courses:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch courses.' });
  }
};

/**
 * Grade a student on an assignment or quiz.
 * @param {Request} req - The request object containing studentId, courseId, and grade.
 * @param {Response} res - The response object confirming the grading operation.
 */
exports.gradeStudent = (req, res) => {
  const { studentId, courseId, grade } = req.body;

  if (!studentId || !courseId || grade === undefined) {
    return sendError(res, 'Missing studentId, courseId, or grade!');
  }

  return res.json({
    success: true,
    message: `Student ${studentId} in course ${courseId} has been graded.`,
    grade,
  });
};

