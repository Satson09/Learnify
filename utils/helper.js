// function to send a standardized error response
export const sendError = (res, error, status = 401) => {
  res.status(status).json({ success: false, error });
};

export function correctQuize(objectOne, objectTwo) {
  let correct = 0;
  // console.log('objectone', objectOne);
  // console.log('objectTwo', objectTwo);
  objectOne.forEach((key) => {
    const obTwoQuestion = objectTwo.find(item => item.questionId === key.questionId);
    if (key.questionId === obTwoQuestion.questionId) {
      if (key.correctAnswer === obTwoQuestion.answer) {
        correct += 1;
      }
    }
  });
  return correct;
}

export function scoreCalculation(correctQuizes, totalQuizes) {
  // console.log('total length', totalQuizes);
  let suum = 0
  correctQuizes.forEach((key) => {
    suum += key.score; 
    // console.log("key is:", key.score);
  })
  // console.log('sum is ', suum);
  // console.log("sum is ", suum);
  const finalScore = suum / totalQuizes;
  // console.log('number is', finalScore)
  return parseFloat(finalScore.toFixed(2));
}
