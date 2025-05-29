const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/', (req, res) => {
  const showError = req.query.error === 'true';
  res.render('login-form', { error: showError });
});

router.post(
  '/',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login?error=true',
  })
);

module.exports = router;
