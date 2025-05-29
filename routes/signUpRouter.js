const express = require('express');
const router = express.Router();
const signUpController = require('../controllers/signUpController');
const { body, validationResult } = require('express-validator');

router.get('/', signUpController.signUpGet);
router.post(
  '/',
  [
    body('first_name')
      .trim()
      .notEmpty()
      .withMessage('First name is required.')
      .escape(),
    body('last_name')
      .trim()
      .notEmpty()
      .withMessage('Last name is required.')
      .escape(),
    body('username')
      .trim()
      .isLength({ min: 3, max: 15})
      .withMessage('Username must be between 3 and 15 characters.'),
    body('password')
      .isLength({ min: 5 })
      .withMessage('Password must be at least 5 characters long.'),
    body('confirmPassword')
      .custom((value, { req }) => value === req.body.password)
      .withMessage('Passwords do not match.'),
  ],
  signUpController.signUpPost
);

module.exports = router;
