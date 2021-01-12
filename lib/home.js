var express = require('express');
var mongoose = require('mongoose');
var Partite = require('./models/partite');
var UserData = require('./models/UserData');
const jwt = require("jsonwebtoken");

var router = express.Router();

router.post('/username',  (req, res) => { //ritorna l'userame dell'utente loggato
  const { token } = req.body
  if (token == undefined) {
    res.status(400).json({ error: 'token undefined' });
  } else {
    const decodedJwt = jwt.decode(token, { complete: true });
    var username = decodedJwt.payload.username;
    console.log(decodedJwt);

    res.status(200).json(username);
  }
});

router.post('/punti', (req, res) => { //ritorna i punti in classifica dell'username loggato
  const { token } = req.body
  if (token == undefined) {
    res.status(400).json({ error: 'token undefined' });
  } else {
    const decodedJwt = jwt.decode(token, { complete: true });
    var punti = decodedJwt.payload.punti;
    res.status(200).json(punti);
  }
});

router.post('/posizione', async (req, res) => { //ritorna posizione in classifica dell'utente
  const { token } = req.body
  if (token == undefined) {
    res.status(400).json({ error: 'token undefined' });
  } else {
    const decodedJwt = jwt.decode(token, { complete: true });
    var username = decodedJwt.payload.username;
    await UserData.find({}).sort([["punti", -1]]).exec(function (err, items) { //Ordino classifica al contrario
      var i = 0;
      while (items[i].username != username) { //Conto posizione in classifica utente
        i++;
      }
      res.status(200).json(i + 1);
    });
  }
});

router.post('/punt_set', async (req, res) => { //ritorna i punti totalizzati dall'utente loggato
  const { token } = req.body
  if (token == undefined) {
    res.status(400).json({ error: 'token undefined' });
  } else {
    const decodedJwt = jwt.decode(token, { complete: true });
    var username = decodedJwt.payload.username;
    await UserData.find({ username: req.query.name = username }).exec(function (err, items) { //ordino classifica al contrario
      res.status(200).json(items);
    });
  }
});


router.get('/search_p', async function (req, res) { //ritorna le prossime 5 partite
  await Partite.aggregate([ //Join tra due tabelle
    {
      $lookup: {
        from: "squadres",
        as: "squadre1",
        localField: "sq1",
        foreignField: "id"
      }
    }, {
      $lookup: {
        from: "squadres",
        as: "squadre2",
        localField: "sq2",
        foreignField: "id"
      }
    }
  ]).exec(function (err, items) {
    if (err) { res.send(err); }
    for (i = items.length; i > 5; i--) { //Prendo le prime 5 partite
      items.shift();
    }

    res.status(200).send(items);
  });
});


router.get('/search5', async function (req, res) { //ritorna la data della prossima partita
  var now = new Date().getTime();
  await Partite.find(function (err, items) {  //ordino le date in ordine crescente
    var minDate = items[items.length - 5].date;
    for (i = items.length - 4; i < items.length; i++) {
      if (minDate > items[i].date) { //trovo la data mnore tra le ultime 5 partite
        minDate = items[i].date;
      }
    }
    res.status(200).json(minDate);
  });
});

router.get('/search5_2', async function (req, res) { // ritorna la data più vecchia tra le ultime 5 partite
  await Partite.find({}).sort([["date", -1]]).exec(function (err, items) {
    //if (err) throw err;
    res.status(200).json(items[0]);
  });
});


module.exports = router;
