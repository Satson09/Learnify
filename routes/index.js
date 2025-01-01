import express from 'express';
import ProgressCalculation from '../controllers/ProgressController.js'
import { createUser } from '../controllers/user.js';
import { validateUser, validate } from '../middlewares/validator.js';

const router = express.Router();

router.post('/create', validateUser, validate, createUser);

router.get('/course-progress/:studentId/:courseId', ProgressCalculation.GetProg);

router.post('/sumbit-quize', ProgressCalculation.PostProg);

export default router;
