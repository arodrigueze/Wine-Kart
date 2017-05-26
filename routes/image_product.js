var express = require('express');
var router = express.Router();
var ImageProduct = require('../modelo/image_product.js');
var multer = require('multer');
var fs = require("fs");
var path = require('path');
var ubicacion;

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, __dirname + "/../public/images");
  },
  filename: function (req, file, callback) {
    ubicacion = Date.now() + file.originalname;
    callback(null, ubicacion);

  }
});

var upload = multer({ storage: storage }).single('fotoVino');

router.get('/listImageProduct', function (req, res, next) {
  ImageProduct.find(function (err, imageProduct) {
    if (err) {
      res.status(500).send(err)
    } else {
      res.send(imageProduct);
    }
  });
});

router.post('/uploadImage', function (req, res, next) {
  var fileBytes = req.headers['content-length'];
  var uploadedBytes = 0;
  upload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    res.end("File is uploaded");
  });
/* 
  req.on("readable", function () {
    var chunck = null;
    while (null !== (chunck = req.read())) {
      uploadedBytes += chunck.length;
      var progress = (uploadedBytes / fileBytes) * 100;
      res.write("Progress " + parseInt(progress, 10) + "% \n");
    }
  });
*/
  req.on("end", function () {
    res.write(ubicacion);
    res.end();
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