var express = require('express');
const jwt = require("jsonwebtoken");

const Partite = require('./models/partite.js');
const Squadre = require('./models/Squadre.js');
const Pronostici = require('./models/Pronostici.js');
const User = require('./models/UserData.js');
const { json } = require('body-parser');

var router = express.Router();

/*Funzione che recupera l'id dell'utente dal token passato */
router.post('/id', async (req, res) => {
    const { token } = req.body
    if(token == 'x') {
        return;
    }
    const decodedJwt = jwt.decode(token, { complete: true });
    var id = decodedJwt.payload.id;
    res.json(id);
});

/*Funzione che recupera l'username dell'utente dal token passato */
router.post('/username', async (req, res) => {
    const { token } = req.body
    if(token == 'x') {
        return;
    }
    const decodedJwt = jwt.decode(token, { complete: true });
    var id = decodedJwt.payload.username;
    res.json(id);
});

/* Funzione che esegue GET per recuperare tutte le partite */
router.get('/partite', (req, res) => {
    Partite.find({ }).sort().exec((err, match) => {
        if(err){
            res.status(500).json({error: "Errore DB: " + err});
        }else{
            //Controllo se ha trovato partite
            if(match.length == 0){
                res.status(404).json({error: "Errore non ci sono partite"});
            }else{
                res.status(200).json(match);
            }
        }
    });
});

/* Funzione che esegue GET per prendere tutti i pronostici salvati sul DB e restituisce l'ultimo pronostico inserito (ID maggiore) */
router.get('/pronostici', (req, res) => {
    //Ordino dal più grande al più piccolo, limito ad un solo record come risposta, restituisco il record trovato
    Pronostici.findOne({}).sort({id:-1}).exec((err, prediction) => {
        if(err){
            res.status(500).json({error: "Errore DB:" + err});
        }else{
            //Controllo se ha trovato pronostici
            if(prediction == null){
                res.status(204).json({msg: "Non ci sono pronostici"});
            }else{
                res.status(200).json(prediction);
            }
        }
    });
});

/*
* Funzione che esegue GET per prendere tutti i pronostici di uno specifico utente
* Prende l'id dell'utente dal url (http://localhost/pronostici/pronostico1)
*/
router.get('/pronostici/:id', (req, res) => {
    var idUser = req.params.id;

    if(isNaN(idUser)){
        res.status(400).json({error: "Errore pronostico non corretto"});
    }else{
        //limito la risposta a 5 record e ordino dal record inserito più recentemente a quello inserito meno recentemente
        Pronostici.find({ idU: idUser }).sort({id:-1}).exec((err, userPredictions) => {
            if(err){
                res.status(500).json({error: "Errore DB: " + err});
            }else{
                if(userPredictions.length == 0){
                    res.status(404).json({error: "Errore pronostico inesistente"});
                }else{
                    res.status(200).json(userPredictions);
                }
            }
        });
    }
});

/* Funzione che esegue GET per prendere tutte le partite su cui si può fare un pronostico*/
router.get('/partiteDisponibili', async function (req, res) {
    await Partite.aggregate([
        {
            $lookup: {
                from: "squadres",
                as: "squadre1",
                localField: "sq1",
                foreignField: "id"
            }
        }, 
        {
            $lookup: {
                from: "squadres",
                as: "squadre2",
                localField: "sq2",
                foreignField: "id"
            }
        }
    ]).exec(function (err, items) {
        if(err){
            res.status(500).json({error: "Errore DB: " + err});
        }else{
            //Controllo se ha trovato le partite disponibli per i pronostici
            if(items.length == 0){
                res.status(404).json({error: "Errore non ci sono partite disponibili per i pronostici"});
            }else{
                for(i = items.length; i > 5; i--){ //Prendo le prime 5 partite
                    items.shift();
                }
                res.status(200).json(items);
            }
        }
    });
});

/* Funzione che esegue GET per recuperare ID di un utente tramite username
 * Prende l'username dell'utente dal url (http://localhost/pronostici/Username1)
*/
router.get('/user/:username', (req, res) => {
    var user = req.params.username;

    if(user == null){
        res.status(400).json({error: "Errore username non corretto"});
    }else{
        User.find({ username: user }).limit(1).exec((err, user) => {
            if(err) {
                res.status(500).send({error: "Errore DB: " + err});
            } else {
                //Controllo se l'utente esiste
                if(user.length == 0){
                    res.status(404).json({error: "Errore utente inesistente"});
                }else{
                    res.status(200).json(user);
                }
            }
        });
    }
});

