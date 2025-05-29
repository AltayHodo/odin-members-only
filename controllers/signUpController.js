const db = require('../db/queries');
const bcrypt = require('bcrypt');

async function signUpGet(req, res) {
  res.render('sign-up-form');
}

async function signUpPost(req, res) {
  const { first_name, last_name, username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  await db.insertUser(first_name, last_name, username, hashedPassword);
  res.redirect('/');
}

module.exports = {
  signUpGet,
  signUpPost,
};
