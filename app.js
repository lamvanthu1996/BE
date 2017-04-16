const fs = require('fs');
//
// fs.writeFileSync('firstapp.txt','Hello world, file system, â', encoding ='utf-8');
//
// var content = fs.readFileSync('firstapp.txt',encoding='utf-8');
//
// console.log(content);

//dung thu vien express
const express = require('express');

var app = express();
//set public folder public
app.use(express.static(__dirname + '/public'));

// var tenfunction= (req, res) =>{
//   res.send('./public/index.html');
// };
//


app.get('/', function(req, res) {
    res.send('./public/index.html');
});
app.get('/image', function(req, res) {
    res.send('<img src= "http://wallpaper-gallery.net/single/galaxy/galaxy-2.html ">');
});
app.get('/image/add', (req, res) => {
    // khai bao object
    var imageInfo = {
        name: req.query.name,
        imageLink: req.query.imageLink,
        description: req.query.description
    };

    //luu lai vao file

    fs.appendFile('imageData.json', JSON.stringify(imageInfo),'utf-8');
    //bao tanh cong
    res.send('Success');
});
app.get('/image/get', function(req, res) {
    fs.readFile('imageData.json', function(err, data) {
        if (err) throw err;
        var obj = JSON.parse(data);
        res.send("Tên ảnh: " + obj.name);
        // res.send('img src = obj.imageLink');
        res.send('<img src= "http://wallpaper-gallery.net/single/galaxy/galaxy-2.html ">');


    });

});
//mo port chay local
app.listen(6969, function(req, res) {
    console.log('app listen  on 6969');
});
