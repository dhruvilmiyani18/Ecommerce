const express = require('express');
const port = 8010;
const path = require('path');
const app = express();
// const db = require('./Config/mongoose');
const middleware = require('./Config/middleware');
const flash = require('connect-flash')
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(express.urlencoded());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use('/Uploads', express.static(path.join(__dirname, 'Uploads')));
app.use(express.static('Assets/admin'));
app.use(express.static('Assets/user'));

const mongoose = require('mongoose')

const url = `mongodb+srv://dhruvil:henimiyani1234@cluster0.udkaapr.mongodb.net/Ecommerce?retryWrites=true`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

  .then(() => {
    console.log('Connected to database ')
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  })

// passport
const passport = require('passport');
const passportLocal = require('./Config/passport-local');
const session = require('express-session');

app.use(session({
  name: 'ADMINDATA',
  secret: 'Code',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60
  }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(passport.getdata);



app.use(flash());
app.use(middleware.setFlash);

app.use('/', require('./Routes/admin/AdminRoutes'));

app.use('/user', require('./Routes/user/index'));


app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return false
  }
  console.log(`server running on port ` + port);
});
