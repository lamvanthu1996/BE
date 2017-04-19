console.log('Alo! Alo! Chim se goi dai bang. Dai bang nghe ro tra loi?');

const fs = require('fs');
//dung cai thu vien express
const express = require('express');

const bodyParser = require('body-parser');
const imagesController = require(__dirname + '/modules/images/imageController');
var app = express();
var s = require('string');

//set public folder public
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json({
  extended: true
}));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', (req, res) => {
  res.send('./public/index.html');
});
//add data
app.post('/image/', (req, res) => {
  //doc du lieu tu file imageData
  var imageInfoCollection = imagesController.fetchImageCollection();
  //khai bao object
  var imageInfo = {
    name: req.body.name,
    imageLink: req.body.imageLink,
    description: req.body.description
  };

  //push data moi vao collection
  imageInfoCollection.push(imageInfo);
  //luu lai vao file
  imagesController.saveImageCollection(imageInfoCollection);

  //bao thanh cong
  res.send('Success');
});
//update data
app.put('/image', (req, res) => {
  var name = req.body.name;
  var imageLink = req.body.imageLink;
  var description = req.body.description;
  imagesController.updateImage(name, imageLink, description);
  res.send('Success');
});
//delete data
app.delete('/image', (req, res) => {
  var name = req.body.name;
  imagesController.deleteImage(name);
  res.send("xóa thành công");
});
//return data
app.get('/image', (req, res) => {
  var imageInfoCollection = imagesController.fetchImageCollection();
  var htmlString = '';
  imageInfoCollection.forEach((data) => {
    htmlString += `<div>${data.name}</div><img src="${data.imageLink}"><div>${data.description}</div>`;
  });
  res.send(htmlString);
});
app.get('/image/one', (req, res) => {
  var imageInfoCollection = imagesController.fetchImageCollection();
  var htmlString = '';
  var name = req.query.name;
  var description = req.query.description;

  imageInfoCollection.forEach((data) => {
    if (s(data.name).contains(name) && s(data.description).contains(description))
      htmlString += `<div>${data.name}</div><img src="${data.imageLink}"><div>${data.description}</div>`;
  });
  res.send(htmlString);
});
//mo 1 cai port de chay local
app.listen(6969, (req, res) => {
  console.log('Dai bang nghe ro San sang tha trung');
});
