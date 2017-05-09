var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var productSchema = new Schema({
  name_product:String,
  price_product:String,
  category_product:String,
  description_product:String
});

var Product = mongoose.model('Product', productSchema);

module.exports = User;