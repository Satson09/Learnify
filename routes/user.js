const express = require('express');
const { createUser, signin } = require('../controllers/user');
const { validateUser, validate } = require('../middlewares/validator');

const router = express.Router();
// Defines routes
router.post('/create', validateUser, validate, createUser);
router.post('/signin', signin);

module.exports = router;
