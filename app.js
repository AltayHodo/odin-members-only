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

app.use('/sign-up', signUpRouter);
app.use('/login', loginRouter);

app.get('/', (req, res) => {
  res.render('index');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));
