require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const cors = require('cors');

const history = require('connect-history-api-fallback');
// Import all the express routes we will be using
const indexRouter = require('./routes/index');
const freetsRouter = require('./routes/freets');
const usersRouter = require('./routes/users');
const refreetsRouter = require('./routes/refreets');
// Create our app
const app = express();

app.use(express.static(path.join(__dirname, isProduction ? 'dist' : 'public')));
app.use(history());

// Set up user session
app.use(session({
    secret: 'URL-shortener',
    resave: true,
    saveUninitialized: true
}))
// Allows us to make requests from POSTMAN
app.use(cors());

// Set up the app to use dev logger
app.use(logger('dev'));

// Accept json
app.use(express.json());
// https://stackoverflow.com/questions/29960764/what-does-extended-mean-in-express-4-0
// Allows object nesting in POST

app.use(express.urlencoded({ extended: false }));

// Cookies for sessions
app.use(cookieParser());

// Server html+css+js frontend
app.use(express.static(path.join(__dirname, 'public')));

// Connect url hierarchies to our routers
app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/freets', freetsRouter);
app.use('/api/refreets', refreetsRouter);

module.exports = app;
