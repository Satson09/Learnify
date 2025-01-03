import quizOperation from '../utils/quizzesOp.js';
import gradOperation from '../utils/gradOp.js';
import progOperation from '../utils/progressOp.js';
import { scoreCalculation, correctQuize, sendError } from '../utils/helper.js';

class ProgressController {
  /*
   /course-progress/:userId/:courseId
   return json
   {  progress: prog[0].progress,
      totalQuizes: prog[0].totalQuizes,
      completedQuizes: prog[0].completedQuizes,
   }
  */
  static async GetProg(req, res) {
    // given userId and courseId, function retrive Progress collection
    const { studentId, courseId } = req.params;
    if (!studentId || !courseId) {
      return res.status(400).json({ error: 'Missing userId or courseId' });
    }

    // retrive the progress collection
    const prog = await progOperation.retriveProgress({ studentId: studentId, courseId });
    if (!prog || prog.length === 0) {
      return res.status(404).json({ error: 'user Progress not found in DB' });
    }
    console.log(prog);
    return res.status(200).json({
      progress: prog[0].progress,
      totalQuizes: prog[0].totalQuizes,
      completedQuizes: prog[0].completedQuizes,
    });
  }

  static async PostProg(req, res) {
    /* /sumbit-quize
    json
    {
      "studentId": "67770df0655492eb1c858f58",
      "courseId": "6776ea1b3da2dc84595a5fee",
      "quizeId": "6774446f8deee44c48d5880b",
      "answers": [
        { "questionId": "133", "answer": "A"},
        { "questionId": "313", "answer": "A"},
        { "questionId": "331", "answer": "A"}
      ]
    }
    */
    const { studentId, courseId, answers, quizeId } = req.body;

    if (!studentId || !courseId || !answers) {
      res.status(400).json({ error: 'Missing userId or courseId or answers' });
    }

    // retrive quize from database to compare correct answers in DB with user answers
    const quiz = await quizOperation.retriveQuizes({ _id: quizeId });
    if (!quiz) {
      res.status(404).json({ error: 'Quize not found in DB' });
    }

    // the quiz is retrun as array of object that why i use the quiz[0] to index the first object
    // correctQuize --> calculate the number of correct questions in a specific quize 
    const numberCorrectAnswers = correctQuize(quiz[0].questions, answers);

    // calculate how much a single question score of a givin quize
    const scorePerQuize = 100 / quiz[0].questions.length;

    // calculate the final score of a single quize
    const gradOfQuize = (((numberCorrectAnswers * scorePerQuize) / 100) * 100);

    const grad = await gradOperation.retriveGrad({ quizeId });
    
    let result;
    let fullProgress;

    if (grad && grad.length > 0) {
      // If grade exists, update it
      console.log('Updating existing grade');
      result = await gradOperation.updateGrad(grad[0]._id, { score: gradOfQuize });
      if (!result) {
          return res.status(404).json({ error: 'Failed to update grade' });
      }
      // calculate progress of student after each sumbit using scoreCalculation function
      fullProgress = scoreCalculation(grad, grad.length);

    } else {
      // create a grad first based on the givin quize
      const CreateGrade = await gradOperation.createGrad({ studentId, courseId, quizeId });
      if (!CreateGrade) {
        return res.status(404).json({ error: 'cannot insert new grade docs' });
      }
  
      result = await gradOperation.updateGrad(CreateGrade._id, { score: gradOfQuize });
      if (!result) {
        res.status(404).json({ error: 'Grad was not Found' });
      }

      const retgrad = await gradOperation.retriveGrad({ _id: CreateGrade._id });
      if (!retgrad) {
        return sendError(res, 'cannot retrive grad docs');
      }

      // calculate progress of student after each sumbit using scoreCalculation function
      fullProgress = scoreCalculation(retgrad, retgrad.length);
    }

    // retriving all the quizes of the userID ==> give us all the quizes for all of the course
    // to be specific to one course we use the courseId
    // const allQuizes = await gradOperation.retriveGrad({ studentId, courseId });
    // console.log("qqqqqqqqqqq:::", allQuizes);

    // allQuizes it help to calculate total quizes and number of completedquize
    const allQuizes = await gradOperation.retriveGrad({ studentId, courseId });

    // retrive a specific progress collection
    const progResult = await progOperation.retriveProgress({ studentId, courseId });

    let finalResult;
    
    if (progResult && progResult.length > 0) {
      // If progress exists, update it
      console.log('Updating existing progress');
      finalResult = await progOperation.updProgress(
        progResult[0]._id,
        { progress: fullProgress,
        totalQuizes: allQuizes.length,
        completedQuizes: allQuizes.length,
      });
      if (!finalResult) {
          return res.status(404).json({ error: 'Failed to update grade' });
      }
    } else {
      const creatProg = await progOperation.createProgress({ studentId, courseId });
      if (!creatProg) {
        return sendError(res, "cannot create progress collection");
      }
      // update the progress collection
      finalResult = await progOperation.updProgress(
        creatProg._id,
        { progress: fullProgress,
          totalQuizes: allQuizes.length,
          completedQuizes: allQuizes.length,
        }
      );
    }
    if (!finalResult) {
      res.status(404).json({ error: 'cannot update progress collection' });
    }
    return res.status(200).json({ progress: finalResult.progress });
  }
}

export default ProgressController;
