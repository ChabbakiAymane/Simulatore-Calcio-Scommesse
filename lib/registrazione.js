require("dotenv").config();
var express = require('express');
const jwt = require("jsonwebtoken");

const User = require('./models/UserData.js');
const { json } = require('body-parser');

var nodemailer = require('nodemailer');
var send = require('gmail-send');
const UserData = require("./models/UserData.js");

var router = express.Router();

/* Funzione che esegue GET per che restituisce tutti gli utenti registrati */
router.get('/users', (req, res) => {
    User.find({ }).exec((err, user) => {
        if(err){
            res.status(500).send({error: "Errore DB: " + err});
        }else{
            //Controllo se ha trovato gli utenti
            if(user.length == 0){
                res.status(404).json({error: "Non ci sono utenti registrati"});
            }else{
                res.status(200).json(user);
            }
        }
    });
});

/* Funzione che esegue GET per che restituisce l'utente con ID più grande */
router.get('/lastID', (req, res) => {
    User.find({ }).sort({id:-1}).limit(1).exec((err, user) => {
        if(err){
            res.status(500).send({error: "Errore DB: " + err});
        }else{
            //Controllo se ha trovato l'utente
            if(user.length == 0){
                res.status(404).json({error: "Non ci sono utenti registrati"});
            }else{
                res.status(200).json(user)
            }
        }
    });
});

/*
* Funzione che esegue GET per controllare se l'utente esiste già tramite email
* Prende l'email dell'utente dal url (http://localhost/users/email1)
*/
router.get('/utenti/:email', (req, res) => {
    var emailUser = req.params.email;

    var mailTest = emailUser;
    var validEmail = false;

    if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mailTest)){
        validEmail = true;
    }else{
        validEmail = false;
    }

    //Javascript può essere disattivato lato client, devo controllare la mail anche lato Server
    if(validEmail){
        User.findOne({mail: emailUser }).exec((err, user) => {
            if(err){
                res.status(500).json({error: "Errore DB: " + err});
            }else{
                //Controllo se ha trovato l'utente
                if(user == null){
                    res.status(204).send();
                }else{
                    res.status(200).json({error: "Utente gia registrato"});
                }
            }
        });
    }else{
        res.status(400).json({error: "Errore email non corretta"});
    }
});

/* Funzione che esegue POST per inserire un nuovo utente, prende i dati dal body */
router.post('/nuovoUtente', (req, res) => {
    let nuovoUser = new User();

    nuovoUser.id = parseInt(req.body.id);
    nuovoUser.username = String(req.body.username);
    nuovoUser.mail = String(req.body.mail);
    nuovoUser.password = String(req.body.password);
    nuovoUser.punti = 0;
    nuovoUser.puntiSettimanali = 0;

    var emailTest = nuovoUser.mail;

    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var checkEmail = re.test(String(emailTest).toLowerCase());

    if(isNaN(nuovoUser.id)){
        res.status(400).json({error: "Errore id non corretto"});
    }else{
        if(!checkEmail){
            res.status(400).json({error: "Errore email non corretta"});
        }else{
            //Controllo i paramentri che mi ha passato
            if(nuovoUser.username == "" || nuovoUser.password == ""){
                res.status(400).json({error: "Errore dati non validi"});
            }else{
                nuovoUser.save((err, user) => {
                    if(err){
                        res.status(500).json({error: "Errore DB: " + err});
                    }else{
                        //Controllo se ha creato il documento
                        if(user.length == 0){
                            res.status(404).json({error: "Errore creazione utente"});
                        }else{
                            res.status(200).json(user);
                        }
                    }
                });
            }
        }
    } 
});

router.post('/send-mail', function(req, res){
    var emailUser = req.body.email;
    var usernameUser = req.body.username;
    var passwordUser = req.body.password;

    var testoEmail = "Benvenuto su FantaTotoCalcio.\nLe tue credenziali di accesso sono:\nUsername: " + usernameUser + "\nPassword: " + passwordUser;

    var mailserverifo = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD_EMAIL
        }
    });

    var Mailinfo = {
        from: process.env.EMAIL,
        to: emailUser,
        subject: "Registrazione a FantaTotoCalcio" ,
        text: testoEmail
    };

    console.log("Sending email to: " + emailUser)

    mailserverifo.sendMail(Mailinfo, function(error, info){
        if(error){
            res.status(500).send({ error: "Errore DB: " + err });
        }else{
            if(info){
                res.status(200).send(info);
            }else{
                res.status(404).send({ error: "Errore invio email" });
            }  
        }
    });
});

router.post('/recover-credentials', function(req, res){
    var emailUser = req.body.email;

    User.findOne({mail: emailUser}).exec((err, user) => {
        if(err){
            res.status(500).send({error: "Errore DB: " + err});
        }else{
            //Controllo se ha trovato l'utente
            if(user == null){
                res.status(404).json({error: "Non ci sono utenti registrati"});
            }else{
                var testoEmail = "Le tue credenziali di accesso sono:\nUsername: " + user.username + "\nPassword: " + user.password;

                var mailserverifo = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.EMAIL,
                        pass: process.env.PASSWORD_EMAIL
                    }
                });

                var Mailinfo = {
                    from: process.env.EMAIL,
                    to: emailUser,
                    subject: "Registrazione a FantaTotoCalcio" ,
                    text: testoEmail
                };

                console.log("Sending email to: " + emailUser)

                mailserverifo.sendMail(Mailinfo, function(error, info){
                    if(error){
                        res.status(500).send({ error: "Errore DB: " + err });
                    }else{
                        if(info){
                            res.status(200).send(info);
                        }else{
                            res.status(404).send({ error: "Errore invio email" });
                        }  
                    }
                });

                res.status(200).json(user)
            }
        }
    });
});

module.exports = router;