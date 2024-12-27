import Enrollments from '../models/enrollments.js';
import { searchUser } from './userOp.js';

async function createEnrollment(options = {}) {
  try {
    // to know if we want to create a studentId or instructorId
    // const user = await searchUser()
    const result = await Enrollments.create({
      studentId: options.studentId,
      courseId: options.courseId,
      progress: options.progress,
    });
    return result;
  } catch (err) {
    console.log('Error becuase of :', err);
    return null;
  }
}

async function retriveAllEnrollment(studentId) {
  // instead of the student ID it should be the ID stored in the session to retrive it
  // courses either he is student or instructor
  try {
    const result = await Enrollments.find(studentId);
    return result;
  } catch (err) {
    console.log('Error is because of: ', err);
    return null;
  }
}

export default {
  createEnrollment,
  retriveAllEnrollment,
};
