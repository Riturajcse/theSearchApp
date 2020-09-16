const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const users = require('./routes/users');
const business = require('./routes/business');
const auth = require('./routes/auth');
const express = require('express');
const app = express();
const path = require('path');

mongoose.connect('mongodb://mongo:27017/simpplr')
  .then(() => console.log('Mongodb Connected...'))
  .catch(err => console.error('Could not connect to MongoDB...'));


// mongoose.connect('mongodb://localhost/simpplr')
//   .then(() => console.log('Mongodb Connected...'))
//   .catch(err => console.error('Could not connect to MongoDB...'));


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/business', business);

const port = 8080;
app.listen(port, () => console.log(`Listening on port ${port}....`));