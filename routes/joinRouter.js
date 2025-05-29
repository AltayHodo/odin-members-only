const express = require('express');
const passport = require('passport');
const router = express.Router();
const pool = require('../db/pool')

router.get('/', (req, res) => {
  if (!req.user) return res.redirect('/login');
  res.render('join-club', { error: null });
});

router.post('/', async (req, res) => {
  const { passcode } = req.body;
  if (passcode === process.env.CLUB_SECRET) {
    await pool.query(
      'UPDATE users SET membership_status = TRUE WHERE id = $1',
      [req.user.id]
    );
    req.user.membership_status = true;
    return res.redirect('/');
  } else {
    res.render('join-club', { error: 'Incorrect passcode' });
  }
});

module.exports = router;
