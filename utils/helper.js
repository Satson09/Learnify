// function to send a standardized error response
exports.sendError = (res, error, status = 401) => {
  res.status(status).json({ success: false, error });
};

function correctQuize(objectOne, objectTwo) {
  let correct = 0;
  Object.keys(objectOne).forEach( key => {
    if (objectOne[key] === objectTwo[key]) {
      correct += 1;
    }
  })
  return correct;
}

function scoreCalculation(numberOfQuizesInTask) {
  return 100 / numberOfQuizesInTask;
}

export default {
  correctQuize,
  scoreCalculation,
};
