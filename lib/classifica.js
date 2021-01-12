var express = require('express');
var mongoose = require('mongoose');
var UserData = require('./models/UserData');

// get an instance of the express Router
var router = express.Router();

// restituisco la tabella user data in ordine decrescente per punti creando una classifica
router.route('/classifica')

    .get(function (req, res) {
        //join per collegare l'id con il nome della sqaudra
        UserData.find({}).sort( { punti: -1}).exec( function (err, items) {
            //if (err) { res.send(err); }
            res.json(items);
        });
    });

// cerco nel DB l'utente con quello username
router.route('/search')

    .get(function (req, res) {
        //join per collegare l'id con il nome della sqaudra
        if(req.query.name!=null){
            UserData.find({}).sort( { punti: -1}).exec( function (err, data) { //ordino per poter ritornare anche la posizione dell'utente
                //if (err) { res.send(err); }
                var pos;
                var name;
                var punti;
                for(var i in data){
                    if(data[i].username == req.query.name){
                        pos = i*1+1;
                        name = data[i].username;
                        punti = data[i].punti;
                    }
                }
                res.json({
                    pos: pos,
                    username: name,
                    punti: punti
                });
            });
        }
    });
  module.exports = router;