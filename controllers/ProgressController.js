import quizOperation from '../utils/quizzesOp.js';
import gradOperation from '../utils/gradOp.js';
import progOperation from '../utils/progressOp.js';
import { scoreCalculation, correctQuize } from '../utils/helper.js';

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
    const prog = await progOperation.retriveProgress({ studentId, courseId });
    if (!prog) {
      return res.status(404).json({ error: 'user Progress not found in DB' });
    }
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
        "studentId": "12345",
        "courseId": "67890",
        "quizId": "quiz01",
        "answers": [
          { "questionId": "answer"} => { "1": "C", '2': 'paris', '3': 'prgraming' }
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

    // create a grad first based on the givin quize
    const CreateGrade = await gradOperation.createGrad({ studentId, courseId, quizeId });
    if (!CreateGrade) {
      return res.status(404).json({ error: 'cannot insert new grade docs' });
    }

    // retrive grad collection based on the "quiz_id"
    const grad = await gradOperation.retriveGrad({ quizeId: CreateGrade.quizeId });

    if (!grad) {
      res.status(404).json({ error: 'Grad not found in DB' });
    }

    // update the grad of the quize first we retrive it by "the value return from the retrive grading process"
    // then update the score calculation
    const result = await gradOperation.updateGrad(grad[0]._id, { score: gradOfQuize });

    if (!result) {
      res.status(404).json({ error: 'Grad was not Found' });
    }

    // retriving all the quizes of the userID ==> give us all the quizes for all of the course
    // to be specific to one course we use the courseId
    const allQuizes = await gradOperation.retriveGrad({ studentId, courseId });

    // calculate progress of student after each sumbit using scoreCalculation function
    const fullProgress = scoreCalculation(allQuizes, allQuizes.length);
    // retrive a specific progress collection to update it
    const progResult = await progOperation.retriveProgress({ studentId, courseId });
    if (!progResult) {
      return res.status(404).json({ error: 'progress collection not found' });
    }

    // update the progress collection
    const finalResult = await progOperation.updProgress(
      progResult[0]._id,
      { progress: fullProgress,
        totalQuizes: allQuizes.length,
        completedQuizes: allQuizes.length,
      }
    );
    if (!finalResult) {
      res.status(404).json({ error: 'cannot update progress collection' });
    }
    return res.status(200).json({ progress: finalResult.progress });
  }
}

export default ProgressController;
