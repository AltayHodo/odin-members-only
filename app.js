const express = require('express');
const app = express();
const path = require('node:path');

app.use(express.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const signUpRouter = require('./routes/signUpRouter');

app.use('/sign-up', signUpRouter);

app.get('/', (req, res) => {
  res.render('index');
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));
