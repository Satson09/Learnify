import progress from '../models/progress.js';

async function createProgress(options = {}) {
  try {
    const result = await progress.create(options);
    return result;
  } catch (error) {
    console.log('Error is because of: ', error);
    return null;
  }
}

async function updProgress(ObjectId, score) {
  try {
    const result = await progress.findByIdAndUpdate(
      ObjectId,
      { progress: score },
      { new: true },
    );
    return result;
  } catch (error) {
    console.log('Error is because of:', error);
    return null;
  }
}

async function delProgress(ObjectId) {
  try {
    const result = await progress.findByIdAndDelete(ObjectId);
    return result;
  } catch (error) {
    console.log('Error is because of: ', error);
    return null;
  }
}

async function retriveProgress(options = {}) {
  try {
    const result = await progress.find(options);
    return result;
  } catch (error) {
    console.log('Error is because of: ', error);
    return null;
  }
}

export default {
  createProgress,
  updProgress,
  delProgress,
  retriveProgress,
};
