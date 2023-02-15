const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const config = require('./config/index')
const passport = require('passport')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const categoryRouter = require('./routes/category');
const productRouter = require('./routes/product');

const errorHandler = require('./middleware/errorHandler')

const app = express();

mongoose.connect(config.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize())

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/category', categoryRouter);
app.use('/product', productRouter);

app.use(errorHandler)
module.exports = app;
