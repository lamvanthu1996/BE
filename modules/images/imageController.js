const fs = require('fs');

var saveImageCollection = (data) => {
  fs.writeFileSync('imageData.json', JSON.stringify(data));
};
var fetchImageCollection = () => {
  var imageInfoCollection = [];
  try {
    var contents = fs.readFileSync('imageData.json', 'utf-8');

    imageInfoCollection = JSON.parse(contents);
  } catch (e) {
    console.log(e);
  }
  return imageInfoCollection;
};
var deleteImage = (name) => {
  var imageInfoCollection = fetchImageCollection();
  imageInfoCollection = imageInfoCollection.filter(function(element) {
    return element.name !== name;
  })
  saveImageCollection(imageInfoCollection);
}
var updateImage = (name, imageLink, description) => {
  var imageInfoCollection = fetchImageCollection();
  imageInfoCollection.filter(function(element) {
    if (element.name == name) {
      if (element.imageLink != imageLink) element.imageLink = imageLink;
      if (element.description != description) element.description = description;
    }
  });

  saveImageCollection(imageInfoCollection);
};



module.exports = {
  fetchImageCollection: fetchImageCollection,
  saveImageCollection: saveImageCollection,
  deleteImage: deleteImage,
  updateImage: updateImage
}
