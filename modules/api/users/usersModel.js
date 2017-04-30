const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
var usersSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  username: {
    type: String,
    required:true

  },
  password: {
    type: String,
    required:true

  },
  email: {
    type: String,
    required:true
    // type: String,
    //       trim: true,
    //       lowercase: true,
    //       unique: true,
    //       required: 'Email address is required',
    //       validate: [validateEmail, 'Please fill a valid email address'],
    //       match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  address: {
    type: String,
    default: ""
  },
  phone: {
    type: String,
    default: ""
  },

});

usersSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) return next();

  //generrate the salt
  bcrypt.genSalt(10, function(err, salt) {
    if (err){
      return next(err);
    } else {
      //hash the password using our new salt
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err){
          return next(err);
        } else {
          user.password = hash;
          next();
        }
      })
    }
  });
});

module.exports = mongoose.model('user', usersSchema);
