require("dotenv").config();
const cookieParser = require('cookie-parser')
const User = require('./models/UserData');

const express = require('express');
var mongoose = require('mongoose');
const app = express();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const home = require('./home.js');
const aggiornaEsiti = require('./aggiorna_esiti.js');
const addP = require('./addP.js');
const addPronostici = require('./addPronostici.js');
const infoSquadre = require('./infoSquadre.js');
const clas = require('./classifica.js');
const registrazione = require ('./registrazione.js');

/* Configure Express.js parsing middleware */
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Serve front-end static files */
app.use('/', express.static('static'));

const JWT_SECRET = process.env.SUPER_SECRET;

app.post('/api/v2/login', async (req, res) => { //login dell'utente
  const { username, password } = req.body
  const user = await User.findOne({ username }).lean()
  if (!user) { //user non presente
    res.status(400).json({ error: 'user undefined' });
  }
  else if (user) {//user presente
    console.log(user.password);
    if (password == user.password) { //controllo se password combacia

      const token = jwt.sign( //creo il token
        {
          id: user.id,
          username: user.username,
          punti: user.punti
        },
        JWT_SECRET
      )
      return res.json({ status: 'ok', data: token }) //eseguito correttamente
    }
    else {
      console.log("errata");//password o username errati
      res.status(400).json({ status: 'error', error: 'Invalid username/password' });
    }
  }
})

app.post('/api/v2/check', async (req, res) => { //controllo se token è valido
  const { token } = req.body
  if (token == undefined) { //controllo se non è presente il token (utente non loggato)
    res.status(400).json({ error: 'token undefined' });
  } else {
    try {
      const user = jwt.verify(token, JWT_SECRET); //verifico se il token è autentico
      const decodedJwt = jwt.decode(token, { complete: true }); //decodifico il token
      var punti = decodedJwt.payload.punti;
      var admin = false;
      if (punti < 0) { // se punti è minore di zero allora è admin
        admin = true;
      }
      res.json({ status: 'ok', admin: admin }) //tutto andato in buon fine

    } catch (error) {
      console.log(error)
      res.status(400).json({ status: 'error', error: 'Token non autentico' }) //token non autentico ritorno errore
    }
  }
});

app.post('/api/v2/change-password', async (req, res) => { //cambio pssword utente
  const { token, newpassword: plainTextPassword } = req.body
  if (token == undefined) { //controllo se token è vuoto (utente non loggato)
    res.status(400).json({ error: 'non sei loggato' });
  }
  else if (!plainTextPassword || typeof plainTextPassword !== 'string') {//controllo se la password è una stringa
    res.status(400).json({ error: 'invalid password' });
  } else if (plainTextPassword.length < 5) { //password deve essere maggiore di 6 caratteri
    res.status(400).json({ error: 'psw minore di 6 caratteri' });
  }
  else {
    try {
      const user = jwt.verify(token, JWT_SECRET); //verifico se utente ha fatto l'accesso
      console.log("USER: " + user.id);
      const id = user.id;
      const password = plainTextPassword;
      await User.updateOne(
        { id },
        {
          $set: { password }
        }
      )
      res.json({ status: 'ok' })
    } catch (error) {
      console.log("ERRORE: " + error) //utente non loggato
      res.status(400).json({ error: 'Errore generico' });
    }
  }
});

app.use('/api/v2/home', home);
app.use('/api/v2/registrazione',registrazione);
app.use('/api/v2/aggiornaEsiti', aggiornaEsiti);
app.use('/api/v2/addPartite', addP);
app.use('/api/v2/addPronostici', addPronostici);
app.use('/api/v2/infoSquadre', infoSquadre);
app.use('/api/v2/classifica', clas);

/* Default 404 handler */
app.use((req, res) => {
  res.status(404);
  res.json({ error: 'Not found.' });
});

module.exports = app;