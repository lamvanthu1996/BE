console.log('Alo! Alo! Chim se goi dai bang, chuan bi tac chien! ');

const fs = require('fs');
//dung cai thu vien express
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const config = require('./config.json');

const imagesRouter = require(__dirname + '/modules/api/images/');
const usersRouter = require(__dirname + '/modules/api/users/');

var app = express();

//set public folder public
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.send('./public/index.html');
})

app.use('/api/image', imagesRouter);
app.use('/api/user', usersRouter);

//ket no database
mongoose.connect(config.connectionString, (err) => {
  if (err){
    console.log(err);
  } else {
    console.log("San sang leo Rank");
  }
})
//mo 1 cai port de chay local
app.listen(config.port, (req, res) => {
  console.log('Dai bang nghe ro');
})
