var express = require('express');
var mongoose = require('mongoose');
var squadre = require('./models/Squadre');
const partita = require('./models/partite');

// configure app to use bodyParser()
// this will let us get the data from a POST


// get an instance of the express Router
var router = express.Router();

router.route('/partite')

    .post(function (req, res) {
        if(!req.body.date||!req.body.sq1||!req.body.sq2||!req.body.esito||!req.body.num){
            res.status(400).json({error: 'some data is null'});
        }else{
        //find the max id
        var maxx=0;
        partita.find(function(err, items) {
            //if (err) throw err;

            for(var i=0; i<items.length;i++){
                if(maxx<items[i].idP){
                    maxx = items[i].idP;
                }
            }

            //insert in the db the new data
            var bear = new partita();

            console.log(req.body.sq1+" - "+req.body.sq2);

            bear.idP = maxx*1 + req.body.num*1;
            bear.sq1 = req.body.sq1;
            bear.sq2 = req.body.sq2;
            bear.esito = req.body.esito;
            bear.date = req.body.date;
            
            bear.save(function (err) {
                //if (err) throw err;
                res.status(200).json(bear);
            });
        });
    }
    })

    .get(function (req, res) {

        //join per collegare l'id con il nome della sqaudra
        partita.aggregate( [
            {
                $lookup:{
                    from: "squadres",
                    localField: "sq1",
                    foreignField: "id",
                    as: "squadra1"
                }
            },
            {
                $lookup:{
                    from: "squadres",
                    localField: "sq2",
                    foreignField: "id",
                    as: "squadra2"
                }
            }
        ]).exec(function (err, items) {
            //if (err) throw err;
            res.status(200).send(items);
        });
    });

router.route('/search')

    .get(function (req, res) {
        //get search con campo name != da null per cercare una squadra
        if(req.query.name!=null){
            squadre.findOne( { name: req.query.name }, function (err, items) {
               // if (err) { res.send(err); }
                res.status(200).json(items);
            });
        }
        //get search con campo idP != da null per cercare una partita
        else{
            console.log(req.query.idP*1);
            partita.findOne( { idP: req.query.idP*1 }, function (err, items) {
               // if (err) { res.send(err); }
                res.status(200).json(items);
            });
        }
    });
router.route('/squadre')
    //get per avere la liste delle squadre
    .get(function (req, res) {
        squadre.find(function (err, items) {
            //if (err) { res.send(err); }
            res.status(200).json(items);
        });

    });

  module.exports = router;