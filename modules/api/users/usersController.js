
const usersModel = require('./usersModel');

var addUser = (data,callback) => {
  usersModel.findOne({})
  .select('id')
  .sort({id:-1})
  .exec((err,doc)=>{
      if(err){
        console.log(err);
        callback(err);
      }
      else{
        var id  = doc && doc.id ? doc.id += 1 : 1;
        data.id = id;
        usersModel.create(data, (err, doc) => {
          if (err) {
            console.log(err);
            callback(err);
          } else {
            callback(null, doc);
          }
        });
      }
  });

};
var getAllUser =(callback)=>{
  usersModel.find({}, (err,doc)=>{
    if(err){
      callback(err);
    }
    else {
      callback(null,doc);
    }
  });
};


var getUsers =(id,username, callback)=>{
  usersModel.find({
    $or:[
      {id:id},
      {username:username}
    ]
  }, (err,doc)=>{
    if(err){
      callback(err);
    }
    else {
      callback(null,doc);
    }
  });
};

var updateUserById = (id, newData,callback) => {
  try {
    usersModel.updateOne({
      id:id
    }, {
      $set: {
        password: newData.password,
        email: newData.email,
        address: newData.address,
        phone: newData.phone
      }
    },(err,doc)=>{
      if(err){
        callback(err);
      }
      else{
        callback(null, doc);
      }
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getAllUser,
  addUser,
  getUsers,
  updateUserById


};
