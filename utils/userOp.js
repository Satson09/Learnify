import users from '../models/users.js';

async function createUser(options = {}) {
  // create user in the User collection
  // return null if something went wrong
  try {
    const result = await users.create(options);
    return result;
  } catch (error) {
    console.log('Error is because of :', error);
    return null;
  }
}

async function retriveUser(ObjectId) {
  // retrive the user information,and he/she is found by his/her _id
  // return null if somthing went wrong
  try {
    const result = await users.findById(ObjectId);
    return result;
  } catch (error) {
    console.log('Error is because of :', error);
    return null;
  }
}

export default {
  createUser,
  retriveUser,
};