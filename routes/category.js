var express = require('express');
var router = express.Router();
var Cat = require('../modelo/categoryModel.js');


router.post('/createCategory', function (req, res, next) {
  var datoCategory = JSON.parse(req.body.info);
  var item = {
    name_category: datoCategory.categoryName
  }
  var cat = new Cat(item);
  console.log(item);
  cat.save(function (err, createdTodoObject) {
    if (err) {
      res.send(err);
    }
    res.send(createdTodoObject);
  });
});

router.get('/listCategory', function (req, res, next) {
  Cat.find(function (err, categories) {
    if (err) {
      res.status(500).send(err)
    } else {
      res.send(categories);
    }
  });
});

router.get('/findCategoryById', function (req, res, next) {
  var idcat = req.query.id_category;
  Cat.find({ "id_category": idcat }, function (err, categories) {
    if (err) {
      res.status(500).send(err)
    } else {
      // send the list of all people in database with name of "John James" and age of 36
      // Very possible this will be an array with just one Person object in it.
      res.send(categories);
    }
  });
});

module.exports = router;