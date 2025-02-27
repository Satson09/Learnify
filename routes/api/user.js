
const express = require('express');
const { createUser, loginUser } = require('../../controllers/user'); // Import user controller
const { validateUser, validateUserLogin, validate } = require('../../middlewares/validator'); // Import validation middlewares

const router = express.Router();

// Route for creating a new user
router.post('/create', validateUser, validate, createUser);

// Route for logging in a user
router.post('/login', validateUserLogin, validate, loginUser);

module.exports = router;