/* Funzione che esegue POST per inserire un nuovo pronostico, prende i dati dal body */
router.post('/nuovoPronostico', (req, res) => {
    let nuovoPronostico = new Pronostici();
  
    nuovoPronostico.id = parseInt(req.body.id);
    nuovoPronostico.partita =  parseInt(req.body.partita);
    nuovoPronostico.idU =  parseInt(req.body.idU);
    nuovoPronostico.pronostico =  parseInt(req.body.pronostico);

    if(nuovoPronostico.id == null || nuovoPronostico.idU == null || nuovoPronostico.pronostico  == null || nuovoPronostico.partita == null){
        res.status(400).json({error: "Errore dati null"});
    }else{
        if(isNaN(nuovoPronostico.id) || isNaN(nuovoPronostico.partita) || isNaN(nuovoPronostico.idU)){
            res.status(400).json({error: "Errore dati non validi"});
        }else{
            const filter = { partita: nuovoPronostico.partita };
            const update = { id: nuovoPronostico.id, idU: nuovoPronostico.idU, pronostico: nuovoPronostico.pronostico };

            Pronostici.findOneAndUpdate(filter, update, { new: true, upsert: true}, function(err, newPro){
                if(err){
                    res.status(500).json({error: "Errore DB: " + err});
                }else{
                    //Controllo se ha creato un nuovo utente
                    if(newPro.length == 0){
                        res.status(404).json({error: "Errore creazione nuovo pronostico"});
                    }else{
                        res.status(201).json(newPro);
                    }
                }
            });
        }
    }
});

/* Funzione che modifica un pronostico tramite ID che viene passato */
router.put('/modPronostico/:id', (req, res) => {
    var idPronosticoModificare = req.params.id;
    var idPartita = req.body.partita;
    var idUtente = req.body.idU;
    var valorePronosticoModificare = req.body.pronostico;

    if(idPronosticoModificare == null || valorePronosticoModificare == null){
        res.status(400).json({error: "Errore dati null"});
    }else{
        //Controllo valore del pronostico
        if(valorePronosticoModificare == 'X'){ 
            valorePronosticoModificare = 0; 
        }

        valorePronosticoModificare = parseInt(valorePronosticoModificare);

        if (isNaN(valorePronosticoModificare) || isNaN(idPronosticoModificare)){
            res.status(400).json({error: "Errore parametri modifica pronostico"});
        }else{
            Pronostici.findOneAndUpdate(
                { id: idPronosticoModificare, partita: idPartita, idU: idUtente }, 
                { $set: { pronostico: valorePronosticoModificare } }, 
                { new: true })
                .exec(function(err, nuovoPronostico){
                    if(err) {
                        res.status(500).json({error: "Errore modifica database"});
                    } else {
                        if(nuovoPronostico){
                            //Controllo se ha modificato il pronostico 
                            if(nuovoPronostico.length == 0){
                                res.status(404).json({error: "Errore modifica pronostico"});
                            }else{
                                res.status(201).json(nuovoPronostico);
                            }
                        }
                    }
            });
        }
    }
});

/* Funzione che elimina un pronostico tramite ID che viene passato */
router.delete('/eliminaPronostico/:id', async (req, res) => {
    var idPronosticoEliminare = req.params.id;

    if(idPronosticoEliminare == null){
        res.status(400).json({error: "Errore id null"});
    }else{
        if(isNaN(idPronosticoEliminare)){
            res.status(400).json({error: "Errore id pronostico inesistente"});
        }else{
            await Pronostici.deleteOne({ id: idPronosticoEliminare }).exec(function(err, resp){
                if(err) {
                    res.status(500).json({error: "Errore parametri elimina"});
                } else {
                    //Controllo se ha eliminato il pronostico
                    if(resp){
                        res.status(201).json(resp);
                    }else{
                        res.status(404).json({error: "Errore id pronostico inesistente"});
                    }
                }
            });
        }
    }
});

module.exports = router;