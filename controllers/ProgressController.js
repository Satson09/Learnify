import Quize from '../models/quizzes.js';
import Grade from '../models/grad.js';
import progress from '../models/progress.js';
import * as quizOperation from '../utils/quizzesOp.js';
import * as gradOperation from '../utils/gradOp.js';
import * as progOperation from '../utils/progressOp.js';
import { scoreCalculation, correctQuize } from '../utils/helper.js';

class ProgressController {
  // /course-progress/:userId/:courseId
  static async GetProg(req, res) {
    // given userId and courseId, function retrive Progress collection
    const { userId, courseId } = req.params;
    if (!userId || ! courseId) {
        res.status(400).json({ error: 'Missing userId or courseId' });
    }
    const prog = await progOperation.retriveProgress(userId, courseId);
    if (!prog) {
      res.status(404).json({ error: 'user Progress not found in DB' });
    }
    res.status(200).json({ progress: prog.progress, totalQuizes: prog.totalQuizes, completedQuizes: prog.completedQuizes });
  }

  static async PostProg(req, res) {
    /* /sumbit-quize 
      json 
      {
        "userId": "12345",
        "courseId": "67890",
        "quizId": "quiz01",
        "answers": [
          { "questionId": "answer"} => { "1": "C", '2': 'paris', '3': 'prgraming' }
        ]
      }
    */
    if (!userId || !courseId || !answers) {
      res.status(400).json({ error: 'Missing userId or courseId or answers' });
    }
    const quiz = await quizOperation.retriveQuizes(quizId); // retrive quize from database to compare correct answers in DB with user answers
    if (!quiz) {
      res.status(404).json({ error: 'Quize not found in DB'});
    }
    const correctAnswers = correctQuize(answers, quiz.answers[0]); // function compare the answers and return the number of correct answers
    const scorePerQuize = scoreCalculation(quiz.questions.size);
    const gradOfQuize = 
  }
}