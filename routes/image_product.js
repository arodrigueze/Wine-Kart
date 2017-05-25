var express = require('express');
var router = express.Router();
var ImageProduct = require('../modelo/image_product.js');


router.get('/listImageProduct', function (req, res, next) {
  ImageProduct.find(function (err, imageProduct) {
    if (err) {
      res.status(500).send(err)
    } else {
      res.send(imageProduct);
    }
  });
});

router.post('/createImageProduct', function (req, res, next) {
  console.log("Informacion de los archivos subidos");
  var imageProduct = JSON.parse(req.body.info);
  console.log(imageProduct);

  var item = {
    name_product: imageProduct.name_product.toLowerCase(),
    url_image_product: imageProduct.url_image_product
  }

  var imageProd = new ImageProduct(item);
  console.log(item);
  imageProd.save(function (err, createdTodoObject) {
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