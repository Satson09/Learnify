import Course from '../utils/coursesOp.js';
import Enrollment from '../utils/enrollmetnOp.js';
import { sendError } from '../utils/helper.js';
import prog from '../utils/progressOp.js';

/*
 * Create a new course.
 * @param {Request} req - The request object containing instructorId, courseName, and description.
 * @param {Response} res - The response object to return the result.
 */
class InstructorController {
  static async createCourse(req, res) {
    const { instructorId, title, description } = req.body;

    // Error handling: Check for missing fields
    if (!instructorId || !title) {
      return sendError(res, 'Missing instructorId or title!');
    }

    try {
      const newCourse = await Course.createCourse({ instructorId, title, description });
      return res.status(201).json({
        success: true,
        message: 'Course created successfully',
        course: newCourse,
      });
    } catch (error) {
      return sendError(res, 'Failed to create course', error);
    }
  }

  /*
   * Update an existing course.
   * @param {Request} req - The request object containing courseId and updated fields.
   * @param {Response} res - The response object to return the result.
   */
  static async updateCourse(req, res) {
    /*
    json
    {
      courseId
      title
      description
    }
    */
    const { courseId, title, description } = req.body;

    // Error handling: Check for missing fields
    if (!courseId) {
      return sendError(res, 'Missing courseId!');
    }

    try {
      const updatedCourse = await Course.updCourse(
        courseId,
        { title, description },
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
  }

  /*
   * Delete a course.
   * @param {Request} req - The request object containing courseId.
   * @param {Response} res - The response object to confirm deletion.
   */
  static async deleteCourse(req, res) {
    const { courseId } = req.params;

    // Error handling: Check for missing courseId
    if (!courseId) {
      return sendError(res, 'Missing courseId!');
    }

    try {
      const deletedCourse = await Course.delCourse(courseId);
      if (!deletedCourse) return sendError(res, 'Course not found!');
      return res.json({
        success: true,
        message: `Course with ID ${courseId} has been deleted.`,
      });
    } catch (error) {
      return sendError(res, 'Failed to delete course', error);
    }
  }

  /*
   * View all students enrolled in a course.
   * (Assumes you have an Enrollment model linking courses and students.)
   * @param {Request} req - The request object containing courseId.
   * @param {Response} res - The response object returning the list of students.
   */
  static async viewEnrolledStudents(req, res) {
    const { courseId } = req.params;

    // Error handling: Check for missing courseId
    if (!courseId) {
      return sendError(res, 'Missing courseId!');
    }

    try {
      // Example: Fetch students from an Enrollment model (to be defined)
      const enrolledStudents = await Enrollment.retriveAllEnrollment({ courseId });

      if (!enrolledStudents || enrolledStudents === 0) {
        return res.status(404).json({ error: 'No enrolled students found for this course.' });
      }

      // retrive the progress of student in the givin course
      const ResProg = await prog.retriveProgress({ courseId, studentId: enrolledStudents[0].userId });
      if (!ResProg) {
        return sendError(res, "Missing Progress");
      }

      //update the Enrollment progress from the progress collection
      await Enrollment.updateEnrollment(enrolledStudents[0]._id, { progress: ResProg[0].progress})
      return res.json({
        success: true,
        students: enrolledStudents,
        numberOfStudent: enrolledStudents.length,
      });
    } catch (error) {
      return sendError(res, 'Failed to fetch enrolled students', error);
    }
  }

  static async viewAllCourse(req, res) {
    const { userId } = req.params;
    if (!userId) {
      return sendError(res, 'Missing UserId');
    }
    const AllCourses = await Course.searchCourse({ instructorId: userId });
    console.log(AllCourses);
    if (!AllCourses) {
      return sendError(res, 'Cannot retrive all course');
    }
    return res.json({
      sucess: true,
      AllCourses: AllCourses,
    });
    }
  }

export default InstructorController;
