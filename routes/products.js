var express = require('express');
var router = express.Router();
var Product = require('../modelo/productModel.js');


/* GET home page. */
router.get('/products', function (req, res, next) {
  res.render('products');
});

router.get('/listProducts', function (req, res, next) {
  Product.find(function (err, products) {
    if (err) {
      res.status(500).send(err)
    } else {
      res.send(products);
    }
  });
});

router.post('/createProduct', function (req, res, next) {
  console.log("Informacion de los archivos subidos");
  var productUser = JSON.parse(req.body.info);
  console.log(productUser);

  var item = {
    name_product: productUser.name_product.toLowerCase(),
    price_product: productUser.price_product,
    category_product: productUser.category_product,
    description_product: productUser.description_product
  }

  var product = new Product(item);
  console.log(item);
  product.save(function (err, createdTodoObject) {
    if (err) {
      res.send(err);
    } else {
      console.log("El nombre del producto insertado es:");
      console.log(createdTodoObject.name_product);
      
      res.send(createdTodoObject);
    }
  });
});

module.exports = router;