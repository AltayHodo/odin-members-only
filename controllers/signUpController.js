const db = require('../db/queries');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

async function signUpGet(req, res) {
  res.render('sign-up-form', {
    formData: {},
    errors: [],
  });
}

async function signUpPost(req, res) {
  const errors = validationResult(req);
  const { first_name, last_name, username, password } = req.body;

  if (!errors.isEmpty()) {
    return res.render('sign-up-form', {
      errors: errors.array(),
      formData: req.body,
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await db.insertUser(first_name, last_name, username, hashedPassword);
  res.redirect('/');
}

module.exports = {
  signUpGet,
  signUpPost,
};
