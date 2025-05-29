const express = require('express');
const passport = require('passport');
const router = express.Router();
const pool = require('../db/pool');

router.get('/', (req, res) => {
  if (!req.user) return res.redirect('/login');
  res.render('admin', { error: null });
});

router.post('/', async (req, res) => {
  const { passcode } = req.body;
  if (passcode === process.env.ADMIN_SECRET) {
    await pool.query('UPDATE users SET admin_status = TRUE WHERE id = $1', [
      req.user.id,
    ]);
    req.user.admin_status = true;
    return res.redirect('/');
  } else {
    res.render('admin', { error: 'Incorrect passcode' });
  }
});

module.exports = router;
