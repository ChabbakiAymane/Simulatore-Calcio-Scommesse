var express = require('express');
var Squadre = require('./models/Squadre');


var router = express.Router();


router.route('/getInfoSquadre').get(function (req, res) {
    Squadre.find().exec(function(err, items){
        res.status(200).send(items);
    });
  });

router.route('/:id').get(function (req, res) {
    var squad = req.params.id;
    Squadre.findOne({id: squad}).exec(function(err, items){
        res.status(200).send(items);
      });
  });

  




module.exports = router;