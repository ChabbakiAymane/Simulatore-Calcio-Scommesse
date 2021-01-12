var express = require('express');
var Partite = require('./models/partite');
var Pronostici = require('./models/Pronostici');
const Squadre = require('./models/Squadre');
var UserData = require('./models/UserData');

var router = express.Router();
var max_idP = 0; //Tiene traccia dell'id più alto delle ultime 5 partite

var idPartite = [0,0,0,0,0];

//Gestione richiesta get per ottenere le ultime 5 partite 
router.route('/get_partite').get(function (req, res) {
  //Join tra Partite, Squadre, Squadre
    Partite.aggregate( [
        {
            $lookup:{
                from: "squadres",
                localField: "sq1",
                foreignField: "id",
                as: "squadre1"
            }
        },
        {
            $lookup:{
            from: "squadres",
            localField: "sq2",
            foreignField: "id",
            as: "squadre2"
            }
        }
    ]).exec(function (err, items) {
        if (err) { res.send(err); }
        //Shift finchè non abbiamo le ultime 5 partite
        for(i = items.length; i > 5; i--)
          items.shift();
        res.status(200).send(items);
  });
});

//Gestione richiesta POST per l'inserimento degli esiti delle partite
router.route('/inserimentoEsiti').post(function (req, res) {
  var esiti = [0,0,0,0,0];
  if(!req.body.e1 || !req.body.e2 || !req.body.e3 || !req.body.e4 || !req.body.e5){
    res.status(400).send({ error: 'Esiti non specificati' });
  }
  else if(!req.body.idP1 || !req.body.idP2 || !req.body.idP3 || !req.body.idP4 || !req.body.idP5){
    res.status(400).send({ error: 'Id partite non specificati' });
  }
  else{
    esiti[0] = req.body.e1;  esiti[1] = req.body.e2; 
    esiti[2] = req.body.e3;  esiti[3] = req.body.e4; 
    esiti[4] = req.body.e5; 
    idPartite[0] = req.body.idP1;  idPartite[1] = req.body.idP2;
    idPartite[2] = req.body.idP3;  idPartite[3] = req.body.idP4;
    idPartite[4] = req.body.idP5;
    for(let i = 0; i < 5; i++){ if(max_idP < idPartite[i]) max_idP = idPartite[i]; }
    aggiorna_esiti(esiti, idPartite); //Aggiornamento esiti nel DB
    aggiorna_punti(esiti, idPartite); //Aggiornamento dei punti per ogni utente
    aggiorna_statistiche_squadre(esiti, idPartite);
    var str = "Esito1: " + esiti[0] + " Esito2: " + esiti[1] + " Esito3: " + esiti[2] + " Esito4: "+ esiti[3] + " Esito5: " + esiti[4];
    str += " --- idP1: " + idPartite[0] + " idP2: " + idPartite[1] + " idP3: " + idPartite[2] + " idP4: " + idPartite[3] + " idP5: " + idPartite[4];
    res.status(200).send(JSON.stringify(str));
  }
});


//Restituisce l'id massimo tra gli utenti che hanno messo i loro pronostici
function get_max_idU(callback){
  var max_id = 0;
  Pronostici.findOne().sort('-idU').exec(function(err, doc){
    max_id = doc.idU;
    callback && callback(max_id);
  });
}

//Restituisce i punti totalizzati da un utente con gli ultimi pronostici inseriti
// DA CAMBIARE
function calcola_punti_totalizzati(esiti,i,callback){
  var pti = 0;
  Pronostici.find({idU: i}).exec(function(err, items){
    if(err){ callback && callback(0,i);}
    else{items.sort((a,b) => (a.partita < b.partita) ? 1 : ((b.partita < a.partita) ? -1 : 0));
      for(j = 0; j < 5; j++){
        if(items[j] != undefined){
        if(items[j].pronostico == 0) items[j].pronostico = "X";
        else if(items[j].pronostico == 1) items[j].pronostico = "1";
        else if(items[j].pronostico == 2) items[j].pronostico = "2";
        }
      }
      //items.sort((a,b) => (a.partita > b.partita) ? 1 : ((b.partita > a.partita) ? -1 : 0));
      for(j = 0; j < 5; j++){
        for(k = 4; k >= 0; k--){
          if(items[k] != undefined && items[k].partita == idPartite[j] && items[k].pronostico == esiti[j]){
            pti++;
            break;
          }
        }
      }
      callback && callback(pti,i);
    }
  });
}

//Restituisce i punti di un utente
function get_punti_utente(i, callback){
  var punti_utente = 0;  
  UserData.findOne({id: i}).exec(function(err, item){
    if(item != null){
      punti_utente = item.punti;
      callback && callback(punti_utente,i);
    }
  });
}

function get_squadre(j, i, callback){
  sq1 = "";
  sq2 = "";
  Partite.findOne({idP: i}).exec(function(err, item){
    sq1 = item.sq1;
    sq2 = item.sq2;
    callback && callback(sq1,sq2,j);
  });
}


function aggiorna_esiti(esiti){
  for(i = 0; i < 5; i++){
    console.log("idPartita: " + idPartite[i]);
    Partite.updateOne({idP: idPartite[i]}, {esito:esiti[i]}, function (err, docs) { 
      if (err){console.log(err)}
    }); 
  }
}


function aggiorna_punti(esiti){
  get_max_idU(function(max){ 
    console.log(max);
    for(i = 1; i <= max; i++){
      calcola_punti_totalizzati(esiti,i,function(pti,i){
        get_punti_utente(i,function(punti_utente, i){
          UserData.updateOne({id: i},{puntiSettimanali: pti}, function(err, resp) {
            console.log("Punti settimanali aggiornati all'utente con id: "+ i);
          })
          UserData.updateOne({id: i},{punti: punti_utente + pti}, function(err, resp) {
            console.log("Punti aggiornati all'utente con id: "+ i);
          })
        });
      });
    }
  });
}

function aggiorna_statistiche_squadre(esiti){
  for(i = 0; i < 5; i++){
    get_squadre(i, idPartite[i], function(sq1,sq2,i){
      if(esiti[i] == "1"){
        Squadre.updateOne({id: sq1}, {$inc: {v:1}}, function (err, docs) {
          if (err){console.log(err)}
        }); 
        Squadre.updateOne({id: sq2}, {$inc: {s:1}}, function (err, docs) { 
          if (err){console.log(err)}
        });
      }
      if(esiti[i] == "X"){
        Squadre.updateOne({id: sq1}, {$inc: {p:1}}, function (err, docs) {
          if (err){console.log(err)}
        }); 
        Squadre.updateOne({id: sq2}, {$inc: {p:1}}, function (err, docs) { 
          if (err){console.log(err)}
        });
      }
      if(esiti[i] == "2"){
        Squadre.updateOne({id: sq1}, {$inc: {s:1}}, function (err, docs) {
          if (err){console.log(err)}
        }); 
        Squadre.updateOne({id: sq2}, {$inc: {v:1}}, function (err, docs) { 
          if (err){console.log(err)}
        });
      }
      console.log("Aggiornate stats squadra con id: "+ sq1);
      console.log("Aggiornate stats squadra con id: "+ sq2);
    })
  }
}

module.exports = router;


