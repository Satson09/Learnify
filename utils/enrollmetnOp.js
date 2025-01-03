import Enrollments from '../models/enrollments.js';

async function createEnrollment(options = {}) {
  try {
    const result = await Enrollments.create(options);
    return result;
  } catch (err) {
    console.log('Error becuase of :', err);
    return null;
  }
}

async function retriveAllEnrollment(options = {}) {
  // instead of the student ID it should be the ID stored in the session to retrive it
  // courses either he is student or instructor
  try {
    const result = await Enrollments.find(options);
    return result;
  } catch (err) {
    console.log('Error is because of: ', err);
    return null;
  }
}

async function updateEnrollment(options = {}, updatedfield) {
  // update a function based on the _ID
  try {
    // const objectid = new mongoose.Schema.Types.ObjectId(_id);
    const result = await Enrollments.find(options, updatedfield, { new: true });
    return result;
  } catch (err) {
    console.log('Error becuase of :', err);
    return null;
  }
}

async function retriveAndPopulate(options = {}) {
  // instead of the student ID it should be the ID stored in the session to retrive it
  // courses either he is student or instructor
  try {
    const result = await Enrollments.find(options).populate('courseId');
    return result;
  } catch (err) {
    console.log('Error is because of: ', err);
    return null;
  }
}

export default {
  createEnrollment,
  retriveAllEnrollment,
  updateEnrollment,
  retriveAndPopulate,
};
