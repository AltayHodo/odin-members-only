const express = require('express');
const router = express.Router();
const pool = require('../db/pool');

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}

router.get('/new', ensureAuthenticated, (req, res) => {
  res.render('new-message', { error: null });
});

router.post('/', ensureAuthenticated, async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.render('new-message', { error: 'All fields are required.' });
  }
  await pool.query(
    'INSERT INTO messages (title, text, author_id) VALUES ($1, $2, $3)',
    [title, content, req.user.id]
  );
  res.redirect('/');
});

router.post('/:id/delete', async (req, res) => {
  if (!req.user || !req.user.admin_status) return res.status(403).send('Unauthorized');

  const { id } = req.params;
  await pool.query('DELETE FROM MESSAGES WHERE id = $1', [id]);
  res.redirect('/');
})

module.exports = router;
