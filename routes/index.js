import express from 'express';
// import ProgressCalculation from '../controllers/ProgressController.js'
import { createUser, loginUser } from '../controllers/user.js';
import { validateUser, validate, validateUserLogin } from '../middlewares/validator.js';

const router = express.Router();


// router.get('/course-progress/:studentId/:courseId', ProgressCalculation.GetProg);

// router.post('/sumbit-quize', ProgressCalculation.PostProg);

// Route for creating a new user
router.post('/create', validateUser, validate, createUser);

// Route for logging in a user
router.post('/login', validateUserLogin, validate, loginUser);

export default router;
