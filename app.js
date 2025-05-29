const express = require('express');
const app = express();
const path = require('node:path');

const session = require('express-session');
const passport = require('passport');
const initializePassport = require('./passportConfig');

initializePassport(passport);

app.use(
  session({
    secret: 'supersecretclub',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const signUpRouter = require('./routes/signUpRouter');
const loginRouter = require('./routes/loginRouter');
const joinRouter = require('./routes/joinRouter');
const logoutRouter = require('./routes/logoutRouter');
const messageRouter = require('./routes/messageRouter');
const adminRouter = require('./routes/adminRouter')

app.use('/sign-up', signUpRouter);
app.use('/login', loginRouter);
app.use('/join', joinRouter);
app.use('/logout', logoutRouter);
app.use('/messages', messageRouter);
app.use('/admin', adminRouter);

const pool = require('./db/pool');

app.get('/', async (req, res) => {
  const result = await pool.query(`
    SELECT messages.*, users.username
    FROM messages
    JOIN users ON messages.author_id = users.id
    ORDER BY timestamp DESC
  `);
  res.render('index', {
    user: req.user,
    messages: result.rows,
  });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));
