var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/loginAdmin', function(req, res, next) {
  res.render('loginAdmin');
});

module.exports = router;
