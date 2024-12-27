import contents from '../models/contents.js';

async function createContent(options = {}) {
  try {
    const result = await contents.create(options);
    return result;
  } catch (error) {
    console.log('error is because of :', error);
    return null;
  }
}

async function findContent(options = {}) {
  try {
    const result = await contents.find(options);
    return result;
  } catch (error) {
    console.log('error is : ', error);
    console.error(error);
    return null;
  }
}

export default {
  createContent,
  findContent,
};
