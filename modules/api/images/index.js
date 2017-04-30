const express = require('express');

const Router = express.Router();

const imagesController = require('./imagesController');
const isNumber = require('is-number');

Router.post('/', (req, res) => {

  //khai bao object
  var imageInfo = {
    name: req.body.name,
    imageLink: req.body.imageLink,
    description: req.body.description
  };

  //luu vao database
  imagesController.addImage(imageInfo, (err, doc) => {
    if (err) {
      console.log(err);
      res.send('co loi');

    } else {
      console.log(doc);
      res.send(doc);
    }
  });

  //bao thanh cong

});

Router.get('/', (req, res) => {
  var id = req.query.id;
  var name = req.query.name;
  if (isNumber(id) || !isNumber(name)){
    try {
      imagesController.getImages(id, name, (err, doc) => {
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
      imagesController.getAllImage((err, doc) => {
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
  var newData = {
    id: req.body.id,
    name: req.body.name,
    imageLink: req.body.imageLink,
    description: req.body.description
  };
  imagesController.updateImageById(newData, (err, doc) => {
    if (err) {
      res.send("co loi");
    } else {
      res.send("update success");
    }
  });

});


Router.delete('/', (req, res) => {
  try {
    var id = req.body.id;
    imagesController.deleteImageById(id, (err, doc) => {
      if (err) {
        res.send("co loi");
      } else {
        res.send("delete success");
      }
    });
  } catch (e) {
    console.log(e);
  }
});

module.exports = Router;
