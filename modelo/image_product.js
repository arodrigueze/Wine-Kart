var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var productSchema = new Schema({
  name_product:String,
  url_image_product:String
});

var imgProduct = mongoose.model('imgProduct', productSchema);

module.exports = imgProduct;