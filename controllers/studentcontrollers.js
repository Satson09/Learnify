import Enrollment from '../utils/enrollmetnOp.js';
import Student from '../utils/userOp.js';
import prog from '../utils/progressOp.js';
import { sendError } from '../utils/helper.js';


class StudentController {
  // Enroll in a course
  static async enrollCourse(req, res) {
    const { userId, courseId } = req.body;

    try {
      const student = await Student.retriveUser({ _id: userId });
      if (!student) {
        return sendError(res, 'Student profile not found!');
      }

      const enroled = await Enrollment.createEnrollment({ userId, courseId });
      if (!enroled) {
        return sendError(res, 'enrolled creating failed');
      }

      //   student.enrolledCourses.push(courseId);
      //   await student.save();

      return res.json({ success: true, message: 'Successfully enrolled in the course!' });
    } catch (err) {
      console.error(err);
      return sendError(res, 'An error occurred while enrolling.');
    }
  }

  // Get enrolled courses
  static async getEnrolledCourses(req, res) {
    const { userId } = req.params;

    try {
      console.log('Finding student with userId:', userId);
      const enrooled = await Enrollment.retriveAllEnrollment({ userId });
      console.log('Student found:', enrooled);

      if (!enrooled) {
        return sendError(res, 'Student profile not found!');
      }

      console.log('Enrolled Courses:', enrooled[0].courseId);
      return res.json(enrooled[0].courseId);
    } catch (err) {
      console.error('Error occurred:', err);
      return sendError(res, 'An error occurred while fetching courses.');
    }
  }

  // Update course progress
  static async updateProgress(req, res) {
    const { userId, courseId } = req.body;

    try {
      const student = await Student.retriveUser({ userId, courseId });
      if (!student) {
        return sendError(res, 'Student profile not found!');
      }

      const ResProg = await prog.retriveProgress({ courseId, studentId: userId });
      if (!ResProg) {
        return sendError(res, 'Missing Progress');
      }

      await Enrollment.updateEnrollment({ userId, courseId }, { progress: ResProg[0].progress });

      return res.json({ success: true, message: 'Progress updated successfully!' });
    } catch (err) {
      console.error(err);
      return sendError(res, 'An error occurred while updating progress.');
    }
  }

  static async viewAllCourse(req, res) {
    const { userId } = req.params;
    if (!userId) {
      return sendError(res, 'Missing UserId');
    }
    const allEnrolled = await Enrollment.retriveAllEnrollment({ userId });
    console.log(allEnrolled[0].courseId);
    if (!allEnrolled) {
      return sendError(res, 'Cannot retrive all Enrollment');
    }
    const courses = await Enrollment.retriveAndPopulate({ userId });
    console.log("asdf", courses);
    return res.json({
      sucess: true,
      allCourses: courses,
    });
  }
}

export default StudentController;
