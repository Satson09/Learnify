import Grad from '../models/grad.js';

async function createGrad(options = {}) {
  try {
    const result = await Grad.create(options);
    return result;
  } catch (err) {
    console.log('Error is becuase of: ', err);
    return null;
  }
}

async function updateGrad(ObjectId, updatedfile) {
  try {
    const result = await Grad.findByIdAndUpdate(ObjectId, updatedfile, { new: true });
    return result;
  } catch (err) {
    console.log('Error is because of :', err);
    return null;
  }
}

export default {
  createGrad,
  updateGrad,
};
