var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/addProdCat', function(req, res, next) {
  res.render('addProdCat');
});

module.exports = router;
