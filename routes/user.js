var express = require('express');
var router = express.Router();
var User = require('../modelo/userModel.js');


router.post('/createUser', function (req, res, next) {
  var datoUser = JSON.parse(req.body.info);
  var item = {
    username_user: datoUser.username,
    name_user: datoUser.name,
    email_user: datoUser.email,
    pass_user: datoUser.pass,
    type_user: "customer"
  }
  var user = new User(item);
  user.save(function (err, createdTodoObject) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log("Creado con exito");
      res.send(createdTodoObject);
    }
  });
});

router.post('/loginUser', function (req, res, next) {
  var control=false;
  var usuarioEncontrado;
  var datoUser = JSON.parse(req.body.info);
  console.log("Validando login");
  console.log("Datos");
  console.log(datoUser.username);
  console.log(datoUser.password);
  User.find(function (err, usuarios) {
    if (err) {
      console.log("Ha habido error al carcar usuarios");
      console.log(err);
      res.status(500).send(err)
    } else {
      for (j = 0; j < usuarios.length; j++) {
        if (usuarios[j].username_user.localeCompare(datoUser.username)==0) {
          if (usuarios[j].pass_user.localeCompare(datoUser.password)==0) {
            console.log("usuario encontrado");
            usuarioEncontrado = usuarios[j];
            control=true;
          }
        }
      }
      if(control) res.send(usuarioEncontrado);
      else res.status(500).send({error:"error"});
    }
  });
});

router.get('/listUser', function (req, res, next) {
  User.find(function (err, usuarios) {
    if (err) {
      res.status(500).send(err)
    } else {
      res.send(usuarios);
    }
  });
});

module.exports = router;