var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var userSchema = new Schema({
  username_user:String,
  name_user:String,
  email_user:String,
  pass_user:String,
  type_user:String
});

var User = mongoose.model('User', userSchema);

module.exports = User;