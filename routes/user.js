var express = require('express');
var router = express.Router();
var User = require('../modelo/userModel.js');


router.post('/createUser', function(req, res, next) {  
var datoUser = JSON.parse(req.body.info);
var item = {
        username_user:  datoUser.username,
        name_user: datoUser.name,
        email_user:datoUser.email,
        pass_user: datoUser.pass,
        type_user: "customer"
  }
var user = new User(item);
  user.save(function (err, createdTodoObject) {  
    if (err) {
        console.log(err);
        res.send(err);
    }else{
        console.log("Creado con exito");
        res.send(createdTodoObject);
    }   
  });
});

router.get('/listUser', function(req, res, next) {  
  User.find(function (err, usuarios) {  
    if (err) {
        res.status(500).send(err)
    } else {
        res.send(usuarios);
    }
  });
});

module.exports = router;