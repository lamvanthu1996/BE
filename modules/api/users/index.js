const express = require('express');

const Router = express.Router();

const usersController = require('./usersController');

const isNumber = require('is-number');

const validEmail = require('is-valid-email');

Router.post('/', (req, res) => {

  //khai bao object
  var userInfo = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    address: req.body.address,
    phone: req.body.phone
  };
  
  //check valid email
  if(!validEmail(userInfo.email)){
    res.send("Invalid email");
  }
  else{
    usersController.addUser(userInfo,(err, doc)=>{
      if(err){
        console.log(err);
        res.send('co loi');
      }
      else{
        res.send(doc);
      }
    });
  }
});

Router.get('/', (req, res) => {
  var id = req.query.id;
  var username = req.query.username;
  if (isNumber(id) || !isNumber(username)){
    try {
      usersController.getUsers(id, username, (err, doc) => {
        if (err) {
          console.log(err);
          res.send("co loi xay ra");
        } else {
          res.send(doc);
        }
      });
    } catch (e) {
      console.log(e);
      res.send("co exception");
    }
  } else {

    try {
      usersController.getAllUser((err, doc) => {
        if (err) {
          console.log(err);
          res.send("co loi xay ra");
        } else {
          res.send(doc);
        }
      });
    } catch (e) {
      console.log(e);
      res.send("co exception");
    }
  }

});

Router.put('/', (req, res) => {
var id = req.body.id;
  var newData = {
    password: req.body.password,
    email: req.body.email,
    address: req.body.address,
    phone: req.body.phone
  }
  usersController.updateUserById(req.body.id, newData,(err,doc)=>{
    if(err){
      res.send("co loi");
    }
    else{
      res.send("update success ");
    }
  });
});

module.exports = Router;
