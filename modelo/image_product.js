var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var productSchema = new Schema({
  name_product:String,
  url_image_product:String
});

var Product = mongoose.model('Product', productSchema);

module.exports = User;