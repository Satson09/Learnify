const { check, validationResult } = require('express-validator');
// Validates the user input for name, email, and password using express-validator

// express-validator will collect any validation errors in validationResult
// the results are stored in an internal structure that is part of the request (req)
exports.validateUser = [
  check('name')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Name is missing!')
    .isLength({ min: 3, max: 20 })
    .withMessage('Invalid name, name must be 3 to 20 characters long!'),

  check('email')
    .normalizeEmail()
    .isEmail()
    .withMessage('Email is invalid'),

  check('password')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Password is missing!')
    .isLength({ min: 6, max: 20 })
    .withMessage('Password must be 6 to 20 characters long!')
    .matches(/[\W_]/)
    .withMessage('Password must contain at least one special character!'),
];

exports.validate = (req, res, next) => {
  // gathering all the validation errors from the req & putting them into an array called error
  const error = validationResult(req).array();
  if (!error.length) return next();
  return res.status(400).json({ success: false, error: error[0].msg });
};
